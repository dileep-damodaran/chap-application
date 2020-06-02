import { IMessageDocument } from "./messageDocument";
import * as mongoose from "mongoose";

let messageSchema = new mongoose.Schema({
    room_id: { type: String, required: true, unique: false },
    user_id: { type: String, required: true, unique: false },
    user_name: { type: String, required: true, unique: false },
    message: { type: String, required: true, unique: false },

},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

messageSchema.index({ room_id: 1 });
export let Message: mongoose.Model<IMessageDocument> = mongoose.model<IMessageDocument>("message", messageSchema);


