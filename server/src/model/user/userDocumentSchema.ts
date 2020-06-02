import { IUserDocument } from "./userDocument";
import * as mongoose from "mongoose";

let userDocumentSchema = new mongoose.Schema({
    user_name: { type: String, required: true, unique: false },
    socket_id: { type: String, required: true, unique: false },
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

userDocumentSchema.index({ user_name: 1, socket_id: 1 });
export let User: mongoose.Model<IUserDocument> = mongoose.model<IUserDocument>("user", userDocumentSchema);


