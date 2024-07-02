import { MongoClient, ServerApiVersion } from 'mongodb';

class MongoConnection {

    private static mobj:MongoConnection|null = null;

    private static conn:MongoClient;

    private constructor() {}

    public getConn():MongoClient {
        if (MongoConnection.conn === undefined)
            throw new Error("Missing Mongo Connection!")
        return MongoConnection.conn;
    }

    public static async getConnection():Promise<MongoConnection> {
        if (this.mobj === null) {
            console.log("CONNECTION CREATED!")
            const uri = process.env.MONGO_HOST;
            console.log(uri)
            if (!uri)
                throw new Error("NO HOST");
            this.conn = await MongoClient.connect(uri, {
                serverApi: {
                    version: ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true,
                }
            });
            this.mobj = new MongoConnection();
        }
        return this.mobj;
    }
}

export default MongoConnection;