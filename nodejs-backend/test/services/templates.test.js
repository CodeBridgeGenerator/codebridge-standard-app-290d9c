const assert = require("assert");
const app = require("../../src/app");

describe("templates service", () => {
  let thisService;
  let templateCreated;

  beforeEach(async () => {
    thisService = await app.service("templates");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (templates)");
  });

  describe("#create", () => {
    const options = {"name":"new value","subject":"new value","body":"new value","variables":"new value","image":"new value"};

    beforeEach(async () => {
      templateCreated = await thisService.create(options);
    });

    it("should create a new template", () => {
      assert.strictEqual(templateCreated.name, options.name);
assert.strictEqual(templateCreated.subject, options.subject);
assert.strictEqual(templateCreated.body, options.body);
assert.strictEqual(templateCreated.variables, options.variables);
assert.strictEqual(templateCreated.image, options.image);
    });
  });

  describe("#get", () => {
    it("should retrieve a template by ID", async () => {
      const retrieved = await thisService.get(templateCreated._id);
      assert.strictEqual(retrieved._id, templateCreated._id);
    });
  });

  describe("#update", () => {
    let templateUpdated;
    const options = {"name":"updated value","subject":"updated value","body":"updated value","variables":"updated value","image":"updated value"};

    beforeEach(async () => {
      templateUpdated = await thisService.update(templateCreated._id, options);
    });

    it("should update an existing template ", async () => {
      assert.strictEqual(templateUpdated.name, options.name);
assert.strictEqual(templateUpdated.subject, options.subject);
assert.strictEqual(templateUpdated.body, options.body);
assert.strictEqual(templateUpdated.variables, options.variables);
assert.strictEqual(templateUpdated.image, options.image);
    });
  });

  describe("#delete", () => {
  let templateDeleted;
    beforeEach(async () => {
      templateDeleted = await thisService.remove(templateCreated._id);
    });

    it("should delete a template", async () => {
      assert.strictEqual(templateDeleted._id, templateCreated._id);
    });
  });
});