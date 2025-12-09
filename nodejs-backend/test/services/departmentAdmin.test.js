const assert = require("assert");
const app = require("../../src/app");

describe("departmentAdmin service", () => {
  let thisService;
  let departmentAdminCreated;

  beforeEach(async () => {
    thisService = await app.service("departmentAdmin");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (departmentAdmin)");
  });

  describe("#create", () => {
    const options = {"departmentId":"aasdfasdfasdfadsfadfa","employeeId":"aasdfasdfasdfadsfadfa"};

    beforeEach(async () => {
      departmentAdminCreated = await thisService.create(options);
    });

    it("should create a new departmentAdmin", () => {
      assert.strictEqual(departmentAdminCreated.departmentId, options.departmentId);
assert.strictEqual(departmentAdminCreated.employeeId, options.employeeId);
    });
  });

  describe("#get", () => {
    it("should retrieve a departmentAdmin by ID", async () => {
      const retrieved = await thisService.get(departmentAdminCreated._id);
      assert.strictEqual(retrieved._id, departmentAdminCreated._id);
    });
  });

  describe("#update", () => {
    let departmentAdminUpdated;
    const options = {"departmentId":"345345345345345345345","employeeId":"345345345345345345345"};

    beforeEach(async () => {
      departmentAdminUpdated = await thisService.update(departmentAdminCreated._id, options);
    });

    it("should update an existing departmentAdmin ", async () => {
      assert.strictEqual(departmentAdminUpdated.departmentId, options.departmentId);
assert.strictEqual(departmentAdminUpdated.employeeId, options.employeeId);
    });
  });

  describe("#delete", () => {
  let departmentAdminDeleted;
    beforeEach(async () => {
      departmentAdminDeleted = await thisService.remove(departmentAdminCreated._id);
    });

    it("should delete a departmentAdmin", async () => {
      assert.strictEqual(departmentAdminDeleted._id, departmentAdminCreated._id);
    });
  });
});