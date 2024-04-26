import MainHeader from "@/components/main-header/main-header";
import "./globals.css";

export const metadata = {
  title: "Bhamwala next level foodzone for Foodies",
  description:
    "Delicious meals, shared by Bhamwalas and food-loving community.",
  keywords: [
    "Bhamwala",
    "next",
    "level",
    "foodzone",
    "Delicious",
    "meals",
    "shared",
    "by",
    "Bhamwalas",
    "and",
    "food",
    "loving",
    "community",
    "Taste",
    "and",
    "share",
    "food",
    "from",
    "all",
    "over",
    "the",
    "world",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
