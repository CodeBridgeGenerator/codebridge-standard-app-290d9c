
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
empNo: faker.lorem.sentence(""),
name: faker.lorem.sentence(""),
nameNric: faker.lorem.sentence(""),
compCode: faker.lorem.sentence(""),
compName: faker.lorem.sentence(""),
deptCode: faker.lorem.sentence(""),
deptDesc: faker.lorem.sentence(""),
sectCode: faker.lorem.sentence(""),
sectDesc: faker.lorem.sentence(""),
designation: faker.lorem.sentence(""),
email: faker.lorem.sentence(""),
resign: faker.lorem.sentence(""),
supervisor: faker.lorem.sentence(""),
dateJoin: faker.lorem.sentence(""),
empGroup: faker.lorem.sentence(""),
empGradeCode: faker.lorem.sentence(""),
terminationDate: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
