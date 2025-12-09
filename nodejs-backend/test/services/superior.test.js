const assert = require("assert");
const app = require("../../src/app");

describe("superior service", () => {
  let thisService;
  let superiorCreated;

  beforeEach(async () => {
    thisService = await app.service("superior");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (superior)");
  });

  describe("#create", () => {
    const options = {"superior":"aasdfasdfasdfadsfadfa","subordinate":"aasdfasdfasdfadsfadfa"};

    beforeEach(async () => {
      superiorCreated = await thisService.create(options);
    });

    it("should create a new superior", () => {
      assert.strictEqual(superiorCreated.superior, options.superior);
assert.strictEqual(superiorCreated.subordinate, options.subordinate);
    });
  });

  describe("#get", () => {
    it("should retrieve a superior by ID", async () => {
      const retrieved = await thisService.get(superiorCreated._id);
      assert.strictEqual(retrieved._id, superiorCreated._id);
    });
  });

  describe("#update", () => {
    let superiorUpdated;
    const options = {"superior":"345345345345345345345","subordinate":"345345345345345345345"};

    beforeEach(async () => {
      superiorUpdated = await thisService.update(superiorCreated._id, options);
    });

    it("should update an existing superior ", async () => {
      assert.strictEqual(superiorUpdated.superior, options.superior);
assert.strictEqual(superiorUpdated.subordinate, options.subordinate);
    });
  });

  describe("#delete", () => {
  let superiorDeleted;
    beforeEach(async () => {
      superiorDeleted = await thisService.remove(superiorCreated._id);
    });

    it("should delete a superior", async () => {
      assert.strictEqual(superiorDeleted._id, superiorCreated._id);
    });
  });
});