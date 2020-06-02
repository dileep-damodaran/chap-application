import { IUser as IUser } from "./user.js";
import * as mongoose from "mongoose";

export interface IUserDocument extends IUser, mongoose.Document {
}