
import { ObjectId } from "mongodb";

export interface IMessage {
    chat_room_id: ObjectId,
    messages: Array<{
        message: any,
        sendt_by: ObjectId,
        socket_id: string,
        sent_at: Date,
        is_deleted: boolean
    }>
}