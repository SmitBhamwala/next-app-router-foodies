import Link from "next/link";
import Image from "next/image";
import MainHeaderBackground from "@/components/main-header/main-header-background";
import classes from "./main-header.module.css";
import logoImg from "@/assets/logo.png";
import NavLink from "./nav-link";

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image
            width="100"
            height="100"
            src={logoImg.src}
            alt="A plate with food on it"
            priority
          />
          SB's FoodZone
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
