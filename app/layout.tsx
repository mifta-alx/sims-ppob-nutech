import { Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils";
import { ReduxProvider } from "@/components/redux-provider";
import { AlertProvider } from "@/components/layout/alert-provider";

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata = {
  title: "SIMS PPOB-Miftakhussurur Al Maliki",
  description: "Assignment Test",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        <ReduxProvider>
            <AlertProvider/>
              {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
