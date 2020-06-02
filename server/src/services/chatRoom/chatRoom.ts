import { ChatRoom } from "../../model/chatRoom/chatRoomDocumentSchema.js";
import { IChatRoomDocument } from "../../model/chatRoom/chatRoomDocument.js";
import { ObjectId } from "mongodb";

export class ChatRoomService {

    public static async createChatRoom(room_id: ObjectId): Promise<IChatRoomDocument> {

        return new Promise(async (resolve, reject) => {

            let chatRoom = new ChatRoom();
            chatRoom.room_id = room_id;
            await chatRoom.save();

            return resolve(chatRoom);
        });
    }

    public static async getChatRoom(room_id: ObjectId): Promise<IChatRoomDocument> {

        return new Promise(async (resolve, reject) => {

            try {

                const chatRoom = await ChatRoom.findOne({ room_id: room_id });

                console.log('getChatRoom:inside');
                console.log(chatRoom);
                if (!chatRoom) return resolve();

                console.log('getChatRoom:right before resolve');
                return resolve(chatRoom);
            }

            catch (err) {
                console.log(err);
                return resolve();
            }
        });
    }

    public static async addUserInChatRoom(room_id: ObjectId, user_id: ObjectId, socket_id: string): Promise<IChatRoomDocument> {

        return new Promise(async (resolve, reject) => {

            const userActivity: any = {
                user_id: user_id,
                activity: [{
                    socket_id: socket_id,
                    in: new Date(),
                    out: new Date(0)
                }]
            };

            const chatRoom = await this.getChatRoom(room_id);

            console.log('addUserInChatRoom:right after getChatRoom');
            console.log(chatRoom);

            console.log(`audience is `);
            console.log(chatRoom.audience);
            console.log(typeof chatRoom.audience);
            console.log(JSON.stringify(typeof chatRoom.audience[Symbol.iterator]()));

            if (!chatRoom)
                return resolve();

            let newUser: boolean = true;

            for (let audience of chatRoom.audience) {

                if (audience.user_id === user_id) {
                    (audience.activity || []).push(userActivity.activity[0]);
                    newUser = false;
                    break;
                }
            }

            console.log('addUserInChatRoom:newUser');
            console.log(newUser);

            if (newUser)
                chatRoom.audience.push(userActivity);

            chatRoom.markModified("audience");
            chatRoom.save();
            return resolve(chatRoom);

        });
    }
}
