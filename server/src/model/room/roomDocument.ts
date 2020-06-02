import { IRoom as IRoom } from "./room.js";
import * as mongoose from "mongoose";

export interface IRoomDocument extends IRoom, mongoose.Document {
}