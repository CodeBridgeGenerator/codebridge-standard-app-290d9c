
import { faker } from "@faker-js/faker";
export default (user,count,userIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
serviceName: faker.lorem.sentence(""),
user: userIds[i % userIds.length],
results: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
