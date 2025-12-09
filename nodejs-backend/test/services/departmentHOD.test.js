const assert = require("assert");
const app = require("../../src/app");

describe("departmentHOD service", () => {
  let thisService;
  let departmentHODCreated;

  beforeEach(async () => {
    thisService = await app.service("departmentHOD");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (departmentHOD)");
  });

  describe("#create", () => {
    const options = {"Department":"aasdfasdfasdfadsfadfa","Head":"aasdfasdfasdfadsfadfa"};

    beforeEach(async () => {
      departmentHODCreated = await thisService.create(options);
    });

    it("should create a new departmentHOD", () => {
      assert.strictEqual(departmentHODCreated.Department, options.Department);
assert.strictEqual(departmentHODCreated.Head, options.Head);
    });
  });

  describe("#get", () => {
    it("should retrieve a departmentHOD by ID", async () => {
      const retrieved = await thisService.get(departmentHODCreated._id);
      assert.strictEqual(retrieved._id, departmentHODCreated._id);
    });
  });

  describe("#update", () => {
    let departmentHODUpdated;
    const options = {"Department":"345345345345345345345","Head":"345345345345345345345"};

    beforeEach(async () => {
      departmentHODUpdated = await thisService.update(departmentHODCreated._id, options);
    });

    it("should update an existing departmentHOD ", async () => {
      assert.strictEqual(departmentHODUpdated.Department, options.Department);
assert.strictEqual(departmentHODUpdated.Head, options.Head);
    });
  });

  describe("#delete", () => {
  let departmentHODDeleted;
    beforeEach(async () => {
      departmentHODDeleted = await thisService.remove(departmentHODCreated._id);
    });

    it("should delete a departmentHOD", async () => {
      assert.strictEqual(departmentHODDeleted._id, departmentHODCreated._id);
    });
  });
});