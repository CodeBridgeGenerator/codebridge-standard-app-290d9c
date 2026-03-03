
    module.exports = function (app) {
        const modelName = "fcm_messages";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            title: { type:  String , comment: "Title, p, false, true, true, true, true, true, true, , , , ," },
body: { type:  String , required: true, comment: "Body, p, false, true, true, true, true, true, true, , , , ," },
recipients: { type: [Schema.Types.ObjectId], ref: "users", description: "isArray", comment: "Recipients, multiselect, false, true, true, true, true, true, true, users, users, one-to-many, name," },
image: { type:  String , comment: "Image, p, false, true, true, true, true, true, true, , , , ," },
from: { type: Schema.Types.ObjectId, ref: "users", comment: "from, dropdown, false, true, true, true, true, true, true, users, users, one-to-one, name," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };