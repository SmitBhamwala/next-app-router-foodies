import { MongoClient } from "mongodb";
import fs from "node:fs";
import slugify from "slugify";
import xss from "xss";

// export async function connectDatabase() {
//   const client = await MongoClient.connect(
//     `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.xgqz7id.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
//   );

//   return client;
// }


const uri = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.xgqz7id.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;


export async function getMeals(client, collection, filter = {}) {
  const db = client.db();
  const fetchedMeals = await db.collection(collection).find(filter).toArray();
  return fetchedMeals;
}

export async function insertMeal(meal) {
  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection("meals").insertOne(meal);
  await client.close();
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
