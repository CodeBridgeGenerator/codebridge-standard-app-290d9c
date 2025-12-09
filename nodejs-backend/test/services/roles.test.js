const assert = require("assert");
const app = require("../../src/app");

describe("roles service", () => {
  let thisService;
  let roleCreated;

  beforeEach(async () => {
    thisService = await app.service("roles");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (roles)");
  });

  describe("#create", () => {
    const options = {"name":"new value","description":"new value","isDefault":true};

    beforeEach(async () => {
      roleCreated = await thisService.create(options);
    });

    it("should create a new role", () => {
      assert.strictEqual(roleCreated.name, options.name);
assert.strictEqual(roleCreated.description, options.description);
assert.strictEqual(roleCreated.isDefault, options.isDefault);
    });
  });

  describe("#get", () => {
    it("should retrieve a role by ID", async () => {
      const retrieved = await thisService.get(roleCreated._id);
      assert.strictEqual(retrieved._id, roleCreated._id);
    });
  });

  describe("#update", () => {
    let roleUpdated;
    const options = {"name":"updated value","description":"updated value","isDefault":false};

    beforeEach(async () => {
      roleUpdated = await thisService.update(roleCreated._id, options);
    });

    it("should update an existing role ", async () => {
      assert.strictEqual(roleUpdated.name, options.name);
assert.strictEqual(roleUpdated.description, options.description);
assert.strictEqual(roleUpdated.isDefault, options.isDefault);
    });
  });

  describe("#delete", () => {
  let roleDeleted;
    beforeEach(async () => {
      roleDeleted = await thisService.remove(roleCreated._id);
    });

    it("should delete a role", async () => {
      assert.strictEqual(roleDeleted._id, roleCreated._id);
    });
  });
});