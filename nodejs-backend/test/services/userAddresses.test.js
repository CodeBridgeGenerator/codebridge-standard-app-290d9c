const assert = require("assert");
const app = require("../../src/app");

describe("userAddresses service", () => {
  let thisService;
  let userAddressCreated;

  beforeEach(async () => {
    thisService = await app.service("userAddresses");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (userAddresses)");
  });

  describe("#create", () => {
    const options = {"userId":"aasdfasdfasdfadsfadfa","Street1":"new value","Street2":"new value","Poscode":"new value","City":"new value","State":"new value","Province":"new value","Country":"new value"};

    beforeEach(async () => {
      userAddressCreated = await thisService.create(options);
    });

    it("should create a new userAddress", () => {
      assert.strictEqual(userAddressCreated.userId, options.userId);
assert.strictEqual(userAddressCreated.Street1, options.Street1);
assert.strictEqual(userAddressCreated.Street2, options.Street2);
assert.strictEqual(userAddressCreated.Poscode, options.Poscode);
assert.strictEqual(userAddressCreated.City, options.City);
assert.strictEqual(userAddressCreated.State, options.State);
assert.strictEqual(userAddressCreated.Province, options.Province);
assert.strictEqual(userAddressCreated.Country, options.Country);
    });
  });

  describe("#get", () => {
    it("should retrieve a userAddress by ID", async () => {
      const retrieved = await thisService.get(userAddressCreated._id);
      assert.strictEqual(retrieved._id, userAddressCreated._id);
    });
  });

  describe("#update", () => {
    let userAddressUpdated;
    const options = {"userId":"345345345345345345345","Street1":"updated value","Street2":"updated value","Poscode":"updated value","City":"updated value","State":"updated value","Province":"updated value","Country":"updated value"};

    beforeEach(async () => {
      userAddressUpdated = await thisService.update(userAddressCreated._id, options);
    });

    it("should update an existing userAddress ", async () => {
      assert.strictEqual(userAddressUpdated.userId, options.userId);
assert.strictEqual(userAddressUpdated.Street1, options.Street1);
assert.strictEqual(userAddressUpdated.Street2, options.Street2);
assert.strictEqual(userAddressUpdated.Poscode, options.Poscode);
assert.strictEqual(userAddressUpdated.City, options.City);
assert.strictEqual(userAddressUpdated.State, options.State);
assert.strictEqual(userAddressUpdated.Province, options.Province);
assert.strictEqual(userAddressUpdated.Country, options.Country);
    });
  });

  describe("#delete", () => {
  let userAddressDeleted;
    beforeEach(async () => {
      userAddressDeleted = await thisService.remove(userAddressCreated._id);
    });

    it("should delete a userAddress", async () => {
      assert.strictEqual(userAddressDeleted._id, userAddressCreated._id);
    });
  });
});