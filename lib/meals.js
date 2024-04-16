import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.xgqz7id.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
  );

  return client;
}

export async function getMeals(client, collection, filter = {}) {
  const db = client.db();
  throw new Error("Error fetching");
  const fetchedMeals = await db.collection(collection).find(filter).toArray();
  return fetchedMeals;
}
// export async function insertDocument(client, collection, document) {
//   const db = client.db();
//   const result = await db.collection(collection).insertOne(document);
//   return result;
// }

// import sql from "better-sqlite3";

// const db = sql("meals.db");

// export default async function getMeals() {
//   await new Promise((resolve) => setTimeout(resolve, 2000));
//   return db.prepare("SELECT * FROM meals").all();
// }
