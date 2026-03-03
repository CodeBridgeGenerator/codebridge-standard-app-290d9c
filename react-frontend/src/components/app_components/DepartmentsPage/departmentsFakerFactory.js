
import { faker } from "@faker-js/faker";
export default (user,count,companyIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
company: companyIds[i % companyIds.length],
deptName: faker.lorem.sentence(""),
code: faker.lorem.sentence("8"),
isDefault: faker.datatype.boolean(),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
