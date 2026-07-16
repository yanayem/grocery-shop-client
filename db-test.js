import { MongoClient } from 'mongodb';

// আপনার আসল পাসওয়ার্ড এবং ডাটাবেস নামসহ কানেকশন স্ট্রিং
const uri = "mongodb+srv://grocery-shop_db_user:dAzq5zD5tEopzO8v@grocery-shop.nponuts.mongodb.net/grocery_shop?retryWrites=true&w=majority&appName=grocery-shop";

const client = new MongoClient(uri);

export async function connectToMongoDB() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await client.connect();
    console.log("SUCCESS: You successfully connected to MongoDB!");

    // টেস্ট করার জন্য একটি লিস্ট চেক করি
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases on your Atlas:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));

    return client;
  } catch (err) {
    console.error("CONNECTION FAILED:", err.message);
  } finally {
    await client.close();
  }
}

// কানেকশন টেস্ট করার জন্য রান করুন
connectToMongoDB();
