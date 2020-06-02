
import { Room } from "../../model/room/roomDocumentSchema.js";
import { User } from "../../model/user/userDocumentSchema.js";
import { IUserDocument } from "../../model/user/userDocument.js";




export class UserService {

    public static async addUser(id: string, user_name: string): Promise<IUserDocument> {


        return new Promise(async (resolve, reject) => {
            user_name = user_name.trim().toLowerCase();

            let user = new User();
            user.user_name = user_name;
            user.socket_id = id;
            user = await user.save();

            return resolve(user);
        })
    }


    public static async getUser(socket_id: string): Promise<IUserDocument> {


        return new Promise(async (resolve, reject) => {

            const user = await User.findOne({ socket_id: socket_id });
            if (!user) return resolve();
            return resolve(user);
        })

    }


}




