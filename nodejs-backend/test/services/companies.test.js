const assert = require("assert");
const app = require("../../src/app");

describe("companies service", () => {
  let thisService;
  let companyCreated;

  beforeEach(async () => {
    thisService = await app.service("companies");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (companies)");
  });

  describe("#create", () => {
    const options = {"name":"new value","companyNo":"new value","newCompanyNumber":23,"DateIncorporated":1765271467432,"isdefault":true};

    beforeEach(async () => {
      companyCreated = await thisService.create(options);
    });

    it("should create a new company", () => {
      assert.strictEqual(companyCreated.name, options.name);
assert.strictEqual(companyCreated.companyNo, options.companyNo);
assert.strictEqual(companyCreated.newCompanyNumber, options.newCompanyNumber);
assert.strictEqual(companyCreated.DateIncorporated, options.DateIncorporated);
assert.strictEqual(companyCreated.isdefault, options.isdefault);
    });
  });

  describe("#get", () => {
    it("should retrieve a company by ID", async () => {
      const retrieved = await thisService.get(companyCreated._id);
      assert.strictEqual(retrieved._id, companyCreated._id);
    });
  });

  describe("#update", () => {
    let companyUpdated;
    const options = {"name":"updated value","companyNo":"updated value","newCompanyNumber":100,"DateIncorporated":null,"isdefault":false};

    beforeEach(async () => {
      companyUpdated = await thisService.update(companyCreated._id, options);
    });

    it("should update an existing company ", async () => {
      assert.strictEqual(companyUpdated.name, options.name);
assert.strictEqual(companyUpdated.companyNo, options.companyNo);
assert.strictEqual(companyUpdated.newCompanyNumber, options.newCompanyNumber);
assert.strictEqual(companyUpdated.DateIncorporated, options.DateIncorporated);
assert.strictEqual(companyUpdated.isdefault, options.isdefault);
    });
  });

  describe("#delete", () => {
  let companyDeleted;
    beforeEach(async () => {
      companyDeleted = await thisService.remove(companyCreated._id);
    });

    it("should delete a company", async () => {
      assert.strictEqual(companyDeleted._id, companyCreated._id);
    });
  });
});