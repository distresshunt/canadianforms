import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, Building2, MapPin } from "lucide-react";
import formsDb from "@/src/data/forms-db.json";

interface Props {
  params: Promise<{ region: string }>;
}

export async function generateStaticParams() {
  return formsDb.regions.map((region) => ({ region }));
}

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region } = await params;
  if (!formsDb.regions.includes(region)) return { title: "Not Found" };
  
  return {
    title: `Industries in ${toTitleCase(region)} | CanadianForms.ca`,
    description: `Browse legal forms for ${formsDb.industries.length} industries in ${toTitleCase(region)}.`,
  };
}

export default async function RegionDirectoryPage({ params }: Props) {
  const { region } = await params;

  if (!formsDb.regions.includes(region)) {
    notFound();
  }

  const regionTitle = toTitleCase(region);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
            <span>/</span>
            <a href="/directory" className="hover:text-blue-600 transition-colors">Directory</a>
            <span>/</span>
            <span className="text-slate-900 font-semibold">{regionTitle}</span>
          </nav>
        </div>
      </div>

      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-4 py-2 rounded-full mb-6">
            <MapPin className="w-4 h-4" />
            {regionTitle}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
            Select Your Industry
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Choose from {formsDb.industries.length} industries in {regionTitle} to view specifically tailored legal documents.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {formsDb.industries.map((industry) => (
            <a
              key={industry}
              href={`/directory/${region}/${industry}`}
              className="group bg-white rounded-xl border border-slate-200 p-5 hover:border-blue-300 hover:shadow-md transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 transition-colors">
                  <Building2 className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-700 transition-colors">
                  {toTitleCase(industry)}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
