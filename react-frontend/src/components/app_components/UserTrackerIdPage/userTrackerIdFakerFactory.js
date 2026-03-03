
import { faker } from "@faker-js/faker";
export default (user,count,userIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
pageName: faker.datatype.boolean(""),
trackerCode: faker.datatype.boolean(""),
userAgent: faker.datatype.boolean(""),
language: faker.datatype.boolean(""),
timeZone: faker.datatype.boolean(""),
cookeisEnabled: faker.datatype.boolean(""),
doNotTrack: faker.datatype.boolean(""),
hardConcurrency: faker.datatype.boolean(""),
marketCode: faker.datatype.boolean(""),
isLoggedIn: faker.datatype.boolean(""),
userId: userIdIds[i % userIdIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
