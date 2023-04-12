// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./KushToken.sol";

contract KushFaucet {
    KushToken private immutable token; // token imported
    uint256 public payoutAmount; // limit payment
    mapping(address => uint256) public lastRequest; // mapping 

    constructor(address addressContract) {
        require(addressContract != address(0));
        token = KushToken(addressContract);
        payoutAmount = 100000000000000000; // 0.1 token
    }

    function getBalance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function claim() public {
        require(
            block.timestamp - lastRequest[msg.sender] >= 60,
            "Can only request tokens every 1 minutes"
        );

        token.transfer(msg.sender, payoutAmount); // 0.1 token
        lastRequest[msg.sender] = block.timestamp; // Write last claim
    }
}
