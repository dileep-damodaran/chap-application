
import { User } from "../../model/user/userDocumentSchema.js";
import { IUserDocument } from "../../model/user/userDocument.js";

export class UserService {

    public static async addUser(user_name: string): Promise<IUserDocument> {

        return new Promise(async (resolve, reject) => {

            user_name = user_name.trim().toLowerCase();

            let user = new User();
            user.user_name = user_name;
            user = await user.save();

            return resolve(user);
        })
    }

    public static async getUser(id: string): Promise<IUserDocument> {

        return new Promise(async (resolve, reject) => {
            const user = await User.findById(id);
            if (!user) return resolve();
            return resolve(user);
        });
    }

    public static async getUserByName(user_name: string): Promise<IUserDocument> {

        return new Promise(async (resolve, reject) => {
            const user = await User.findOne({ user_name: user_name });
            if (!user) return resolve();
            return resolve(user);
        });
    }


}




