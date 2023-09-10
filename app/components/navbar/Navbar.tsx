"use client";

import { User } from "@prisma/client";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  console.log(currentUser);
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px] ">
        <Container>
          <div
            className="
          flex flex-row items-center justify-between gap-3 md:gap-0"
          >
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;

// // Ten kod definiuje komponent funkcyjny Navbar, który przyjmuje jako props currentUser. Komponent ten jest napisany w języku TypeScript i korzysta z biblioteki React.

// React.FC to generyczny interfejs funkcji komponentu w React, który dostarcza typy dla props i zwracanego wyniku. W tym przypadku, NavbarProps jest typem, który reprezentuje oczekiwane właściwości (props) dla komponentu Navbar.

// Wewnątrz komponentu Navbar, znajduje się instrukcja console.log(currentUser). console.log() służy do wypisywania informacji w konsoli przeglądarki lub narzędzi deweloperskich. W tym przypadku, wartość currentUser jest wypisywana w konsoli w celu debugowania lub sprawdzenia wartości przekazanej do komponentu.

// W skrócie, kod ten definiuje komponent Navbar, który przyjmuje currentUser jako props i wypisuje jego wartość w konsoli.
