
import { faker } from "@faker-js/faker";
export default (user,count,companyIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
company: companyIds[i % companyIds.length],
street1: faker.datatype.boolean(""),
street2: faker.datatype.boolean(""),
poscode: faker.datatype.boolean(""),
city: faker.datatype.boolean(""),
state: faker.datatype.boolean(""),
province: faker.datatype.boolean(""),
country: faker.datatype.boolean(""),
isDefault: faker.datatype.boolean(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
