
import { faker } from "@faker-js/faker";
export default (user,count,positionIds,roleIds,companyIds,branchIds,departmentIds,sectionIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
emailToInvite: faker.datatype.number(""),
status: faker.datatype.number(""),
position: positionIds[i % positionIds.length],
role: roleIds[i % roleIds.length],
company: companyIds[i % companyIds.length],
branch: branchIds[i % branchIds.length],
department: departmentIds[i % departmentIds.length],
section: sectionIds[i % sectionIds.length],
code: faker.datatype.number(""),
sendMailCounter: faker.datatype.number(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
