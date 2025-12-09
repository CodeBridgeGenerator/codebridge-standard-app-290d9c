const assert = require("assert");
const app = require("../../src/app");

describe("employees service", () => {
  let thisService;
  let employeeCreated;

  beforeEach(async () => {
    thisService = await app.service("employees");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (employees)");
  });

  describe("#create", () => {
    const options = {"empNo":"new value","name":"new value","fullname":"new value","company":"aasdfasdfasdfadsfadfa","department":"aasdfasdfasdfadsfadfa","section":"aasdfasdfasdfadsfadfa","position":"aasdfasdfasdfadsfadfa","supervisor":"aasdfasdfasdfadsfadfa","dateJoined":1765271467655,"dateTerminated":1765271467655,"resigned":"new value","empGroup":"new value","empCode":"new value"};

    beforeEach(async () => {
      employeeCreated = await thisService.create(options);
    });

    it("should create a new employee", () => {
      assert.strictEqual(employeeCreated.empNo, options.empNo);
assert.strictEqual(employeeCreated.name, options.name);
assert.strictEqual(employeeCreated.fullname, options.fullname);
assert.strictEqual(employeeCreated.company, options.company);
assert.strictEqual(employeeCreated.department, options.department);
assert.strictEqual(employeeCreated.section, options.section);
assert.strictEqual(employeeCreated.position, options.position);
assert.strictEqual(employeeCreated.supervisor, options.supervisor);
assert.strictEqual(employeeCreated.dateJoined, options.dateJoined);
assert.strictEqual(employeeCreated.dateTerminated, options.dateTerminated);
assert.strictEqual(employeeCreated.resigned, options.resigned);
assert.strictEqual(employeeCreated.empGroup, options.empGroup);
assert.strictEqual(employeeCreated.empCode, options.empCode);
    });
  });

  describe("#get", () => {
    it("should retrieve a employee by ID", async () => {
      const retrieved = await thisService.get(employeeCreated._id);
      assert.strictEqual(retrieved._id, employeeCreated._id);
    });
  });

  describe("#update", () => {
    let employeeUpdated;
    const options = {"empNo":"updated value","name":"updated value","fullname":"updated value","company":"345345345345345345345","department":"345345345345345345345","section":"345345345345345345345","position":"345345345345345345345","supervisor":"345345345345345345345","dateJoined":null,"dateTerminated":null,"resigned":"updated value","empGroup":"updated value","empCode":"updated value"};

    beforeEach(async () => {
      employeeUpdated = await thisService.update(employeeCreated._id, options);
    });

    it("should update an existing employee ", async () => {
      assert.strictEqual(employeeUpdated.empNo, options.empNo);
assert.strictEqual(employeeUpdated.name, options.name);
assert.strictEqual(employeeUpdated.fullname, options.fullname);
assert.strictEqual(employeeUpdated.company, options.company);
assert.strictEqual(employeeUpdated.department, options.department);
assert.strictEqual(employeeUpdated.section, options.section);
assert.strictEqual(employeeUpdated.position, options.position);
assert.strictEqual(employeeUpdated.supervisor, options.supervisor);
assert.strictEqual(employeeUpdated.dateJoined, options.dateJoined);
assert.strictEqual(employeeUpdated.dateTerminated, options.dateTerminated);
assert.strictEqual(employeeUpdated.resigned, options.resigned);
assert.strictEqual(employeeUpdated.empGroup, options.empGroup);
assert.strictEqual(employeeUpdated.empCode, options.empCode);
    });
  });

  describe("#delete", () => {
  let employeeDeleted;
    beforeEach(async () => {
      employeeDeleted = await thisService.remove(employeeCreated._id);
    });

    it("should delete a employee", async () => {
      assert.strictEqual(employeeDeleted._id, employeeCreated._id);
    });
  });
});