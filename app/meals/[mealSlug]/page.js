import Image from "next/image";
import classes from "./page.module.css";
import { notFound } from "next/navigation";
//To not get Type ERROR "self-signed certificate in certificate chain" while fetching data from Firebase
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function generateMetadata({ params }) {
  const { mealSlug } = params;
  const meal = await getMealDetails(mealSlug);

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

async function getMealDetails(mealSlug) {
  const response = await fetch(
    `${process.env.meals_fetch_pathname}/api/meals/${mealSlug}`,
    { headers: { "api-key": process.env.api_key } },
    { cache: "no-store" }
  );
  const data = await response.json();
  return data.mealDetails[0];
}

export default async function MealsSlug({ params }) {
  const { mealSlug } = params;
  const meal = await getMealDetails(mealSlug);

  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            src={meal.image}
            alt={meal.title}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
}
