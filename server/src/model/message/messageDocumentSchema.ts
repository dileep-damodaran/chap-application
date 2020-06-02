import { IMessageDocument } from "./messageDocument.js";
import { ObjectId } from "mongodb";
import * as mongoose from "mongoose";

let messageSchema = new mongoose.Schema({
    chat_room_id: { type: ObjectId, required: true, unique: false },
    messages: { type: Array, required: true, unique: false, default: [] }

},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

messageSchema.index({ chat_room_id: 1 });
export let Message: mongoose.Model<IMessageDocument> = mongoose.model<IMessageDocument>("message", messageSchema);



