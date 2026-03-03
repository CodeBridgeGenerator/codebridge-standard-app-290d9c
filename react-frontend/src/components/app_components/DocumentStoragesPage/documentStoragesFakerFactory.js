
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: faker.lorem.sentence(""),
size: faker.lorem.sentence(""),
path: faker.lorem.sentence(""),
lastModifiedDate: faker.lorem.sentence(""),
lastModified: faker.lorem.sentence(""),
eTag: faker.lorem.sentence(""),
versionId: faker.lorem.sentence(""),
url: faker.lorem.sentence(""),
tableId: faker.lorem.sentence(""),
tableName: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
