import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user)
}
// Ten kod definiuje funkcję POST, która obsługuje żądanie HTTP typu POST. Głównymi krokami w tej funkcji są:

// Parsowanie treści żądania jako JSON i przypisanie jej do zmiennej body.
// Wyodrębnienie wartości email, name i password z obiektu body.
// Haszowanie hasła za pomocą biblioteki bcrypt przy użyciu funkcji bcrypt.hash. Hasło zostaje przekazane jako pierwszy argument, a liczba rund hashowania (12) jako drugi argument.
// Tworzenie nowego użytkownika w bazie danych przy użyciu obiektu prisma.user.create. Podane wartości email, name i hashedPassword są przekazane jako część danych dla nowego użytkownika.
// Zwracanie odpowiedzi HTTP w formacie JSON, zawierającej utworzonego użytkownika.
// Podsumowując, ten kod obsługuje żądanie POST, które zawiera dane użytkownika (email, name, password). Hasło jest haszowane przy użyciu biblioteki bcrypt, a następnie tworzony jest nowy użytkownik w bazie danych za pomocą biblioteki prisma. Na koniec, zwracana jest odpowiedź HTTP zawierająca utworzonego użytkownika w formacie JSON.