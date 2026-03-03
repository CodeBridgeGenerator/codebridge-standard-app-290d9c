
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
empNo: faker.lorem.sentence(""),
name: faker.lorem.sentence(""),
fullName: faker.lorem.sentence(""),
company: faker.lorem.sentence("8"),
department: faker.lorem.sentence("8"),
section: faker.lorem.sentence("8"),
position: faker.lorem.sentence("8"),
supervisor: faker.lorem.sentence("8"),
dateJoined: faker.lorem.sentence("8"),
dateTerminated: faker.lorem.sentence("8"),
resigned: faker.lorem.sentence(""),
empGroup: faker.lorem.sentence(""),
empCode: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
