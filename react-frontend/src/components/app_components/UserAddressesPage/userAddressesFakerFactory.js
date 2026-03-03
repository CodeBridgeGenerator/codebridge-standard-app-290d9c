
import { faker } from "@faker-js/faker";
export default (user,count,userIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
userId: userIdIds[i % userIdIds.length],
street1: faker.lorem.sentence(""),
street2: faker.lorem.sentence(""),
postalCode: faker.lorem.sentence(""),
city: faker.lorem.sentence(""),
state: faker.lorem.sentence(""),
province: faker.lorem.sentence(""),
country: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
