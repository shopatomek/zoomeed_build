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

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email as string
        }
    });
   } catch (error:any) {
    return null;
   }
}
// // Kod, który podałeś, zawiera dwie funkcje eksportowane: getSession oraz getCurrentUser. Zacznijmy od linii if(!session?.user?.email), która znajduje się wewnątrz funkcji getCurrentUser.

// Ten warunek sprawdza, czy wartość email wewnątrz obiektu user w obiekcie session istnieje. Jeśli którykolwiek z tych obiektów nie istnieje lub wartość email jest pusta lub fałszywa, warunek zostanie spełniony. W takim przypadku funkcja getCurrentUser zwróci null, co oznacza, że nie udało się uzyskać poprawnych danych użytkownika.

// Jeśli warunek nie jest spełniony, kod kontynuuje wykonanie i przechodzi do następnej linii, w której znajduje się zapytanie do bazy danych. Wykorzystuje ono prisma, aby znaleźć unikalnego użytkownika na podstawie jego adresu email, który jest pobrany z session.user.email.

// Jeśli wystąpi jakikolwiek błąd podczas wykonywania tego zapytania lub innych operacji asynchronicznych wewnątrz funkcji getCurrentUser, kod jest zabezpieczony blokiem try-catch. Jeśli pojawi się błąd, zostanie przechwycony i funkcja getCurrentUser zwróci null.

// Podsumowując, funkcja getCurrentUser sprawdza, czy istnieje zalogowany użytkownik poprzez sprawdzenie, czy jest dostępny adres email w obiekcie sesji. Następnie korzysta z tego adresu email do wyszukania odpowiadającego użytkownika w bazie danych przy użyciu prisma. Jeśli wszystko przebiegnie pomyślnie, zostanie zwrócony obiekt użytkownika. W przeciwnym razie, jeśli wystąpi błąd lub brak danych, zostanie zwrócone null.


// \