// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol';

contract GovernanceToken is ERC20Votes {
    uint256 private constant MAX_SUPPLY = 1_000_000_000_000_000_000;

    constructor()
        ERC20('GovernanceToken', 'GVT')
        ERC20Permit('GovernanceToken')
    {
        _mint(msg.sender, MAX_SUPPLY);
    }
}
