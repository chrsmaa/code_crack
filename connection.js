const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://test:test@code-crack.z7pjg.mongodb.net/?retryWrites=true&w=majority&appName=Code-Crack";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDatabase() {
  try {
    if (!client.isConnected) {
      await client.connect();
      console.log("Successfully connected to MongoDB!");
    }
    return client.db("Code-Crack");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    throw err;
  }
}

module.exports = { connectToDatabase };
