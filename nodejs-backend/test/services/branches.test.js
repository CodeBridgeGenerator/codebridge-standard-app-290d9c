const assert = require("assert");
const app = require("../../src/app");

describe("branches service", () => {
  let thisService;
  let branchCreated;

  beforeEach(async () => {
    thisService = await app.service("branches");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (branches)");
  });

  describe("#create", () => {
    const options = {"companyId":"aasdfasdfasdfadsfadfa","name":"new value","isDefault":true};

    beforeEach(async () => {
      branchCreated = await thisService.create(options);
    });

    it("should create a new branch", () => {
      assert.strictEqual(branchCreated.companyId, options.companyId);
assert.strictEqual(branchCreated.name, options.name);
assert.strictEqual(branchCreated.isDefault, options.isDefault);
    });
  });

  describe("#get", () => {
    it("should retrieve a branch by ID", async () => {
      const retrieved = await thisService.get(branchCreated._id);
      assert.strictEqual(retrieved._id, branchCreated._id);
    });
  });

  describe("#update", () => {
    let branchUpdated;
    const options = {"companyId":"345345345345345345345","name":"updated value","isDefault":false};

    beforeEach(async () => {
      branchUpdated = await thisService.update(branchCreated._id, options);
    });

    it("should update an existing branch ", async () => {
      assert.strictEqual(branchUpdated.companyId, options.companyId);
assert.strictEqual(branchUpdated.name, options.name);
assert.strictEqual(branchUpdated.isDefault, options.isDefault);
    });
  });

  describe("#delete", () => {
  let branchDeleted;
    beforeEach(async () => {
      branchDeleted = await thisService.remove(branchCreated._id);
    });

    it("should delete a branch", async () => {
      assert.strictEqual(branchDeleted._id, branchCreated._id);
    });
  });
});