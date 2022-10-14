// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../../contracts/StakingPool.sol";

contract StakingPoolTest is Test {
    StakingPool public stakingPool;

    function setUp() public {
        stakingPool = new StakingPool(0xa53A6fE2d8Ad977aD926C485343Ba39f32D3A3F6, 0xa53A6fE2d8Ad977aD926C485343Ba39f32D3A3F6);

    }

    function testInitialOwner() public {
      address stakingPoolOwner = stakingPool.owner();
      assertEq(stakingPoolOwner, address(this));
    }

    function testSetOwner() public {
      stakingPool.sendToOwner();
      address stakingPoolOwner = stakingPool.owner();
      assertEq(stakingPoolOwner, address(0xa53A6fE2d8Ad977aD926C485343Ba39f32D3A3F6));
    }

    function testDeposit(uint x){
      
    }

}
