import { MongoClient } from "mongodb";
import fs from "node:fs";
import slugify from "slugify";
import xss from "xss";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.xgqz7id.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
  );

  return client;
}

export async function getMeals(client, collection, filter = {}) {
  const db = client.db();
  const fetchedMeals = await db.collection(collection).find(filter).toArray();
  return fetchedMeals;
}

export async function insertMeal(meal) {
  const client = await connectDatabase();
  const db = client.db();
  const result = await db.collection("meals").insertOne(meal);
  return result;
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });

  // To remove harmful content from the instructions to protect against cross-site scripting attacks
  meal.instructions = xss(meal.instructions);

  const now = new Date().getTime();
  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}-${now}.${extension}`;
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!!");
    }
  });

  meal.image = `/images/${fileName}`;

  const result = await insertMeal(meal);
}
