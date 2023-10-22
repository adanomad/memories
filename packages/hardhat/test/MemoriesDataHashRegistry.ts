import { expect } from "chai";
import { ethers } from "hardhat";

describe("MemoriesDataHashRegistry", function () {
  let memoriesRegistry;

  beforeEach(async () => {
    [owner, anotherAccount] = await ethers.getSigners();
    const MemoriesRegistry = await ethers.getContractFactory("MemoriesDataHashRegistry");
    memoriesRegistry = await MemoriesRegistry.deploy();
  });

  describe("Functionality", function () {
    it("Should allow users to add a new hash", async function () {
      await expect(memoriesRegistry.addHash("Entity1", "Hash1")).not.to.be.reverted;
    });

    it("Should allow users to update an existing hash", async function () {
      await memoriesRegistry.addHash("Entity1", "Hash1");
      await expect(memoriesRegistry.updateHash("Entity1", "UpdatedHash")).not.to.be.reverted;
    });

    it("Should revert when trying to update a non-existing hash", async function () {
      await expect(memoriesRegistry.updateHash("Entity1", "UpdatedHash")).to.be.revertedWith(
        "No hash exists for this entity to update",
      );
    });

    it("Should allow users to retrieve a hash", async function () {
      await memoriesRegistry.addHash("Entity1", "Hash1");
      expect(await memoriesRegistry.getHash("Entity1")).to.equal("Hash1");
    });

    it("Should return an empty string for a non-existing entity", async function () {
      expect(await memoriesRegistry.getHash("Entity1")).to.equal("");
    });
  });

  describe("Events", function () {
    it("Should emit an event when a new hash is added", async function () {
      await expect(memoriesRegistry.addHash("Entity1", "Hash1"))
        .to.emit(memoriesRegistry, "DataHashAdded")
        .withArgs("Entity1", "Hash1");
    });

    it("Should emit an event when a hash is updated", async function () {
      await memoriesRegistry.addHash("Entity1", "Hash1");
      await expect(memoriesRegistry.updateHash("Entity1", "UpdatedHash"))
        .to.emit(memoriesRegistry, "DataHashUpdated")
        .withArgs("Entity1", "UpdatedHash");
    });
  });
});
