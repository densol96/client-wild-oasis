import Navigation from "./_components/Navigation";
import Logo from "./_components/Logo";

import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

import "@/app/_styles/globals.css";
import Header from "./_components/Header";

import { ReservationProvider } from "@/app/_components/ReservationContext";

export const metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description: `Luxurious cabin hotel, located in the heart 
                of the Italian Dolomites, surrounded by beautiful mountains and 
                dark forests Luxurious cabin hotel, located in the heart of the 
                Italian Dolomites, surrounded by beautiful mountains and dark forests`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-primary-950 antialiased text-primary-100 min-h-screen overflow-auto
                        ${josefin.className} flex flex-col`}
      >
        <Header />
        <ReservationProvider>
          <main className="max-w-7xl w-full mx-auto flex-1 py-12 flex flex-col">
            {children}
          </main>
        </ReservationProvider>
      </body>
    </html>
  );
}
