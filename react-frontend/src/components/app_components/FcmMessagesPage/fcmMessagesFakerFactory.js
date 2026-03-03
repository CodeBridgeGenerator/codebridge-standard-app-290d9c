
import { faker } from "@faker-js/faker";
export default (user,count,fromIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
title: faker.lorem.sentence(""),
body: faker.datatype.number(""),
image: faker.datatype.number(""),
from: fromIds[i % fromIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
