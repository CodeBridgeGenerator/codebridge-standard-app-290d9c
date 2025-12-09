const assert = require("assert");
const app = require("../../src/app");

describe("staffinfo service", () => {
  let thisService;
  let staffinfoCreated;

  beforeEach(async () => {
    thisService = await app.service("staffinfo");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (staffinfo)");
  });

  describe("#create", () => {
    const options = {"empno":23,"name":"new value","namenric":"new value","compcode":23,"compname":"new value","deptcode":"new value","deptdesc":"new value","sectcode":23,"sectdesc":"new value","designation":"new value","email":"new value","resign":"new value","supervisor":"new value","datejoin":23,"empgroup":"new value","empgradecode":"new value","terminationdate":"new value"};

    beforeEach(async () => {
      staffinfoCreated = await thisService.create(options);
    });

    it("should create a new staffinfo", () => {
      assert.strictEqual(staffinfoCreated.empno, options.empno);
assert.strictEqual(staffinfoCreated.name, options.name);
assert.strictEqual(staffinfoCreated.namenric, options.namenric);
assert.strictEqual(staffinfoCreated.compcode, options.compcode);
assert.strictEqual(staffinfoCreated.compname, options.compname);
assert.strictEqual(staffinfoCreated.deptcode, options.deptcode);
assert.strictEqual(staffinfoCreated.deptdesc, options.deptdesc);
assert.strictEqual(staffinfoCreated.sectcode, options.sectcode);
assert.strictEqual(staffinfoCreated.sectdesc, options.sectdesc);
assert.strictEqual(staffinfoCreated.designation, options.designation);
assert.strictEqual(staffinfoCreated.email, options.email);
assert.strictEqual(staffinfoCreated.resign, options.resign);
assert.strictEqual(staffinfoCreated.supervisor, options.supervisor);
assert.strictEqual(staffinfoCreated.datejoin, options.datejoin);
assert.strictEqual(staffinfoCreated.empgroup, options.empgroup);
assert.strictEqual(staffinfoCreated.empgradecode, options.empgradecode);
assert.strictEqual(staffinfoCreated.terminationdate, options.terminationdate);
    });
  });

  describe("#get", () => {
    it("should retrieve a staffinfo by ID", async () => {
      const retrieved = await thisService.get(staffinfoCreated._id);
      assert.strictEqual(retrieved._id, staffinfoCreated._id);
    });
  });

  describe("#update", () => {
    let staffinfoUpdated;
    const options = {"empno":100,"name":"updated value","namenric":"updated value","compcode":100,"compname":"updated value","deptcode":"updated value","deptdesc":"updated value","sectcode":100,"sectdesc":"updated value","designation":"updated value","email":"updated value","resign":"updated value","supervisor":"updated value","datejoin":100,"empgroup":"updated value","empgradecode":"updated value","terminationdate":"updated value"};

    beforeEach(async () => {
      staffinfoUpdated = await thisService.update(staffinfoCreated._id, options);
    });

    it("should update an existing staffinfo ", async () => {
      assert.strictEqual(staffinfoUpdated.empno, options.empno);
assert.strictEqual(staffinfoUpdated.name, options.name);
assert.strictEqual(staffinfoUpdated.namenric, options.namenric);
assert.strictEqual(staffinfoUpdated.compcode, options.compcode);
assert.strictEqual(staffinfoUpdated.compname, options.compname);
assert.strictEqual(staffinfoUpdated.deptcode, options.deptcode);
assert.strictEqual(staffinfoUpdated.deptdesc, options.deptdesc);
assert.strictEqual(staffinfoUpdated.sectcode, options.sectcode);
assert.strictEqual(staffinfoUpdated.sectdesc, options.sectdesc);
assert.strictEqual(staffinfoUpdated.designation, options.designation);
assert.strictEqual(staffinfoUpdated.email, options.email);
assert.strictEqual(staffinfoUpdated.resign, options.resign);
assert.strictEqual(staffinfoUpdated.supervisor, options.supervisor);
assert.strictEqual(staffinfoUpdated.datejoin, options.datejoin);
assert.strictEqual(staffinfoUpdated.empgroup, options.empgroup);
assert.strictEqual(staffinfoUpdated.empgradecode, options.empgradecode);
assert.strictEqual(staffinfoUpdated.terminationdate, options.terminationdate);
    });
  });

  describe("#delete", () => {
  let staffinfoDeleted;
    beforeEach(async () => {
      staffinfoDeleted = await thisService.remove(staffinfoCreated._id);
    });

    it("should delete a staffinfo", async () => {
      assert.strictEqual(staffinfoDeleted._id, staffinfoCreated._id);
    });
  });
});