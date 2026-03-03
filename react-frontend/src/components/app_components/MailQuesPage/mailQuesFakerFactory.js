
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: faker.date.past(""),
from: faker.date.past(""),
subject: faker.date.past(""),
recipients: faker.date.past(""),
content: faker.date.past(""),
payload: faker.date.past(""),
templateId: faker.date.past(""),
status: faker.date.past(""),
jobId: faker.date.past(""),
end: faker.date.past(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
