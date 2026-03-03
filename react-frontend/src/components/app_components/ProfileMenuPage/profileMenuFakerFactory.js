
import { faker } from "@faker-js/faker";
export default (user,count,userIds,companyIds,branchIds,sectionIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
user: userIds[i % userIds.length],
menuItems: faker.lorem.sentence(1),
company: companyIds[i % companyIds.length],
branch: branchIds[i % branchIds.length],
section: sectionIds[i % sectionIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
