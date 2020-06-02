import { IRoom as IRoom } from "./room";
import * as mongoose from "mongoose";

export interface IRoomDocument extends IRoom, mongoose.Document {
}