
import { faker } from "@faker-js/faker";
export default (user,count,userContextIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
userContext: userContextIds[i % userContextIds.length],
menuItems: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
