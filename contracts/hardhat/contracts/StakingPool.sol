pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

//import "hardhat/console.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol
interface IDepositContract {

    function deposit(
        bytes calldata pubkey,
        bytes calldata withdrawal_credentials,
        bytes calldata signature,
        bytes32 deposit_data_root
    ) external payable;

}


contract StakingPool {

  event Deposit(address depositContractAddress, address caller);

  mapping (address => uint) public userBalances;

  enum State { acceptingDeposits, staked, exited }
  State currentState;

  address public depositContractAddress;
  IDepositContract depositContract;

  constructor(address depositContractAddress_)  {
    currentState = State.acceptingDeposits;
    depositContractAddress = depositContractAddress_;
    depositContract = IDepositContract(depositContractAddress);
  }

  function deposit(address userAddress) public payable {
    userBalances[userAddress] += msg.value;
  }

  function withdraw(uint _amount) public {
    require(currentState != State.staked, "cannot withdraw once staked");
    require(userBalances[address(msg.sender)] >= _amount, "not enough deposited");
    userBalances[address(msg.sender)] -= _amount;
    payable(msg.sender).transfer(_amount);
  }

  function stake(
    bytes calldata pubkey,
    bytes calldata withdrawal_credentials,
    bytes calldata signature,
    bytes32 deposit_data_root
  ) public {
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
  receive() external payable {}
  fallback() external payable {}
}
