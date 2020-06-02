import { Room } from "../../model/room/roomDocumentSchema";
import { IRoomDocument } from "../../model/room/roomDocument";

export class RoomService {

    public static async createRoom(name: string): Promise<IRoomDocument> {

        return new Promise(async (resolve, reject) => {
            let room = new Room();
            room.name = name;
            await room.save();

            return resolve(room);
        })
    }

    public static async getRoom(socket_id: string): Promise<IRoomDocument> {

        return new Promise(async (resolve, reject) => {

            const room = await Room.findOne({ "users.socket_id": socket_id });
            if (!room) return resolve();

            return resolve(room);
        })
    }
}