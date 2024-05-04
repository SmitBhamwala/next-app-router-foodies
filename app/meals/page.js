import Link from "next/link";

import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/db";
import clientPromise from "@/lib/db";
import classes from "./page.module.css";
import { Suspense } from "react";
import MealsLoader from "@/components/meals/meal-loader";

export const metadata = {
  title: "All Meals by SB and Community",
  description:
    "Browse the delicious meals shared by SB and our vibrant community.",
};

async function Meals() {
  const client = await clientPromise;
  const allMeals = await getMeals(client, "meals");

  // await client.close();
  return <MealsGrid meals={allMeals} />;
}

export default async function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favourite recipe and cook it yourself. It is easy and
          fun!!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favourite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<MealsLoader />}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
