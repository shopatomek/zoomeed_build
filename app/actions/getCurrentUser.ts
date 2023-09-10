import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma  from "@/app/libs/prismadb";

export async function getSession() {
    return await getServerSession(authOptions);
}
export default async function getCurrentUser() {
   try {
    const session = await getSession();

    if(!session?.user?.email){
        return null;
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email as string
        }
    });

    if (!currentUser){
        return null;
    }

    return currentUser
   } catch (error:any) {
    return null;
   }
}

// Kod, który przedstawiłeś, jest modułem w języku JavaScript i zawiera dwie eksportowane funkcje: getSession i getCurrentUser. Oto wyjaśnienie kodu, opierając się na wcześniejszych wyjaśnieniach:

// Pierwsze dwie linie kodu importują funkcję getServerSession z modułu "next-auth/next", obiekt authOptions z pliku "@/pages/api/auth/[...nextauth]", oraz moduł prisma z "@/app/libs/prismadb".

// Funkcja getSession jest oznaczona jako asynchroniczna (async) i zwraca wynik wywołania getServerSession z argumentem authOptions. Oznacza to, że funkcja getSession pobiera sesję serwera używając opcji autoryzacji dostarczonych z authOptions.

// Funkcja getCurrentUser również jest oznaczona jako asynchroniczna (async). Wewnątrz funkcji, najpierw wywoływana jest funkcja getSession, aby uzyskać bieżącą sesję.

// Następnie, w linii if(!session?.user?.email), sprawdzane jest, czy wartość email w obiekcie user w obiekcie session istnieje lub nie jest pusta. Jeśli wartość ta nie istnieje lub jest pusta, funkcja zwraca null, co oznacza, że nie udało się uzyskać poprawnych danych użytkownika.

// Jeśli warunek nie jest spełniony, kod kontynuuje wykonanie i przechodzi do następnej linii, w której znajduje się zapytanie do bazy danych. Wykorzystuje ono prisma, aby znaleźć unikalnego użytkownika na podstawie jego adresu email, który jest pobrany z session.user.email.

// Następnie, w linii if (!currentUser), sprawdzane jest, czy zapytanie do bazy danych zwróciło użytkownika. Jeśli użytkownik nie istnieje, funkcja zwraca null.

// Jeśli wszystko przebiegnie pomyślnie, to znaczy jeśli użytkownik istnieje i nie ma żadnych błędów, funkcja getCurrentUser zwraca obiekt currentUser, który reprezentuje dane bieżącego użytkownika.

// W przypadku wystąpienia błędu podczas wykonywania zapytania do bazy danych lub innych operacji asynchronicznych, kod jest zabezpieczony blokiem try-catch. Jeśli pojawi się błąd, zostanie przechwycony i funkcja getCurrentUser zwróci null.

// Podsumowując, kod ten służy do pobierania bieżącej sesji, sprawdzania, czy użytkownik jest zalogowany (na podstawie obiektu sesji) i pobierania danych bieżącego użytkownika z bazy danych. Jeśli wystąpią błędy lub brak danych, funkcja zwraca null. W przeciwnym razie zwracany jest obiekt reprezentujący bieżącego użytkownika.