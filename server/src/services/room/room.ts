import { Room } from "../../model/room/roomDocumentSchema.js";
import { IRoomDocument } from "../../model/room/roomDocument.js";

export class RoomService {

    public static async createRoom(name: string): Promise<IRoomDocument> {

        return new Promise(async (resolve, reject) => {
            let room = new Room();
            room.name = name;
            await room.save();

            return resolve(room);
        })
    }

    public static async getRoom(id: string): Promise<IRoomDocument> {

        return new Promise(async (resolve, reject) => {

            const room = await Room.findById(id);
            if (!room) return resolve();
            return resolve(room);
        });
    }

    public static async getRoomByName(name: string): Promise<IRoomDocument> {

        return new Promise(async (resolve, reject) => {

            const room = await Room.findOne({ name: name });
            if (!room) return resolve();
            return resolve(room);
        });
    }
}