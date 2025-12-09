const assert = require("assert");
const app = require("../../src/app");

describe("companyPhones service", () => {
  let thisService;
  let companyPhoneCreated;

  beforeEach(async () => {
    thisService = await app.service("companyPhones");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (companyPhones)");
  });

  describe("#create", () => {
    const options = {"companyId":"aasdfasdfasdfadsfadfa","countryCode":23,"operatorCode":23,"number":23,"type":["new value"],"isDefault":true};

    beforeEach(async () => {
      companyPhoneCreated = await thisService.create(options);
    });

    it("should create a new companyPhone", () => {
      assert.strictEqual(companyPhoneCreated.companyId, options.companyId);
assert.strictEqual(companyPhoneCreated.countryCode, options.countryCode);
assert.strictEqual(companyPhoneCreated.operatorCode, options.operatorCode);
assert.strictEqual(companyPhoneCreated.number, options.number);
assert.strictEqual(companyPhoneCreated.type, options.type);
assert.strictEqual(companyPhoneCreated.isDefault, options.isDefault);
    });
  });

  describe("#get", () => {
    it("should retrieve a companyPhone by ID", async () => {
      const retrieved = await thisService.get(companyPhoneCreated._id);
      assert.strictEqual(retrieved._id, companyPhoneCreated._id);
    });
  });

  describe("#update", () => {
    let companyPhoneUpdated;
    const options = {"companyId":"345345345345345345345","countryCode":100,"operatorCode":100,"number":100,"type":["updated value"],"isDefault":false};

    beforeEach(async () => {
      companyPhoneUpdated = await thisService.update(companyPhoneCreated._id, options);
    });

    it("should update an existing companyPhone ", async () => {
      assert.strictEqual(companyPhoneUpdated.companyId, options.companyId);
assert.strictEqual(companyPhoneUpdated.countryCode, options.countryCode);
assert.strictEqual(companyPhoneUpdated.operatorCode, options.operatorCode);
assert.strictEqual(companyPhoneUpdated.number, options.number);
assert.strictEqual(companyPhoneUpdated.type, options.type);
assert.strictEqual(companyPhoneUpdated.isDefault, options.isDefault);
    });
  });

  describe("#delete", () => {
  let companyPhoneDeleted;
    beforeEach(async () => {
      companyPhoneDeleted = await thisService.remove(companyPhoneCreated._id);
    });

    it("should delete a companyPhone", async () => {
      assert.strictEqual(companyPhoneDeleted._id, companyPhoneCreated._id);
    });
  });
});