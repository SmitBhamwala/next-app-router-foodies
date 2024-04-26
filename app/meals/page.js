import Link from "next/link";

import MealsGrid from "@/components/meals/meals-grid";
import { getMeals, connectDatabase } from "@/lib/db";
import classes from "./page.module.css";
import { Suspense } from "react";

export const metadata = {
  title: "All Meals by SB and Community",
  description: "Browse the delicious meals shared by our vibrant community.",
};

async function Meals() {
  const client = await connectDatabase();
  const allMeals = await getMeals(client, "meals");
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
        <Suspense
          fallback={<p className={classes.loading}>Fetching meals...</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
