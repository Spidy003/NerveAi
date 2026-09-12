import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nerve AI | Predictive Fleet Maintenance & Real-time Telemetry",
  description: "Stop Guessing Vehicle Health. High-frequency CAN-bus sensor telemetry paired with LSTM neural networks to predict commercial fleet failures up to 14 days early.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${orbitron.variable}`}>
      <body className="bg-[#E6ECF5] text-[#1E293B] font-sans antialiased selection:bg-blue-600 selection:text-white min-h-screen overflow-x-hidden">
        <main className="min-h-screen">
          {children}
        </main>

        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#E6ECF5",
              color: "#1E293B",
              boxShadow: "6px 6px 14px #C5D0E0, -6px -6px 14px #FFFFFF",
              borderRadius: "16px",
              border: "none",
              fontWeight: 600,
            },
          }}
        />
      </body>
    </html>

  );
}
