//SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import '@openzeppelin/contracts/access/Ownable.sol';

contract Box is Ownable {
    uint256 private s_value;

    event ValueChanged(uint256 newValue);

    function store(uint256 newValue) external onlyOwner {
        s_value = newValue;
        emit ValueChanged(newValue);
    }

    function getValue() external view returns (uint256) {
        return s_value;
    }
}
