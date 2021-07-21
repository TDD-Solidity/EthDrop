// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../roles/AdminsManager.sol";

contract EthDropCore is AdminsManager {
    // Set in case the core contract is broken and an upgrade is required
    address public newContractAddress;

    /// @notice Creates the main EthDrop smart contract instance.
    constructor () {
        // Starts paused.
        paused = true;

        // the creator of the contract is the initial CEO
        ceoAddress = msg.sender;

    }

    /// @dev Used to mark the smart contract as upgraded, in case there is a serious
    ///  breaking bug. This method does nothing but keep track of the new contract and
    ///  emit a message indicating that the new address is set. It's up to clients of this
    ///  contract to update to the new contract address in that case. (This contract will
    ///  be paused indefinitely if such an upgrade takes place.)
    /// @param _v2Address new address
    function setNewAddress(address _v2Address) external onlyCEO whenPaused {
        // See README.md for updgrade plan
        newContractAddress = _v2Address;
        emit ContractUpgrade(_v2Address);
    }

    function foobar() external pure returns (string memory) {
        return "foobarrrrrrr!";
    }
}