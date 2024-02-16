const LogModel = require("./model");


class LogController {
 async getAllLogs() {
     try {
         return  await LogModel.find();
     } catch (e) {
         throw new Error(e);
     }
 }

 async createEmptyLog(userId) {
     try {
         const logToSave = new LogModel({user: userId })
         return  await logToSave.save();

     } catch (e) {
         throw new Error(e);
     }
 }
}

module.exports = LogController