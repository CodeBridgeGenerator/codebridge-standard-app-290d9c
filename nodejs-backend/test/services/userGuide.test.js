const assert = require("assert");
const app = require("../../src/app");

describe("userGuide service", () => {
  let thisService;
  let userGuideCreated;

  beforeEach(async () => {
    thisService = await app.service("userGuide");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (userGuide)");
  });

  describe("#create", () => {
    const options = {"serviceName":"new value","expiry":1765271467743};

    beforeEach(async () => {
      userGuideCreated = await thisService.create(options);
    });

    it("should create a new userGuide", () => {
      assert.strictEqual(userGuideCreated.serviceName, options.serviceName);
assert.strictEqual(userGuideCreated.expiry, options.expiry);
    });
  });

  describe("#get", () => {
    it("should retrieve a userGuide by ID", async () => {
      const retrieved = await thisService.get(userGuideCreated._id);
      assert.strictEqual(retrieved._id, userGuideCreated._id);
    });
  });

  describe("#update", () => {
    let userGuideUpdated;
    const options = {"serviceName":"updated value","expiry":null};

    beforeEach(async () => {
      userGuideUpdated = await thisService.update(userGuideCreated._id, options);
    });

    it("should update an existing userGuide ", async () => {
      assert.strictEqual(userGuideUpdated.serviceName, options.serviceName);
assert.strictEqual(userGuideUpdated.expiry, options.expiry);
    });
  });

  describe("#delete", () => {
  let userGuideDeleted;
    beforeEach(async () => {
      userGuideDeleted = await thisService.remove(userGuideCreated._id);
    });

    it("should delete a userGuide", async () => {
      assert.strictEqual(userGuideDeleted._id, userGuideCreated._id);
    });
  });
});