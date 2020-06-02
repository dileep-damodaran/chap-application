import { IMessage as IMessage } from "./message";
import * as mongoose from "mongoose";

export interface IMessageDocument extends IMessage, mongoose.Document {
}