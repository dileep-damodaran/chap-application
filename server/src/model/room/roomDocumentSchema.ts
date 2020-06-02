import { IRoomDocument } from "./roomDocument.js";
import * as mongoose from 'mongoose';

let roomSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

roomSchema.index({ _id: 1, name: 1 });
export let Room: mongoose.Model<IRoomDocument> = mongoose.model<IRoomDocument>("room", roomSchema);


