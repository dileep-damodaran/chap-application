import { IChatRoomDocument } from "./chatRoomDocument.js";
import { ObjectId } from "mongodb";
import * as mongoose from 'mongoose';

let chatRoomSchema = new mongoose.Schema({
    room_id: { type: ObjectId, required: true, unique: true },
    audience: { type: Array, required: true, unique: false, default: [] },
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

chatRoomSchema.index({ _id: 1, name: 1 });
export let ChatRoom: mongoose.Model<IChatRoomDocument> = mongoose.model<IChatRoomDocument>("chatRoom", chatRoomSchema);



