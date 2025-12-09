const assert = require("assert");
const app = require("../../src/app");

describe("sections service", () => {
  let thisService;
  let sectionCreated;

  beforeEach(async () => {
    thisService = await app.service("sections");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (sections)");
  });

  describe("#create", () => {
    const options = {"departmentId":"aasdfasdfasdfadsfadfa","name":"new value","code":"new value","isDefault":true};

    beforeEach(async () => {
      sectionCreated = await thisService.create(options);
    });

    it("should create a new section", () => {
      assert.strictEqual(sectionCreated.departmentId, options.departmentId);
assert.strictEqual(sectionCreated.name, options.name);
assert.strictEqual(sectionCreated.code, options.code);
assert.strictEqual(sectionCreated.isDefault, options.isDefault);
    });
  });

  describe("#get", () => {
    it("should retrieve a section by ID", async () => {
      const retrieved = await thisService.get(sectionCreated._id);
      assert.strictEqual(retrieved._id, sectionCreated._id);
    });
  });

  describe("#update", () => {
    let sectionUpdated;
    const options = {"departmentId":"345345345345345345345","name":"updated value","code":"updated value","isDefault":false};

    beforeEach(async () => {
      sectionUpdated = await thisService.update(sectionCreated._id, options);
    });

    it("should update an existing section ", async () => {
      assert.strictEqual(sectionUpdated.departmentId, options.departmentId);
assert.strictEqual(sectionUpdated.name, options.name);
assert.strictEqual(sectionUpdated.code, options.code);
assert.strictEqual(sectionUpdated.isDefault, options.isDefault);
    });
  });

  describe("#delete", () => {
  let sectionDeleted;
    beforeEach(async () => {
      sectionDeleted = await thisService.remove(sectionCreated._id);
    });

    it("should delete a section", async () => {
      assert.strictEqual(sectionDeleted._id, sectionCreated._id);
    });
  });
});