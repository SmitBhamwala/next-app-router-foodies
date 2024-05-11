import { getMeals } from "@/lib/db";
import clientPromise from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { mealsSlug } = params;
  try {
    const client = await clientPromise;
    const mealDetails = await getMeals(client, "meals", {
      slug: mealsSlug,
    });

    // await client.close();

    return NextResponse.json({ mealDetails: mealDetails }, { status: 200 });
  } catch (err) {
    await client.close();
    console.log(err);
    return NextResponse.json(
      {
        message: err || "Something went wrong!!",
      },
      {
        status: 500,
      }
    );
  }
}
