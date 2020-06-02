import { IChatRoom as IChatRoom } from "./chaRroom.js";
import * as mongoose from "mongoose";

export interface IChatRoomDocument extends IChatRoom, mongoose.Document {
}