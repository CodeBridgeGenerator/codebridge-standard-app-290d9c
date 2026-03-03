
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
serviceName: faker.lorem.sentence("8"),
action: faker.lorem.sentence(""),
details: faker.lorem.sentence(""),
method: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
