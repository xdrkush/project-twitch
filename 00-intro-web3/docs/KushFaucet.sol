// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./KushToken.sol";

contract KushFaucet {
    KushToken private immutable token; // token imported
    uint256 public balanceFaucet; // balance of faucet
    uint256 public payoutAmount; // limit payment
    mapping(address => uint256) public contributors; // list contributors

    constructor(address addressContract) {
        require(addressContract != address(0));
        token = KushToken(addressContract);
        payoutAmount = 100000000000000000; // 0.1 token
        balanceFaucet = 0; // 0 Token
    }

    function getBalanceOfFaucet() public view returns (uint256) {
        return balanceFaucet;
    }

    function getContributor(address contributor) public view returns (uint256) {
        return contributors[contributor];
    }

    function deposit(uint256 amount) public {
        if (token.balanceOf(msg.sender) >= amount) {
            balanceFaucet += amount;
            contributors[msg.sender] += amount;
            token.transferFrom(msg.sender, address(this), amount);
        }
    }

    function claim() public {
        if (contributors[msg.sender] > 0) {
            balanceFaucet -= payoutAmount;
            token.transfer(msg.sender, 200000000000000000); // 0.2 token
        } else {
            balanceFaucet -= payoutAmount;
            token.transfer(msg.sender, payoutAmount); // 0.1 token
        }
    }
}
