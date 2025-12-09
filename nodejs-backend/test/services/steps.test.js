const assert = require("assert");
const app = require("../../src/app");

describe("steps service", () => {
  let thisService;
  let stepCreated;

  beforeEach(async () => {
    thisService = await app.service("steps");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (steps)");
  });

  describe("#create", () => {
    const options = {"userGuideID":"aasdfasdfasdfadsfadfa","Steps":"new value","Description":"new value"};

    beforeEach(async () => {
      stepCreated = await thisService.create(options);
    });

    it("should create a new step", () => {
      assert.strictEqual(stepCreated.userGuideID, options.userGuideID);
assert.strictEqual(stepCreated.Steps, options.Steps);
assert.strictEqual(stepCreated.Description, options.Description);
    });
  });

  describe("#get", () => {
    it("should retrieve a step by ID", async () => {
      const retrieved = await thisService.get(stepCreated._id);
      assert.strictEqual(retrieved._id, stepCreated._id);
    });
  });

  describe("#update", () => {
    let stepUpdated;
    const options = {"userGuideID":"345345345345345345345","Steps":"updated value","Description":"updated value"};

    beforeEach(async () => {
      stepUpdated = await thisService.update(stepCreated._id, options);
    });

    it("should update an existing step ", async () => {
      assert.strictEqual(stepUpdated.userGuideID, options.userGuideID);
assert.strictEqual(stepUpdated.Steps, options.Steps);
assert.strictEqual(stepUpdated.Description, options.Description);
    });
  });

  describe("#delete", () => {
  let stepDeleted;
    beforeEach(async () => {
      stepDeleted = await thisService.remove(stepCreated._id);
    });

    it("should delete a step", async () => {
      assert.strictEqual(stepDeleted._id, stepCreated._id);
    });
  });
});