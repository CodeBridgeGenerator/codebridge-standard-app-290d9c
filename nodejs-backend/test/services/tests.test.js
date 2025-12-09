const assert = require("assert");
const app = require("../../src/app");

describe("tests service", () => {
  let thisService;
  let testCreated;

  beforeEach(async () => {
    thisService = await app.service("tests");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (tests)");
  });

  describe("#create", () => {
    const options = {"stack":"new value","service":"new value","passed":23,"failed":23,"notes":"new value"};

    beforeEach(async () => {
      testCreated = await thisService.create(options);
    });

    it("should create a new test", () => {
      assert.strictEqual(testCreated.stack, options.stack);
assert.strictEqual(testCreated.service, options.service);
assert.strictEqual(testCreated.passed, options.passed);
assert.strictEqual(testCreated.failed, options.failed);
assert.strictEqual(testCreated.notes, options.notes);
    });
  });

  describe("#get", () => {
    it("should retrieve a test by ID", async () => {
      const retrieved = await thisService.get(testCreated._id);
      assert.strictEqual(retrieved._id, testCreated._id);
    });
  });

  describe("#update", () => {
    let testUpdated;
    const options = {"stack":"updated value","service":"updated value","passed":100,"failed":100,"notes":"updated value"};

    beforeEach(async () => {
      testUpdated = await thisService.update(testCreated._id, options);
    });

    it("should update an existing test ", async () => {
      assert.strictEqual(testUpdated.stack, options.stack);
assert.strictEqual(testUpdated.service, options.service);
assert.strictEqual(testUpdated.passed, options.passed);
assert.strictEqual(testUpdated.failed, options.failed);
assert.strictEqual(testUpdated.notes, options.notes);
    });
  });

  describe("#delete", () => {
  let testDeleted;
    beforeEach(async () => {
      testDeleted = await thisService.remove(testCreated._id);
    });

    it("should delete a test", async () => {
      assert.strictEqual(testDeleted._id, testCreated._id);
    });
  });
});