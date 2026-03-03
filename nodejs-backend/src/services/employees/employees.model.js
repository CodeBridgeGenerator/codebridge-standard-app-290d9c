
    module.exports = function (app) {
        const modelName = "employees";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            empNo: { type:  String , required: true, comment: "Emp No, p, false, true, true, true, true, true, true, , , , ," },
name: { type:  String , required: true, comment: "Name, p, false, true, true, true, true, true, true, , , , ," },
fullName: { type:  String , required: true, comment: "Full Name, p, false, true, true, true, true, true, true, , , , ," },
company: { type:  String , maxLength: 150, index: true, trim: true, comment: "Company, p, false, true, true, true, true, true, true, , , , ," },
department: { type:  String , maxLength: 150, index: true, trim: true, comment: "Department, p, false, true, true, true, true, true, true, , , , ," },
section: { type:  String , maxLength: 150, index: true, trim: true, comment: "Section, p, false, true, true, true, true, true, true, , , , ," },
position: { type:  String , maxLength: 150, index: true, trim: true, comment: "Position, p, false, true, true, true, true, true, true, , , , ," },
supervisor: { type:  String , maxLength: 150, index: true, trim: true, comment: "Supervisor, p, false, true, true, true, true, true, true, , , , ," },
dateJoined: { type:  String , maxLength: 150, index: true, trim: true, comment: "Date Joined, p, false, true, true, true, true, true, true, , , , ," },
dateTerminated: { type:  String , maxLength: 150, index: true, trim: true, comment: "Date Terminated, p, false, true, true, true, true, true, true, , , , ," },
resigned: { type:  String , required: true, comment: "Resigned, p, false, true, true, true, true, true, true, , , , ," },
empGroup: { type:  String , required: true, comment: "Emp Group, p, false, true, true, true, true, true, true, , , , ," },
empCode: { type:  String , required: true, comment: "Emp Code, p, false, true, true, true, true, true, true, , , , ," },

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