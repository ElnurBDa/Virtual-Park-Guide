import { MongoClient, Db } from "mongodb";

const uri: string = Bun.env.MONGO_URI || "";
const client: MongoClient = new MongoClient(uri);

let db: Db;

export const connectToDatabase = async (): Promise<Db> => {
  if (!db) {
    try {
      await client.connect();
      db = client.db("your-database-name");
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Failed to connect to MongoDB", error);
      throw error;
    }
  }
  return db;
};
