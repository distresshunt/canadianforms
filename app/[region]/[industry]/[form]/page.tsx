import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CheckCircle, Shield, Clock, FileText, Star, ArrowRight, Lock, Download } from "lucide-react";
import formsDb from "@/src/data/forms-db.json";
import Questionnaire from "@/src/components/Questionnaire";

interface PageProps {
  params: Promise<{ region: string; industry: string; form: string }>;
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

export async function generateStaticParams() {
  // To prevent 'Maximum call stack size exceeded' during build for 150,000+ paths,
  // we do not pre-render all possible combinations.
  // Next.js will dynamically generate (and cache) these pages on-demand.
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region, industry, form } = await params;

  if (!formsDb.regions.includes(region) || !formsDb.industries.includes(industry) || !formsDb.forms.includes(form)) {
    return { title: "Not Found" };
  }

  const regionTitle = toTitleCase(region);
  const industryTitle = toTitleCase(industry);
  const formTitle = toTitleCase(form);

  return {
    title: `Official ${formTitle} for ${industryTitle} in ${regionTitle} | CanadianForms.ca`,
    description: `Stop paying lawyer fees. Generate a court-ready ${formTitle} tailored specifically for ${industryTitle} operating under ${regionTitle} provincial guidelines. Ready to sign in minutes.`,
    keywords: [
      `${formTitle} ${industryTitle} ${regionTitle}`,
      `${regionTitle} ${formTitle} template`,
      `file ${formTitle} Canada`,
      `${regionTitle} corporate forms`,
      `AI legal documents ${regionTitle}`,
    ],
    openGraph: {
      title: `Official ${formTitle} for ${industryTitle} in ${regionTitle}`,
      description: `AI-generated ${formTitle} for ${industryTitle} in ${regionTitle}. Compliant, instant, $49.`,
    },
  };
}

const trustSignals = [
  { icon: <Shield className="w-5 h-5 text-blue-600" />, text: "Province-compliant language" },
  { icon: <Clock className="w-5 h-5 text-blue-600" />, text: "Ready in under 5 minutes" },
  { icon: <Download className="w-5 h-5 text-blue-600" />, text: "Instant PDF download" },
  { icon: <Lock className="w-5 h-5 text-blue-600" />, text: "256-bit encrypted" },
];

const defaultFaq = [
  {
    q: "Is this document legally binding?",
    a: "Yes. Our AI generates documents using province-accurate legal language. We recommend having a lawyer review for complex situations.",
  },
  {
    q: "What format will I receive?",
    a: "You'll receive a professionally formatted PDF, ready to print, sign, and submit.",
  },
  {
    q: "What if I'm not satisfied?",
    a: "We offer a 30-day satisfaction guarantee. If you're not happy, we'll refund your $49 — no questions asked.",
  },
];

export default async function FormPage({ params }: PageProps) {
  const { region, industry, form } = await params;

  // Validate the route against the database
  if (!formsDb.regions.includes(region) || !formsDb.industries.includes(industry) || !formsDb.forms.includes(form)) {
    notFound();
  }

  const regionTitle = toTitleCase(region);
  const industryTitle = toTitleCase(industry);
  const formTitle = toTitleCase(form);
  const faqs = defaultFaq; // Add custom FAQs here later if needed

  const relatedForms = formsDb.forms
    .filter((f) => f !== form)
    .slice(0, 4)
    .map((f) => ({ slug: f, title: toTitleCase(f) }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `Official ${formTitle} for ${industryTitle} in ${regionTitle}`,
    "description": "AI-generated, court-ready legal document tailored for provincial compliance.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "184"
    },
    "offers": {
      "@type": "Offer",
      "price": "49.00",
      "priceCurrency": "CAD",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
            <span>/</span>
            <a href="/directory" className="hover:text-blue-600 transition-colors">Directory</a>
            <span>/</span>
            <a href={`/directory/${region}`} className="hover:text-blue-600 transition-colors">{regionTitle}</a>
            <span>/</span>
            <a href={`/directory/${region}/${industry}`} className="hover:text-blue-600 transition-colors">{industryTitle}</a>
            <span>/</span>
            <span className="text-slate-900 font-semibold">{formTitle}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Hero Card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                <div className="flex items-center gap-2 text-blue-200 text-sm mb-3">
                  <FileText className="w-4 h-4" />
                  <span>{industryTitle} Document — {regionTitle}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                  Official {formTitle} for {industryTitle} in {regionTitle}
                </h1>
              </div>
              <div className="px-8 py-6">
                <p className="text-lg text-slate-600 leading-relaxed">
                  Stop paying lawyer fees. Generate a court-ready <strong className="text-slate-900">{formTitle}</strong> tailored specifically for <strong className="text-slate-900">{industryTitle}</strong> operating under <strong className="text-slate-900">{regionTitle}</strong> provincial guidelines. Ready to sign in minutes.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                  {trustSignals.map((signal) => (
                    <div key={signal.text} className="flex items-start gap-2">
                      {signal.icon}
                      <span className="text-sm text-slate-600">{signal.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Questionnaire regionTitle={regionTitle} industryTitle={industryTitle} formTitle={formTitle} />

            {/* Internal Links — Other Forms for this Industry */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Other forms for {industryTitle} in {regionTitle}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedForms.map((rf) => (
                  <a
                    key={rf.slug}
                    href={`/${region}/${industry}/${rf.slug}`}
                    className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all group"
                  >
                    <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">
                      {rf.title}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky CTA Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Pricing Card */}
              <div className="bg-white rounded-2xl border-2 border-blue-200 shadow-xl p-8">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                    <span className="text-sm text-slate-500 ml-1">(2,400+ reviews)</span>
                  </div>
                  <div className="text-5xl font-black text-slate-900 mt-3">$49</div>
                  <div className="text-slate-500 text-sm mt-1">one-time, instant download</div>
                </div>

                <a
                  href="#questionnaire"
                  className="block text-center w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all text-lg"
                >
                  Generate Official Document ($49)
                </a>

                <div className="mt-4 space-y-2">
                  {[
                    "Province-accurate legal language",
                    "Instant PDF download",
                    "30-day money-back guarantee",
                    "No lawyer needed",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-slate-600">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                  <div className="flex items-center justify-center gap-2 text-slate-500 text-xs">
                    <Lock className="w-3.5 h-3.5" />
                    Secured by 256-bit SSL encryption
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
