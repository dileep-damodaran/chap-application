import * as mongoose from 'mongoose';
const util = require("util");

export class Db {

    public static connect(): mongoose.Connection {
        if (this.mongooseInstance) {
            return this.mongooseInstance;
        }

        const connectionString = util.format(process.env.DB_URI, "chat-app");
        console.log("The connection string is " + connectionString);
        this.mongooseInstance = mongoose.connect(connectionString, { useNewUrlParser: true, useFindAndModify: false });

        return this.mongooseInstance;
    }

    private static mongooseInstance: any;
    private static mongooseConnection: mongoose.Connection;
}
