import { IRoomDocument } from "./roomDocument";
import * as mongoose from 'mongoose';

let roomSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    users: {
        type:
        {
            user_name: { type: String, required: false, unique: false },
            socket_id: { type: String, required: false, unique: true },
            activity_log: { type: Array, required: true, unique: false }
        }, required: false, unique: false, default: []
    }
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

roomSchema.index({ name: 1, "users.socket_id": 1, "users.user_name": 1 });
export let Room: mongoose.Model<IRoomDocument> = mongoose.model<IRoomDocument>("room", roomSchema);


