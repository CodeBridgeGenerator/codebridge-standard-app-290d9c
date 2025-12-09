const assert = require("assert");
const app = require("../../src/app");

describe("userPhones service", () => {
  let thisService;
  let userPhoneCreated;

  beforeEach(async () => {
    thisService = await app.service("userPhones");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (userPhones)");
  });

  describe("#create", () => {
    const options = {"userId":"aasdfasdfasdfadsfadfa","countryCode":23,"operatorCode":23,"number":23,"type":["new value"],"isDefault":true};

    beforeEach(async () => {
      userPhoneCreated = await thisService.create(options);
    });

    it("should create a new userPhone", () => {
      assert.strictEqual(userPhoneCreated.userId, options.userId);
assert.strictEqual(userPhoneCreated.countryCode, options.countryCode);
assert.strictEqual(userPhoneCreated.operatorCode, options.operatorCode);
assert.strictEqual(userPhoneCreated.number, options.number);
assert.strictEqual(userPhoneCreated.type, options.type);
assert.strictEqual(userPhoneCreated.isDefault, options.isDefault);
    });
  });

  describe("#get", () => {
    it("should retrieve a userPhone by ID", async () => {
      const retrieved = await thisService.get(userPhoneCreated._id);
      assert.strictEqual(retrieved._id, userPhoneCreated._id);
    });
  });

  describe("#update", () => {
    let userPhoneUpdated;
    const options = {"userId":"345345345345345345345","countryCode":100,"operatorCode":100,"number":100,"type":["updated value"],"isDefault":false};

    beforeEach(async () => {
      userPhoneUpdated = await thisService.update(userPhoneCreated._id, options);
    });

    it("should update an existing userPhone ", async () => {
      assert.strictEqual(userPhoneUpdated.userId, options.userId);
assert.strictEqual(userPhoneUpdated.countryCode, options.countryCode);
assert.strictEqual(userPhoneUpdated.operatorCode, options.operatorCode);
assert.strictEqual(userPhoneUpdated.number, options.number);
assert.strictEqual(userPhoneUpdated.type, options.type);
assert.strictEqual(userPhoneUpdated.isDefault, options.isDefault);
    });
  });

  describe("#delete", () => {
  let userPhoneDeleted;
    beforeEach(async () => {
      userPhoneDeleted = await thisService.remove(userPhoneCreated._id);
    });

    it("should delete a userPhone", async () => {
      assert.strictEqual(userPhoneDeleted._id, userPhoneCreated._id);
    });
  });
});