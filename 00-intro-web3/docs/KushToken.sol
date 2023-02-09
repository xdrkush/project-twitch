// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract KushToken is Ownable, ERC20 {
    constructor(uint256 initialSupply) ERC20("KushToken", "KUSH") {
        _mint(owner(), initialSupply);
    }

}
