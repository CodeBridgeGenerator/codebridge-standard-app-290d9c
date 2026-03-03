
import { faker } from "@faker-js/faker";
export default (user,count,chatAiEnablerIds,chatAiConfigIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
session: faker.lorem.sentence(""),
chatAiEnabler: chatAiEnablerIds[i % chatAiEnablerIds.length],
chatAiConfig: chatAiConfigIds[i % chatAiConfigIds.length],
prompt: faker.datatype.boolean(""),
refDocs: faker.datatype.boolean(""),
responseText: faker.datatype.boolean(""),
systemId: faker.datatype.boolean(""),
type: faker.datatype.boolean(""),
role: faker.datatype.boolean(""),
model: faker.datatype.boolean(""),
params: faker.datatype.boolean(""),
stopReason: faker.datatype.boolean(""),
stopSequence: faker.datatype.boolean(""),
inputTokens: faker.datatype.boolean(""),
outputTokens: faker.datatype.boolean(""),
cost: faker.datatype.boolean(""),
status: faker.datatype.boolean(""),
error: faker.datatype.boolean(""),
userRemarks: faker.datatype.boolean(""),
thumbsDown: faker.datatype.boolean(""),
thumbsUp: faker.datatype.boolean(""),
copies: faker.datatype.boolean(""),
emailed: faker.datatype.boolean(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
