const assert = require("assert");
const app = require("../../src/app");

describe("companyAddresses service", () => {
  let thisService;
  let companyAddressCreated;

  beforeEach(async () => {
    thisService = await app.service("companyAddresses");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (companyAddresses)");
  });

  describe("#create", () => {
    const options = {"companyId":"aasdfasdfasdfadsfadfa","Street1":"new value","Street2":"new value","Poscode":"new value","City":"new value","State":"new value","Province":"new value","Country":"new value","isDefault":true};

    beforeEach(async () => {
      companyAddressCreated = await thisService.create(options);
    });

    it("should create a new companyAddress", () => {
      assert.strictEqual(companyAddressCreated.companyId, options.companyId);
assert.strictEqual(companyAddressCreated.Street1, options.Street1);
assert.strictEqual(companyAddressCreated.Street2, options.Street2);
assert.strictEqual(companyAddressCreated.Poscode, options.Poscode);
assert.strictEqual(companyAddressCreated.City, options.City);
assert.strictEqual(companyAddressCreated.State, options.State);
assert.strictEqual(companyAddressCreated.Province, options.Province);
assert.strictEqual(companyAddressCreated.Country, options.Country);
assert.strictEqual(companyAddressCreated.isDefault, options.isDefault);
    });
  });

  describe("#get", () => {
    it("should retrieve a companyAddress by ID", async () => {
      const retrieved = await thisService.get(companyAddressCreated._id);
      assert.strictEqual(retrieved._id, companyAddressCreated._id);
    });
  });

  describe("#update", () => {
    let companyAddressUpdated;
    const options = {"companyId":"345345345345345345345","Street1":"updated value","Street2":"updated value","Poscode":"updated value","City":"updated value","State":"updated value","Province":"updated value","Country":"updated value","isDefault":false};

    beforeEach(async () => {
      companyAddressUpdated = await thisService.update(companyAddressCreated._id, options);
    });

    it("should update an existing companyAddress ", async () => {
      assert.strictEqual(companyAddressUpdated.companyId, options.companyId);
assert.strictEqual(companyAddressUpdated.Street1, options.Street1);
assert.strictEqual(companyAddressUpdated.Street2, options.Street2);
assert.strictEqual(companyAddressUpdated.Poscode, options.Poscode);
assert.strictEqual(companyAddressUpdated.City, options.City);
assert.strictEqual(companyAddressUpdated.State, options.State);
assert.strictEqual(companyAddressUpdated.Province, options.Province);
assert.strictEqual(companyAddressUpdated.Country, options.Country);
assert.strictEqual(companyAddressUpdated.isDefault, options.isDefault);
    });
  });

  describe("#delete", () => {
  let companyAddressDeleted;
    beforeEach(async () => {
      companyAddressDeleted = await thisService.remove(companyAddressCreated._id);
    });

    it("should delete a companyAddress", async () => {
      assert.strictEqual(companyAddressDeleted._id, companyAddressCreated._id);
    });
  });
});