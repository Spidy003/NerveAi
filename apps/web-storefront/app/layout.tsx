import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

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
    <html lang="en">
      <body className="bg-[#06090D] text-[#C7D0D9] font-sans antialiased selection:bg-cyan selection:text-black min-h-screen overflow-x-hidden">
        <main className="min-h-screen">
          {children}
        </main>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0F141C",
              color: "#fff",
              border: "1px solid #1E2633",
            },
          }}
        />
      </body>
    </html>
  );
}
