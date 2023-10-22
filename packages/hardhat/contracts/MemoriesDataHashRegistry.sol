// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";

contract MemoriesDataHashRegistry {
	address public owner;
	mapping(string => string) private dataHashes;

	event DataHashAdded(string indexed entity, string hash);
	event DataHashUpdated(string indexed entity, string newHash);

	constructor() {
		owner = msg.sender;
	}

	function addHash(string memory entity, string memory hash) public {
		require(
			bytes(dataHashes[entity]).length == 0,
			"Hash already exists for this entity"
		);

		dataHashes[entity] = hash;

		console.log(
			"Added hash %s for entity %s by %s",
			hash,
			entity,
			msg.sender
		);
		emit DataHashAdded(entity, hash);
	}

	function updateHash(string memory entity, string memory newHash) public {
		require(
			bytes(dataHashes[entity]).length != 0,
			"No hash exists for this entity to update"
		);

		dataHashes[entity] = newHash;

		console.log(
			"Updated entity %s with new hash %s by %s",
			entity,
			newHash,
			msg.sender
		);
		emit DataHashUpdated(entity, newHash);
	}

	function getHash(string memory entity) public view returns (string memory) {
		return dataHashes[entity];
	}
}
