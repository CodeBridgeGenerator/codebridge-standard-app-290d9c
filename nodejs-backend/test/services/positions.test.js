const assert = require("assert");
const app = require("../../src/app");

describe("positions service", () => {
  let thisService;
  let positionCreated;

  beforeEach(async () => {
    thisService = await app.service("positions");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (positions)");
  });

  describe("#create", () => {
    const options = {"roleId":"aasdfasdfasdfadsfadfa","name":"new value","description":"new value","abbr":"new value","isDefault":true};

    beforeEach(async () => {
      positionCreated = await thisService.create(options);
    });

    it("should create a new position", () => {
      assert.strictEqual(positionCreated.roleId, options.roleId);
assert.strictEqual(positionCreated.name, options.name);
assert.strictEqual(positionCreated.description, options.description);
assert.strictEqual(positionCreated.abbr, options.abbr);
assert.strictEqual(positionCreated.isDefault, options.isDefault);
    });
  });

  describe("#get", () => {
    it("should retrieve a position by ID", async () => {
      const retrieved = await thisService.get(positionCreated._id);
      assert.strictEqual(retrieved._id, positionCreated._id);
    });
  });

  describe("#update", () => {
    let positionUpdated;
    const options = {"roleId":"345345345345345345345","name":"updated value","description":"updated value","abbr":"updated value","isDefault":false};

    beforeEach(async () => {
      positionUpdated = await thisService.update(positionCreated._id, options);
    });

    it("should update an existing position ", async () => {
      assert.strictEqual(positionUpdated.roleId, options.roleId);
assert.strictEqual(positionUpdated.name, options.name);
assert.strictEqual(positionUpdated.description, options.description);
assert.strictEqual(positionUpdated.abbr, options.abbr);
assert.strictEqual(positionUpdated.isDefault, options.isDefault);
    });
  });

  describe("#delete", () => {
  let positionDeleted;
    beforeEach(async () => {
      positionDeleted = await thisService.remove(positionCreated._id);
    });

    it("should delete a position", async () => {
      assert.strictEqual(positionDeleted._id, positionCreated._id);
    });
  });
});