pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

//import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

import "@openzeppelin/contracts/utils/Strings.sol";
import 'base64-sol/base64.sol';

interface IDepositContract {

    function deposit(
        bytes calldata pubkey,
        bytes calldata withdrawal_credentials,
        bytes calldata signature,
        bytes32 deposit_data_root
    ) external payable;

}


contract StakingPool is ERC721Enumerable, Ownable {

    using Strings for uint256;

  event Deposit(address depositContractAddress, address caller);

  mapping (uint => uint) public depositAmount;
  uint public totalDeposits;
  uint private _tokenId;

  enum State { acceptingDeposits, staked, exited }
  State currentState;

  address public depositContractAddress;
  IDepositContract depositContract;

  address private rightfulOwner;
/*
  modifier onlyOwner() {
   require(address(msg.sender) == owner, "Not owner");
   _;
  }
*/
  constructor(address depositContractAddress_, address owner_) ERC721("staking con amigos", "FRENS") {
    currentState = State.acceptingDeposits;
    depositContractAddress = depositContractAddress_;
    depositContract = IDepositContract(depositContractAddress);
    rightfulOwner = owner_;
  }

  function getOwner() public view returns(address){
    return rightfulOwner;
  }

  function sendToOwner() public {
    require(owner() != rightfulOwner, "already done");
    _transferOwnership(rightfulOwner);
  }

  function deposit(address userAddress) public payable {
    require(currentState == State.acceptingDeposits);
    _tokenId++;
    uint256 id = _tokenId;
    depositAmount[id] = msg.value;
    totalDeposits += msg.value;
    _mint(userAddress, id);
  }

  function addToDeposit(uint _id) public payable {
    require(_exists(_id), "not exist");
    require(currentState == State.acceptingDeposits);
    depositAmount[_id] += msg.value;
    totalDeposits += msg.value;
  }

  function withdraw(uint _id, uint _amount) public {
    require(currentState != State.staked, "cannot withdraw once staked");
    require(msg.sender == ownerOf(_id), "not the owner");
    require(depositAmount[_id] >= _amount, "not enough deposited");
    depositAmount[_id] -= _amount;
    totalDeposits -= _amount;
    payable(msg.sender).transfer(_amount);
  }

  function distribute() public {
    require(currentState == State.staked, "use withdraw when not staked");
    uint contractBalance = address(this).balance;
    for(uint i=1; i<=totalSupply(); i++) {
      address tokenOwner = ownerOf(i);
      uint share = _getShare(i, contractBalance);
      payable(tokenOwner).transfer(share);
    }
  }

  function _getShare(uint _id, uint _contractBalance) internal view returns(uint) {
    return _contractBalance * depositAmount[_id] / totalDeposits - 1; //steal 1 wei
  }

  function getShare(uint _id) public view returns(uint) {
    uint contractBalance = address(this).balance;
    return _getShare(_id, contractBalance);
  }

  function getDistributableShare(uint _id) public view returns(uint) {
    if(currentState == State.acceptingDeposits) {
      return 0;
    } else {
      return getShare(_id);
    }

  }


  function stake(
    bytes calldata pubkey,
    bytes calldata withdrawal_credentials,
    bytes calldata signature,
    bytes32 deposit_data_root
  ) public onlyOwner{
    require(address(this).balance >= 32, "not enough eth");
    currentState = State.staked;
    uint value = 32 ether;
    depositContract.deposit{value: value}(pubkey, withdrawal_credentials, signature, deposit_data_root);

    emit Deposit(depositContractAddress, msg.sender);
  }

  function rugpull() public {
    payable(msg.sender).transfer(address(this).balance);
  }

  function unstake() public {
    currentState = State.exited;
  }


  //art stuff
  function tokenURI(uint256 id) public view override returns (string memory) {
    require(_exists(id), "not exist");
    string memory name = string(abi.encodePacked('fren pool share #',id.toString()));
    string memory description = string(abi.encodePacked('this fren pool share has a deposit of ',uint2str(depositAmount[id] / 1 ether),' Eth with claimable balance of ',uint2str(getDistributableShare(id)), 'Wei'));
    string memory image = Base64.encode(bytes(generateSVGofTokenById(id)));

          return
              string(
                  abi.encodePacked(
                    'data:application/json;base64,',
                    Base64.encode(
                        bytes(
                              abi.encodePacked(
                                  '{"name":"',
                                  name,
                                  '", "description":"',
                                  description,
                                  '", "external_url":"https://stakeconamigos.com/token/',
                                  id.toString(),
                                  '", "attributes": [{"trait_type": "deposit", "value": "Eth: ',
                                  uint2str(depositAmount[id] / 1 ether),
                                  '"},{"trait_type": "claimable", "value": "Wei: ',
                                  uint2str(getDistributableShare(id)),
                                  '"}], "image": "',
                                  'data:image/svg+xml;base64,',
                                  image,
                                  '"}'
                              )
                            )
                        )
                  )
              );
      }

      function generateSVGofTokenById(uint256 id) internal view returns (string memory) {

        string memory svg = string(abi.encodePacked(
          '<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">',
            renderTokenById(id),
          '</svg>'
        ));

        return svg;
      }

      // Visibility is `public` to enable it being called by other contracts for composition.
      function renderTokenById(uint256 id) public view returns (string memory) {

        string memory render = string(abi.encodePacked(
          '<svg viewBox="-100 -100 1000 1000">',
            '<rect x="-100" y="-100" width="1000" height="1000" id="svg_1" fill="#fff" stroke-width="3" stroke="#000"/>'
            '<path clip-rule="evenodd" d="M144 95c0-4-2-7-4-10-3-3-6-4-10-4s-7 1-10 4c-2 3-4 6-4 10a14 14 0 0 0 14 14 14 14 0 0 0 14-14z" fill="#e91e23" fill-rule="evenodd"/>',
            '<path clip-rule="evenodd" d="M349 87c-3-3-6-4-10-4s-7 1-10 4c-2 3-4 6-4 10s2 7 4 10a14 14 0 0 0 20 0c2-3 4-6 4-10s-2-7-4-10z" fill="#02b2e7" fill-rule="evenodd"/>',
            '<path clip-rule="evenodd" d="M499 86c-3-2-6-4-10-4s-7 2-10 4c-2 3-4 7-4 10a14 14 0 0 0 14 14c4 0 7-1 10-4 2-2 4-6 4-10 0-3-2-7-4-10Z" fill="#fabc16" fill-rule="evenodd"/>',
            '<path clip-rule="evenodd" d="M678 90c-3-3-6-5-10-5s-7 2-10 5c-3 2-4 6-4 9 0 4 1 8 4 10 3 3 6 5 10 5s7-2 10-5c2-2 4-6 4-10 0-3-2-7-4-9Z" fill="#02b2e7" fill-rule="evenodd"/>',
            '<path clip-rule="evenodd" d="M433 46v-8c-15-5-30-3-44 5-4 2-8 7-12 14l-8 21c-2 3-3 8-3 14l-2 14c-2 6-3 15-3 29 17-2 30-4 41-7 16-4 28-11 36-19-7 0-16 2-26 5l-25 8c-5 0-9-2-10-6-2-4-2-8-1-12l9-12c4-4 9-5 15-4l2-3 3-2 7 1 6-1 11-5c5-1 9-3 12-6h-52l-4-2v-5c0-4 3-7 7-8 10-5 23-8 41-11Zm8 28h5-5Zm5 0 2 1c4 1 6 1 8-1h-10Z" fill-rule="evenodd"/>',
            '<path stroke-miterlimit="2.6" d="M441 72h5m0 0 2 1m0 0c4 1 6 1 8-1m0 0h-10m0 0h-5m0 0h-52m0 0-4-2v-5c0-4 3-7 7-8 10-5 23-8 41-11m0 0v-8m0 0c-15-5-30-3-44 5-4 2-8 7-12 14m0 0-8 21m0 0c-2 3-3 8-3 14l-2 14c-2 6-3 15-3 29 17-2 30-4 41-7 16-4 28-11 36-19-7 0-16 2-26 5m0 0-25 8m0 0c-5 0-9-2-10-6-2-4-2-8-1-12l9-12c4-4 9-5 15-4l2-3 3-2m0 0 7 1m0 0 6-1 11-5c5-1 9-3 12-6" fill="none" stroke="#000" stroke-width="12.2" stroke-linecap="round" stroke-linejoin="round"/>',
            '<path clip-rule="evenodd" d="m628 46 2-9 3-9 3-6 4-5c2-5 3-9 1-13l-15 35-14 36-5 14c-3 5-7 7-13 4-14-6-26-15-33-26l-8-16c-3-5-6-7-8-5-7 8-12 19-14 35l-4 41c2 0 4 1 4 4v2l2-1c2-3 3-8 4-14l3-16c0-6 1-10 3-13 1-3 4-4 8-4s9 2 14 5l13 10 12 13c6 5 10 9 15 11 5 0 7 0 7-2 0-11 2-23 5-36l11-35Z" fill-rule="evenodd"/>',
            '<path stroke-miterlimit="2.6" d="m630 37 3-9 3-6m0 0 4-5m0 0c2-5 3-9 1-13l-15 35-14 36m0 0-5 14m0 0c-3 5-7 7-13 4-14-6-26-15-33-26m0 0-8-16m0 0c-3-5-6-7-8-5-7 8-12 19-14 35m0 0-4 41m0 0c2 0 4 1 4 4m0 0v2m0 0 2-1c2-3 3-8 4-14m0 0 3-16m0 0c0-6 1-10 3-13 1-3 4-4 8-4s9 2 14 5l13 10m0 0 12 13m0 0c6 5 10 9 15 11 5 0 7 0 7-2 0-11 2-23 5-36a687 687 0 0 1 13-44" fill="none" stroke="#000" stroke-width="12.2" stroke-linecap="round" stroke-linejoin="round"/>',
            '<path clip-rule="evenodd" d="M786 38v-8h-8l-31 21c-22 9-33 19-31 29 2 4 5 7 10 8l16 1 19-2 17 1 3 1 2 4v6l-3 4c-6 6-13 10-22 14-8 4-16 6-24 8-3 3-5 7-5 10 4-4 11-7 19-11l22-8c8-3 14-6 18-10 6-5 9-11 10-18-6-4-16-6-28-6h-31c-2-1-3-3-3-6l1-7c16-13 31-21 46-26 2-1 3-3 3-5Z" fill-rule="evenodd"/>',
            '<path stroke-miterlimit="2.6" d="M786 30h-8m0 0-31 21c-22 9-33 19-31 29 2 4 5 7 10 8m0 0 16 1 19-2 17 1m0 0 3 1m0 0 2 4m0 0v6m0 0-3 5m0 0c-6 5-13 9-22 13-8 4-16 6-24 8-3 3-5 7-5 10 4-4 11-7 19-11m0 0 22-8m0 0c8-3 14-6 18-10 6-5 9-11 10-18-6-4-16-6-28-6m0 0h-31m0 0c-2-1-3-3-3-6m0 0 1-7m0 0c16-13 31-21 46-26 2-1 3-3 3-5m0 0v-8" fill="none" stroke="#000" stroke-width="12.2" stroke-linecap="round" stroke-linejoin="round"/>',
            '<path clip-rule="evenodd" d="M245 32h-17l-18 10c-7 2-14 0-18-5l-3 11-13 58-12 57c-3 7-2 15 2 27l1-23 3-22c2-16 8-29 17-37 4-3 11-4 21-2l22 8c19 7 35 9 47 5v-5c-8 0-16-2-26-5l-26-9-3-5-2-5c2-5 7-9 13-13l17-10c6-4 10-8 12-11 2-5 1-10-3-16-3-4-7-6-14-8zm-3 24-14 13-18 13c-6 3-10 4-13 3 0-7 0-12 2-16 2-5 5-9 10-12l18-8c9-4 15-4 18-2 2 1 1 4-3 9z" fill-rule="evenodd"/>',
            '<path stroke-miterlimit="2.6" d="m228 32-18 10c-7 2-14 0-18-5m0 0-3 11m0 0-13 58-12 57c-3 7-2 15 2 27m0 0 1-23m0 0 3-22c2-16 8-29 17-37 4-3 11-4 21-2l22 8c19 7 35 9 47 5m0 0v-5m0 0c-8 0-16-2-26-5m0 0-26-9-3-5m0 0-2-5c2-5 7-9 13-13m0 0 17-10m0 0c6-4 10-8 12-11 2-5 1-10-3-16-3-4-7-6-14-8h-17" fill="none" stroke="#000" stroke-width="12.2" stroke-linecap="round" stroke-linejoin="round"/>',
            '<path clip-rule="evenodd" d="m61 21 20-5c2 0 4-2 5-4 2-3 1-4-2-4-9-3-18-2-28 0-8 3-16 7-21 13-5 3-9 9-11 19l-3 13-4 13-6 8c-2 3-3 7-2 10 2 2 3 4 3 8l1 24-3 23-3 25-1 25 7-47 9-47c0-3 2-5 6-8 3-1 6-3 10-3l15-4 15-6 15-6 4-1-49 4c-3 0-5-1-8-3-2-3-3-5-3-8 4-14 9-24 16-31z" fill-rule="evenodd"/>',
            '<path stroke-miterlimit="2.6" d="m87 67-50 4m0 0-7-3c-2-3-3-5-3-8 4-14 9-24 16-31m0 0 18-8m0 0 20-5c2 0 4-2 5-4 2-3 1-4-2-4-9-3-18-2-28 0-8 3-16 7-21 13-5 3-9 9-11 19m0 0-3 13m0 0-4 13m0 0-6 8m0 0c-2 3-3 7-2 10 2 2 3 4 3 8l1 24-3 23m0 0-3 25m0 0-1 25m0 0 7-47m0 0 9-47c0-3 2-5 6-8 3-1 6-3 10-3l15-4m0 0 15-6m0 0 15-6m0 0 4-1m12-1-12 1" fill="none" stroke="#000" stroke-width="12.2" stroke-linecap="round" stroke-linejoin="round"/>',
            '<text font-size="120" font-weight="bold" x="120" y="350" fill="blue" stroke="#000" stroke-width="1" font-family="sans-serif">',
              'Deposit:',
            '</text>',
            '<text font-size="80" font-weight="bold" x="250" y="460" fill="blue" stroke="#000" stroke-width="1" font-family="sans-serif">',
              uint2str(depositAmount[id] / 1 ether), ' Eth',
            '</text>',
            '<text font-size="120" font-weight="bold" x="80" y="620" fill="green" stroke="#000" stroke-width="1" font-family="sans-serif">',
              'Claimable:',
            '</text>',
            '<text font-size="80" font-weight="bold" x="250" y="730" fill="green" stroke="#000" stroke-width="1" font-family="sans-serif">',
              uint2str(getDistributableShare(id)), ' Wei',
            '</text>',
          '</svg>'
          /*
          '<g id="pic">',
            '<ellipse stroke-width="3" ry="195" rx="195" id="svg_2" cy="200" cx="200" stroke="#000" fill="grey"/>'
            '<text font-size="40" font-weight="bold" x="120" y="140" fill="blue" stroke="#000" stroke-width="1" font-family="sans-serif">',
              'Deposit:',
            '</text>',
            '<text font-size="30" font-weight="bold" x="150" y="175" fill="blue" stroke="#000" stroke-width="1" font-family="sans-serif">',
              uint2str(depositAmount[id] / 1 ether), ' Eth',
            '</text>',
            '<text font-size="40" font-weight="bold" x="110" y="240" fill="green" stroke="#000" stroke-width="1" font-family="sans-serif">',
              'Claimable:'
            '</text>',
            '<text font-size="30" font-weight="bold" x="150" y="275" fill="green" stroke="#000" stroke-width="1" font-family="sans-serif">',
              uint2str(getDistributableShare(id)), ' Wei',
            '</text>',
          '</g>'
          */
          ));

        return render;
      }

      function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
          if (_i == 0) {
              return "0";
          }
          uint j = _i;
          uint len;
          while (j != 0) {
              len++;
              j /= 10;
          }
          bytes memory bstr = new bytes(len);
          uint k = len;
          while (_i != 0) {
              k = k-1;
              uint8 temp = (48 + uint8(_i - _i / 10 * 10));
              bytes1 b1 = bytes1(temp);
              bstr[k] = b1;
              _i /= 10;
          }
          return string(bstr);
      }


  // to support receiving ETH by default
  receive() external payable {
    /*
    _tokenId++;
    uint256 id = _tokenId;
    depositAmount[id] = msg.value;
    _mint(msg.sender, id);
    */
  }

  fallback() external payable {}
}
