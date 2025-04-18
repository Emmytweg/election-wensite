// lib/mongodb.ts
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

client = new MongoClient(uri, options);
clientPromise = client.connect();

export default clientPromise;
