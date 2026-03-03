
import { faker } from "@faker-js/faker";
export default (user,count,chatAiEnablerIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: faker.lorem.sentence(""),
chatAiEnabler: chatAiEnablerIds[i % chatAiEnablerIds.length],
bedrockModelId: faker.lorem.sentence(""),
modelParamsJson: faker.lorem.sentence(""),
human: faker.lorem.sentence(""),
task: faker.lorem.sentence(""),
noCondition: faker.lorem.sentence(""),
yesCondition: faker.lorem.sentence(""),
documents: faker.lorem.sentence(""),
example: faker.lorem.sentence(""),
preamble: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
