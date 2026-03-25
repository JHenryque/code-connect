import { Prompt } from "next/font/google";
import Aside from "@/components/Aside";
import "./globals.css";
import { SearchForm } from "@/components/SearchForm";

export const metadata = {
  title: "Code Connect",
  description: "Uma rede social para programadores",
};

const prompt = Prompt({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={prompt.className}>
      <body>
        <div className="app-container">
          <Aside />

          <div className="main-content">
            <SearchForm />
            <div>{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
