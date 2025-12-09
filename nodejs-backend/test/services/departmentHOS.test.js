const assert = require("assert");
const app = require("../../src/app");

describe("departmentHOS service", () => {
  let thisService;
  let departmentHOCreated;

  beforeEach(async () => {
    thisService = await app.service("departmentHOS");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (departmentHOS)");
  });

  describe("#create", () => {
    const options = {"departmentId":"aasdfasdfasdfadsfadfa","sectionHead":"aasdfasdfasdfadsfadfa"};

    beforeEach(async () => {
      departmentHOCreated = await thisService.create(options);
    });

    it("should create a new departmentHO", () => {
      assert.strictEqual(departmentHOCreated.departmentId, options.departmentId);
assert.strictEqual(departmentHOCreated.sectionHead, options.sectionHead);
    });
  });

  describe("#get", () => {
    it("should retrieve a departmentHO by ID", async () => {
      const retrieved = await thisService.get(departmentHOCreated._id);
      assert.strictEqual(retrieved._id, departmentHOCreated._id);
    });
  });

  describe("#update", () => {
    let departmentHOUpdated;
    const options = {"departmentId":"345345345345345345345","sectionHead":"345345345345345345345"};

    beforeEach(async () => {
      departmentHOUpdated = await thisService.update(departmentHOCreated._id, options);
    });

    it("should update an existing departmentHO ", async () => {
      assert.strictEqual(departmentHOUpdated.departmentId, options.departmentId);
assert.strictEqual(departmentHOUpdated.sectionHead, options.sectionHead);
    });
  });

  describe("#delete", () => {
  let departmentHODeleted;
    beforeEach(async () => {
      departmentHODeleted = await thisService.remove(departmentHOCreated._id);
    });

    it("should delete a departmentHO", async () => {
      assert.strictEqual(departmentHODeleted._id, departmentHOCreated._id);
    });
  });
});