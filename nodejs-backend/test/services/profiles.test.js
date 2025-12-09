const assert = require("assert");
const app = require("../../src/app");

describe("profiles service", () => {
  let thisService;
  let profileCreated;

  beforeEach(async () => {
    thisService = await app.service("profiles");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (profiles)");
  });

  describe("#create", () => {
    const options = {"name":"new value","userId":"aasdfasdfasdfadsfadfa","image":"new value","bio":"new value","department":"aasdfasdfasdfadsfadfa","hod":true,"section":"aasdfasdfasdfadsfadfa","hos":true,"position":"aasdfasdfasdfadsfadfa","manager":"aasdfasdfasdfadsfadfa","company":"aasdfasdfasdfadsfadfa","branch":"aasdfasdfasdfadsfadfa","skills":"new value","address":"aasdfasdfasdfadsfadfa","phone":"aasdfasdfasdfadsfadfa"};

    beforeEach(async () => {
      profileCreated = await thisService.create(options);
    });

    it("should create a new profile", () => {
      assert.strictEqual(profileCreated.name, options.name);
assert.strictEqual(profileCreated.userId, options.userId);
assert.strictEqual(profileCreated.image, options.image);
assert.strictEqual(profileCreated.bio, options.bio);
assert.strictEqual(profileCreated.department, options.department);
assert.strictEqual(profileCreated.hod, options.hod);
assert.strictEqual(profileCreated.section, options.section);
assert.strictEqual(profileCreated.hos, options.hos);
assert.strictEqual(profileCreated.position, options.position);
assert.strictEqual(profileCreated.manager, options.manager);
assert.strictEqual(profileCreated.company, options.company);
assert.strictEqual(profileCreated.branch, options.branch);
assert.strictEqual(profileCreated.skills, options.skills);
assert.strictEqual(profileCreated.address, options.address);
assert.strictEqual(profileCreated.phone, options.phone);
    });
  });

  describe("#get", () => {
    it("should retrieve a profile by ID", async () => {
      const retrieved = await thisService.get(profileCreated._id);
      assert.strictEqual(retrieved._id, profileCreated._id);
    });
  });

  describe("#update", () => {
    let profileUpdated;
    const options = {"name":"updated value","userId":"345345345345345345345","image":"updated value","bio":"updated value","department":"345345345345345345345","hod":false,"section":"345345345345345345345","hos":false,"position":"345345345345345345345","manager":"345345345345345345345","company":"345345345345345345345","branch":"345345345345345345345","skills":"updated value","address":"345345345345345345345","phone":"345345345345345345345"};

    beforeEach(async () => {
      profileUpdated = await thisService.update(profileCreated._id, options);
    });

    it("should update an existing profile ", async () => {
      assert.strictEqual(profileUpdated.name, options.name);
assert.strictEqual(profileUpdated.userId, options.userId);
assert.strictEqual(profileUpdated.image, options.image);
assert.strictEqual(profileUpdated.bio, options.bio);
assert.strictEqual(profileUpdated.department, options.department);
assert.strictEqual(profileUpdated.hod, options.hod);
assert.strictEqual(profileUpdated.section, options.section);
assert.strictEqual(profileUpdated.hos, options.hos);
assert.strictEqual(profileUpdated.position, options.position);
assert.strictEqual(profileUpdated.manager, options.manager);
assert.strictEqual(profileUpdated.company, options.company);
assert.strictEqual(profileUpdated.branch, options.branch);
assert.strictEqual(profileUpdated.skills, options.skills);
assert.strictEqual(profileUpdated.address, options.address);
assert.strictEqual(profileUpdated.phone, options.phone);
    });
  });

  describe("#delete", () => {
  let profileDeleted;
    beforeEach(async () => {
      profileDeleted = await thisService.remove(profileCreated._id);
    });

    it("should delete a profile", async () => {
      assert.strictEqual(profileDeleted._id, profileCreated._id);
    });
  });
});