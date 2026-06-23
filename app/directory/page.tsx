import type { Metadata } from "next";
import { ArrowRight, Globe, Landmark } from "lucide-react";
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
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
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
              className="group flex items-center justify-between p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-600 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Landmark className="text-blue-600 w-5 h-5" />
                <span className="text-slate-900 font-semibold text-lg">{toTitleCase(region)}</span>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
