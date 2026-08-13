import "./globals.css";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import { fontPoppins } from "@/constants/fonts";
import StoreProvider from "@/providers/store-provider";
import ThemeProvider from "@/components/theme-provider";
import QueryProvider from "@/components/query-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased")}
    >
      <body className={cn("min-h-full flex flex-col", fontPoppins.variable)}>
        <QueryProvider>
          <ThemeProvider>
            <StoreProvider>
              <TooltipProvider>
                {children}
                <Toaster richColors position="top-center" />
              </TooltipProvider>
            </StoreProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}