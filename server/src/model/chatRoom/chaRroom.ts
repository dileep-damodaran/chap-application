import { ObjectId } from "mongodb";

export interface IChatRoom {
    room_id: ObjectId,
    audience: Array<{
        user_id: ObjectId,
        activity: Array<{
            socket_id: string,
            in: Date,
            out: Date
        }>;
    }>
}