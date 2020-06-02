import { Message } from "../../model/message/messageDocumentSchema.js";
import { IMessageDocument } from "../../model/message/messageDocument.js";
import { ObjectId } from "mongodb";
import { resolve } from "url";


export class MessageService {

    public static async sendMessage(chat_room_id: ObjectId, message: any, user_id: ObjectId, socket_id: string): Promise<IMessageDocument> {

        return new Promise(async (resolve, reject) => {


            const messageBody: any = {

                message: message,
                sent_by: user_id,
                socket_id: socket_id,
                sent_at: new Date(),
                is_deleted: false
            };

            const messageDump = await Message.findOne({ chat_room_id: chat_room_id });

            if (!messageDump) {

                let newMessage = new Message();
                newMessage.chat_room_id = chat_room_id;
                newMessage.messages = [messageBody];

                const result = newMessage.save();
                return resolve(result);
            }
            else {

                message.messages = message.messages.push(messageBody);
                message.markModified("messages");
                message.save();
                return resolve(message);
            }
        })
    }

    public static async getMessages(chat_room_id: ObjectId): Promise<any> {

        return new Promise(async (resolve, reject) => {

            const messages = await Message.find({ chat_room_id: chat_room_id, "messages.is_deleted": false }).sort({ created_at: 1.0 });
            return resolve(messages);
        });
    }
}


