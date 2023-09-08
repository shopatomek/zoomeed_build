import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV != 'production') globalThis.prisma = client

export default client;

// globalThis to obiekt globalny dostępny we współczesnych środowiskach JavaScript, taki jak przeglądarki internetowe i środowiska Node.js. Jest to specjalny obiekt, który reprezentuje globalny zakres (global scope) i udostępnia dostęp do globalnych zasobów i funkcji.

// W kontekście podanego kodu, globalThis jest używane do utworzenia zmiennej globalnej prisma, która jest dostępna w różnych częściach kodu. Dzięki temu, można przechowywać instancję PrismaClient w tej zmiennej i mieć do niej dostęp z dowolnego miejsca w kodzie.

// Linia kodu const client = globalThis.prisma || new PrismaClient(); sprawdza, czy zmienna globalna prisma jest zdefiniowana. Jeśli tak, to przypisuje jej wartość do zmiennej client. Jeśli zmienna prisma nie jest zdefiniowana, tworzy nową instancję PrismaClient i przypisuje ją do zmiennej client.

// Następnie, linia kodu if (process.env.NODE_ENV != 'production') globalThis.prisma = client sprawdza, czy wartość zmiennej środowiskowej NODE_ENV jest różna od 'production'. Jeśli tak, przypisuje wartość zmiennej client do zmiennej globalnej prisma. W ten sposób, prisma jest ustawione na instancję PrismaClient, co umożliwia dostęp do niej z innych części kodu.

// Dzięki użyciu globalThis i zmiennej globalnej prisma, można mieć tylko jedną instancję PrismaClient w aplikacji i mieć do niej dostęp z dowolnego miejsca w kodzie, nawet jeśli zmienna client została zainicjalizowana tylko raz.

// 
