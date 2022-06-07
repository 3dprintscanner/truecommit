//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TrueToken is ERC20 { // inherits from ERC20 token standard
    event Burn(address indexed from, uint256 value);
    uint256 _decimals = 18;

    constructor(address _fundRaiser, string memory _name) ERC20(_name, "TRU") {
        _mint(_fundRaiser, 1e18 * (100000000 * 10**4) * 10 ** _decimals); // generate initial tokens
    }
}
