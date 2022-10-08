pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

//import "hardhat/console.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract StakingPool {

  mapping (address => uint) public userBalances;
  enum State { acceptingDeposits, staked, exited }
  State currentState;

  constructor()  {
    currentState = State.acceptingDeposits;
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

  function stake() public {
    currentState = State.staked;
  }


  function unstake() public {
    currentState = State.exited;
  }


  // to support receiving ETH by default
  receive() external payable {}
  fallback() external payable {}
}
