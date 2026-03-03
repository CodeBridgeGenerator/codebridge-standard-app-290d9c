
import { faker } from "@faker-js/faker";
export default (user,count,fromIds,toUserIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
from: fromIds[i % fromIds.length],
toUser: toUserIds[i % toUserIds.length],
subject: faker.datatype.boolean(""),
content: faker.datatype.boolean(""),
service: faker.datatype.boolean(""),
read: faker.datatype.boolean(""),
flagged: faker.datatype.boolean(""),
sent: faker.datatype.boolean(""),
links: faker.datatype.boolean(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
