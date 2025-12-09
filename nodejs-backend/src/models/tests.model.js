
    module.exports = function (app) {
        const modelName = "tests";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            stack: { type:  String , minLength: 3, maxLength: 1000000, index: true, trim: true, comment: "Stack, p, false, true, true, true, true, true, true, , , , ," },
service: { type:  String , minLength: 3, maxLength: 100000000, index: true, trim: true, comment: "Service, p, false, true, true, true, true, true, true, , , , ," },
passed: { type: Number, max: 100000000, comment: "Passed, badge, false, true, true, true, true, true, true, , , , ," },
failed: { type: Number, max: 100000000, comment: "Failed, badge, false, true, true, true, true, true, true, , , , ," },
notes: { type:  String , minLength: 3, maxLength: 100000000, index: true, trim: true, comment: "Notes, p, false, true, true, true, true, true, true, , , , ," },

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