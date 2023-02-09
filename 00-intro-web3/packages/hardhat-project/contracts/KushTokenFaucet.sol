// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./KushToken.sol";

contract KushTokenFaucet {
    KushToken private immutable _token;

    constructor(address addressContract) {
        _token = KushToken(addressContract);
    }

    function faucet(uint256 amount) public {
        _token.transferFrom(_token.owner(), msg.sender, amount);
    }
}
