// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./StakingPool.sol";


contract StakingPoolFactory {
  StakingPool[] public stakingPools;
  mapping(address => bool) existsStakingPool;

  event Create(
    uint indexed contractId,
    address indexed contractAddress,
    address creator,
    address owner,
    address depositContractAddress
  );

  event Owners(
    address indexed contractAddress,
    address[] owners,
    uint256 indexed signaturesRequired
  );


  constructor() {}


  function create(
    address depositContractAddress_,
    address owner_
  ) public returns(address, uint) {
    uint id = numberOfStakingPools();

    StakingPool stakingPool = (new StakingPool)(depositContractAddress_, owner_);
    stakingPools.push(stakingPool);
    existsStakingPool[address(stakingPool)] = true;
    StakingPool(stakingPool).sendToOwner();
    emit Create(id, address(stakingPool), msg.sender, owner_, depositContractAddress_);
    return(address(stakingPool), id);
  }

  function numberOfStakingPools() public view returns(uint) {
    return stakingPools.length;
  }

  function getStakingPool(uint256 _index)
    public
    view
    returns (
      address stakingPoolAddress,
      uint balance,
      address owner
    ) {
      StakingPool stakingPool = stakingPools[_index];
      return (address(stakingPool), address(stakingPool).balance, stakingPool.owner());
    }
}
