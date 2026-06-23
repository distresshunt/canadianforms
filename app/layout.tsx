import type { Metadata } from "next";
import "./globals.css";
import CommandPalette from "@/src/components/CommandPalette";

export const metadata: Metadata = {
  title: {
    default: "CanadianForms.ca — Business Forms Automated by AI",
    template: "%s | CanadianForms.ca",
  },
  description:
    "Generate official Canadian business and legal forms instantly with AI. Skip lawyer fees and file in minutes.",
  keywords: [
    "Canadian business forms",
    "legal documents Canada",
    "articles of incorporation",
    "AI legal forms",
    "Canadian corporate filings",
  ],
  metadataBase: new URL("https://canadianforms.ca"),
  openGraph: {
    siteName: "CanadianForms.ca",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <CommandPalette />
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 3h5v5H3V3zm7 0h5v5h-5V3zm-7 7h5v5H3v-5zm7 2h2v1h1v2h-1v1h-2v-1h-1v-2h1v-1zm0 1v1h2v-1h-2zm2 1h1v1h-1v-1zm-3 1h1v1h-1v-1z" fill="white"/>
                </svg>
              </div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">
                Canadian<span className="text-blue-600">Forms</span>.ca
              </span>
            </a>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/directory" className="text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors">
                All Forms
              </a>
              <a href="/#how-it-works" className="text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors">
                How It Works
              </a>
              <a href="/#pricing" className="text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors">
                Pricing
              </a>
            </nav>
            <a
              href="/#search"
              className="hidden md:inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              Start Filing →
            </a>
          </div>
        </header>

        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="md:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M3 3h5v5H3V3zm7 0h5v5h-5V3zm-7 7h5v5H3v-5zm7 2h2v1h1v2h-1v1h-2v-1h-1v-2h1v-1zm0 1v1h2v-1h-2zm2 1h1v1h-1v-1zm-3 1h1v1h-1v-1z" fill="white"/>
                    </svg>
                  </div>
                  <span className="text-white font-bold text-lg">
                    Canadian<span className="text-blue-400">Forms</span>.ca
                  </span>
                </div>
                <p className="text-sm leading-relaxed">
                  AI-powered legal document generation for Canadian businesses. Trusted by 10,000+ entrepreneurs.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Popular Forms</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/ontario/articles-of-incorporation" className="hover:text-white transition-colors">Articles of Incorporation (ON)</a></li>
                  <li><a href="/alberta/shareholder-agreement" className="hover:text-white transition-colors">Shareholder Agreement (AB)</a></li>
                  <li><a href="/british-columbia/commercial-lease" className="hover:text-white transition-colors">Commercial Lease (BC)</a></li>
                  <li><a href="/federal/trademark-application" className="hover:text-white transition-colors">Trademark Application</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Provinces</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/directory" className="hover:text-white transition-colors">Ontario</a></li>
                  <li><a href="/directory" className="hover:text-white transition-colors">Alberta</a></li>
                  <li><a href="/directory" className="hover:text-white transition-colors">British Columbia</a></li>
                  <li><a href="/directory" className="hover:text-white transition-colors">All Provinces →</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/directory" className="hover:text-white transition-colors">Form Directory</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-slate-500">
                © 2025 CanadianForms.ca. Not a law firm. Documents are AI-generated and should be reviewed by a qualified lawyer.
              </p>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
                All systems operational
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
