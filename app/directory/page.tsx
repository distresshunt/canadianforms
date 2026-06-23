import type { Metadata } from "next";
import { ArrowRight, Globe, MapPin } from "lucide-react";
import formsDb from "@/src/data/forms-db.json";

export const metadata: Metadata = {
  title: "Regions Directory | CanadianForms.ca",
  description: "Select your Canadian province or territory to find industry-specific legal forms.",
};

function toTitleCase(slug: string): string {
  const smallWords = ["and", "of", "to", "the", "in", "on", "for", "with"];
  return slug
    .split("-")
    .map((word, index) => {
      if (index > 0 && smallWords.includes(word.toLowerCase())) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

const regionColors: Record<string, string> = {
  ontario: "bg-red-50 border-red-100 text-red-700 hover:bg-red-100 hover:border-red-200",
  alberta: "bg-blue-50 border-blue-100 text-blue-700 hover:bg-blue-100 hover:border-blue-200",
  "british-columbia": "bg-green-50 border-green-100 text-green-700 hover:bg-green-100 hover:border-green-200",
  "nova-scotia": "bg-purple-50 border-purple-100 text-purple-700 hover:bg-purple-100 hover:border-purple-200",
  manitoba: "bg-amber-50 border-amber-100 text-amber-700 hover:bg-amber-100 hover:border-amber-200",
  saskatchewan: "bg-orange-50 border-orange-100 text-orange-700 hover:bg-orange-100 hover:border-orange-200",
  federal: "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 hover:border-slate-300",
};

const regionFlags: Record<string, string> = {
  ontario: "🔴",
  alberta: "🔵",
  "british-columbia": "🟢",
  "nova-scotia": "🟣",
  manitoba: "🟡",
  saskatchewan: "🟠",
  federal: "🍁",
};

export default function DirectoryPage() {
  const totalForms = formsDb.regions.length * formsDb.industries.length * formsDb.forms.length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-4 py-2 rounded-full mb-6">
            <Globe className="w-4 h-4" />
            Complete Form Index
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
            Select Your Jurisdiction
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {totalForms.toLocaleString()} form combinations available. Select your province or territory below to find industry-specific legal forms.
          </p>
        </div>
      </section>

      {/* Regions Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {formsDb.regions.map((region) => (
            <a
              key={region}
              href={`/directory/${region}`}
              className={`group flex items-center justify-between px-6 py-5 rounded-2xl border transition-all hover:shadow-md ${regionColors[region] || "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-blue-200"}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{regionFlags[region] || "📍"}</span>
                <span className="font-bold text-lg">{toTitleCase(region)}</span>
              </div>
              <ArrowRight className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
