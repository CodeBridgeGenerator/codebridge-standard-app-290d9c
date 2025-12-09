const assert = require("assert");
const app = require("../../src/app");

describe("departments service", () => {
  let thisService;
  let departmentCreated;

  beforeEach(async () => {
    thisService = await app.service("departments");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (departments)");
  });

  describe("#create", () => {
    const options = {"companyIds":"aasdfasdfasdfadsfadfa","name":"new value","code":"new value","isDefault":true};

    beforeEach(async () => {
      departmentCreated = await thisService.create(options);
    });

    it("should create a new department", () => {
      assert.strictEqual(departmentCreated.companyIds, options.companyIds);
assert.strictEqual(departmentCreated.name, options.name);
assert.strictEqual(departmentCreated.code, options.code);
assert.strictEqual(departmentCreated.isDefault, options.isDefault);
    });
  });

  describe("#get", () => {
    it("should retrieve a department by ID", async () => {
      const retrieved = await thisService.get(departmentCreated._id);
      assert.strictEqual(retrieved._id, departmentCreated._id);
    });
  });

  describe("#update", () => {
    let departmentUpdated;
    const options = {"companyIds":"345345345345345345345","name":"updated value","code":"updated value","isDefault":false};

    beforeEach(async () => {
      departmentUpdated = await thisService.update(departmentCreated._id, options);
    });

    it("should update an existing department ", async () => {
      assert.strictEqual(departmentUpdated.companyIds, options.companyIds);
assert.strictEqual(departmentUpdated.name, options.name);
assert.strictEqual(departmentUpdated.code, options.code);
assert.strictEqual(departmentUpdated.isDefault, options.isDefault);
    });
  });

  describe("#delete", () => {
  let departmentDeleted;
    beforeEach(async () => {
      departmentDeleted = await thisService.remove(departmentCreated._id);
    });

    it("should delete a department", async () => {
      assert.strictEqual(departmentDeleted._id, departmentCreated._id);
    });
  });
});