pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

//import "hardhat/console.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

interface IDepositContract {

    function deposit(
        bytes calldata pubkey,
        bytes calldata withdrawal_credentials,
        bytes calldata signature,
        bytes32 deposit_data_root
    ) external payable;

}


contract StakingPool is ERC721Enumerable {

  event Deposit(address depositContractAddress, address caller);

  mapping (uint => uint) public depositAmount;
  uint public totalDeposits;
  uint private _tokenId;

  enum State { acceptingDeposits, staked, exited }
  State currentState;

  address public depositContractAddress;
  IDepositContract depositContract;

  address private owner;

  modifier onlyOwner() {
   require(address(msg.sender) == owner, "Not owner");
   _;
  }

  constructor(address depositContractAddress_, address owner_) ERC721("staking con amiogos", "FRENS") {
    currentState = State.acceptingDeposits;
    depositContractAddress = depositContractAddress_;
    depositContract = IDepositContract(depositContractAddress);
    owner = owner_;
  }
  function getOwner() public view returns(address){
    return owner;
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
      uint share = contractBalance * depositAmount[i] / totalDeposits - 1; //steal 1 w
      payable(tokenOwner).transfer(share);
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
