
const companies = require("./companies/companies.service.js");
const branches = require("./branches/branches.service.js");
const departments = require("./departments/departments.service.js");
const sections = require("./sections/sections.service.js");
const roles = require("./roles/roles.service.js");
const positions = require("./positions/positions.service.js");
const profiles = require("./profiles/profiles.service.js");
const templates = require("./templates/templates.service.js");
const tests = require("./tests/tests.service.js");
const userAddresses = require("./userAddresses/userAddresses.service.js");
const companyAddresses = require("./companyAddresses/companyAddresses.service.js");
const companyPhones = require("./companyPhones/companyPhones.service.js");
const userPhones = require("./userPhones/userPhones.service.js");
const staffinfo = require("./staffinfo/staffinfo.service.js");
const employees = require("./employees/employees.service.js");
const superior = require("./superior/superior.service.js");
const departmentAdmin = require("./departmentAdmin/departmentAdmin.service.js");
const departmentHOD = require("./departmentHOD/departmentHOD.service.js");
const departmentHOS = require("./departmentHOS/departmentHOS.service.js");
const steps = require("./steps/steps.service.js");
const userGuide = require("./userGuide/userGuide.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
    
  app.configure(companies);
  app.configure(branches);
  app.configure(departments);
  app.configure(sections);
  app.configure(roles);
  app.configure(positions);
  app.configure(profiles);
  app.configure(templates);
  app.configure(tests);
  app.configure(userAddresses);
  app.configure(companyAddresses);
  app.configure(companyPhones);
  app.configure(userPhones);
  app.configure(staffinfo);
  app.configure(employees);
  app.configure(superior);
  app.configure(departmentAdmin);
  app.configure(departmentHOD);
  app.configure(departmentHOS);
  app.configure(steps);
  app.configure(userGuide);
    // ~cb-add-configure-service-name~
};
