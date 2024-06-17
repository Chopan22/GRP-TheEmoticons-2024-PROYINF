import { MongoClient, ServerApiVersion } from "mongodb";
// Replace the placeholder with your Atlas connection string aaa
const uri = "mongodb+srv://nicolasberenguela:G2smxdsNpbI32uxA@cluster0.tjrbems.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);

export async function connectToMongoDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    return console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    return await client.close();
  }
}








