pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

//import "hardhat/console.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract StakingPool {

  event Deposit(bytes result, address depositContract, address caller);

  mapping (address => uint) public userBalances;

  enum State { acceptingDeposits, staked, exited }
  State currentState;

  address public depositContract;

  constructor(address depositContract_)  {
    currentState = State.acceptingDeposits;
    depositContract = depositContract_;
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

  function stake(bytes calldata depositData) public {
    require(address(this).balance >= 32, "not enough eth");
    currentState = State.staked;
    uint value = 32 ether;
    (bool success, bytes memory result) = depositContract.call{value: value}(depositData);
    require(success, "executeTransaction: tx failed");
    emit Deposit(result, depositContract, msg.sender);
  }


  function unstake() public {
    currentState = State.exited;
  }


  // to support receiving ETH by default
  receive() external payable {}
  fallback() external payable {}
}
