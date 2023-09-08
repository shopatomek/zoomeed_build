import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth,{ AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/app/libs/prismadb";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";


export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Credentials not provided");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("User not found");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword          
        );
        if (!isCorrectPassword) {
          throw new Error("Invalid password");
        }
        return user;
      },
    }),
  ],
  pages: {
      signIn: '/',
  },
  debug: process.env.NODE_ENV === "development",
  session: {
      strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);

// // Kod przedstawia definicję obiektu CredentialsProvider, który zawiera pola name, credentials i authorize. Wyjaśnienie niektórych elementów kodu:

// name: "credentials": Pole name określa nazwę dostawcy uwierzytelniania i jest ustawione na wartość "credentials".

// credentials: Pole credentials zawiera obiekt z dwiema właściwościami: email i password. Każda z tych właściwości zawiera kolejny obiekt z właściwościami label i type, które definiują etykietę i typ pola.

// async authorize(credentials) { ... }: To jest metoda authorize, która jest asynchroniczna (async). Przyjmuje ona argument credentials. Wewnątrz tej metody sprawdzane są credentials.email i credentials.password za pomocą operatora opcjonalnego łańcucha (?.). Jeśli któreś z pól nie istnieje lub ma wartość undefined, zostanie rzucony błąd.

// const user = await prisma.user.findUnique({ ... }): To jest wywołanie metody findUnique na obiekcie prisma.user. Metoda ta wykonuje zapytanie do bazy danych, aby znaleźć pojedynczego użytkownika na podstawie podanego warunku (w tym przypadku, email: credentials.email). Wywołanie await oczekuje na zakończenie tego zapytania, zanim przejdzie do następnych instrukcji.

// W odniesieniu do połączenia z schema.prisma, kod ten wykorzystuje obiekt prisma, który jest prawdopodobnie wygenerowany na podstawie pliku schema.prisma. Obiekt ten dostarcza metody do wykonywania operacji bazodanowych zdefiniowanych w schema.prisma. Metoda findUnique jest jedną z tych metod i umożliwia wyszukiwanie pojedynczych rekordów w tabeli na podstawie określonych warunków.

// // W skrócie, ten kod definiuje dostawcę uwierzytelniania o nazwie "credentials". W metodzie authorize sprawdza się poprawność danych uwierzytelniających i wykonuje zapytanie do bazy danych, aby znaleźć użytkownika na podstawie podanego adresu e-mail.

// Ten kod definiuje konfigurację uwierzytelniania dla aplikacji. Określa dostawców uwierzytelniania, takich jak GitHub i Google, oraz dostawcę uwierzytelniania opartego na poświadczeniach (e-mail i hasło). Metoda authorize w dostawcy uwierzytelniania opartym na poświadczeniach sprawdza poprawność danych uwierzytelniających, wyszukuje użytkownika w bazie danych na podstawie adresu e-mail i porównuje hasło z zahaszowanym hasłem w bazie danych.

// Podsumowując, ten kod definiuje sposób uwierzytelniania użytkowników w aplikacji, używając różnych dostawców uwierzytelnienia i sprawdzając poprawność danych uwierzytelniających w bazie danych.

