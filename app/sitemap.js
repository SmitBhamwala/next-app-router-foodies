import clientPromise from "@/lib/db";
import { getMeals } from "@/lib/db";

export default async function sitemap() {
  const client = await clientPromise;
  const allMeals = await getMeals(client, "meals");

  const myXML = [
    {
      url: "https://nextfoodies.vercel.app",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://nextfoodies.vercel.app/meals",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://nextfoodies.vercel.app/meals/share",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://nextfoodies.vercel.app/community",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  allMeals.map((meal) =>
    myXML.push({
      url: `https://nextfoodies.vercel.app/meals/${meal.slug}`,
      // lastModified: meal._id.getTimestamp(),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    })
  );

  return myXML;
}
