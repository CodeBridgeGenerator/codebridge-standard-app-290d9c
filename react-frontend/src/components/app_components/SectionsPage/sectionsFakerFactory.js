
import { faker } from "@faker-js/faker";
export default (user,count,departmentIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
departmentId: departmentIdIds[i % departmentIdIds.length],
name: faker.lorem.sentence(""),
code: faker.lorem.sentence(""),
isDefault: faker.datatype.boolean(),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
