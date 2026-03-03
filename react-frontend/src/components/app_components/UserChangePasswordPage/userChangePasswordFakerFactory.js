
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
userEmail: faker.lorem.sentence(""),
server: faker.lorem.sentence(""),
environment: faker.lorem.sentence(""),
code: faker.lorem.sentence(""),
status: faker.lorem.sentence(""),
sendEmailCounter: faker.lorem.sentence(""),
lastAttempt: faker.lorem.sentence(""),
ipAddress: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
