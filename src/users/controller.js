const UserModel = require("./model");

class UserController {
    async addUser(data) {
        try {
            const user = new UserModel(data);
            const usersData = await user.save();

            return usersData
        } catch (e) {
            throw new Error(e)
        }
    }

    async getAllUser() {
        try {
            const users = await UserModel.find();

            return users;
        } catch (e) {
            throw new Error(e);
        }
    }

    async getUserById(id) {
        try {
            const user = await UserModel.findById(id);

            return user;
        } catch (e) {
            throw new Error(e);
        }
    }
}



module.exports = UserController