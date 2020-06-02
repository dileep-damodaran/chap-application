import { IUserDocument } from "./userDocument.js";
import * as mongoose from "mongoose";

let userDocumentSchema = new mongoose.Schema({
    user_name: { type: String, required: true, unique: true },
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

userDocumentSchema.index({ _id: 1, user_name: 1 });
export let User: mongoose.Model<IUserDocument> = mongoose.model<IUserDocument>("user", userDocumentSchema);


