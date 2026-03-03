
import { faker } from "@faker-js/faker";
export default (user,count,userIdIds,roleIdIds,profileIds,positionIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
service: faker.datatype.boolean(""),
create: faker.datatype.boolean(""),
read: faker.datatype.boolean(""),
update: faker.datatype.boolean(""),
delete: faker.datatype.boolean(""),
import: faker.datatype.boolean(""),
export: faker.datatype.boolean(""),
seeder: faker.datatype.boolean(""),
userId: userIdIds[i % userIdIds.length],
roleId: roleIdIds[i % roleIdIds.length],
profile: profileIds[i % profileIds.length],
positionId: positionIdIds[i % positionIdIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
