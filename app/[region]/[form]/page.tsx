import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CheckCircle, Shield, Clock, FileText, Star, ArrowRight, Lock, Download } from "lucide-react";
import formsDb from "@/src/data/forms-db.json";

interface PageProps {
  params: Promise<{ region: string; form: string }>;
}

function toTitleCase(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateStaticParams() {
  const paths: { region: string; form: string }[] = [];
  for (const region of formsDb.regions) {
    for (const form of formsDb.forms) {
      paths.push({ region, form });
    }
  }
  return paths;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region, form } = await params;

  if (!formsDb.regions.includes(region) || !formsDb.forms.includes(form)) {
    return { title: "Not Found" };
  }

  const regionTitle = toTitleCase(region);
  const formTitle = toTitleCase(form);

  return {
    title: `${formTitle} — ${regionTitle} | CanadianForms.ca`,
    description: `File your ${formTitle} in ${regionTitle} instantly with AI. Skip $1,500 lawyer fees. Province-accurate document generated in minutes for just $49.`,
    keywords: [
      `${formTitle} ${regionTitle}`,
      `${regionTitle} ${formTitle} template`,
      `file ${formTitle} Canada`,
      `${regionTitle} corporate forms`,
      `AI legal documents ${regionTitle}`,
    ],
    openGraph: {
      title: `${formTitle} — ${regionTitle}`,
      description: `AI-generated ${formTitle} for ${regionTitle}. Compliant, instant, $49.`,
    },
  };
}

const trustSignals = [
  { icon: <Shield className="w-5 h-5 text-blue-600" />, text: "Province-compliant language" },
  { icon: <Clock className="w-5 h-5 text-blue-600" />, text: "Ready in under 5 minutes" },
  { icon: <Download className="w-5 h-5 text-blue-600" />, text: "Instant PDF download" },
  { icon: <Lock className="w-5 h-5 text-blue-600" />, text: "256-bit encrypted" },
];

const faqByForm: Record<string, { q: string; a: string }[]> = {
  "articles-of-incorporation": [
    {
      q: "What information do I need to incorporate?",
      a: "You need the corporation name, registered office address, director information, share structure, and the province of incorporation.",
    },
    {
      q: "How long does it take to incorporate after filing?",
      a: "Provincial incorporations are typically processed within 1–5 business days. Federal incorporation via Corporations Canada is often same-day online.",
    },
    {
      q: "Can I use this document to incorporate federally?",
      a: "This form is designed for the selected province. For federal incorporation, select 'Federal' as your jurisdiction.",
    },
  ],
  "shareholder-agreement": [
    {
      q: "Is a shareholder agreement legally required?",
      a: "No, but it is strongly recommended for any company with more than one shareholder to prevent disputes.",
    },
    {
      q: "Does this cover buy-sell provisions?",
      a: "Yes. Our AI-generated shareholder agreement includes drag-along, tag-along, and right of first refusal clauses.",
    },
  ],
  "commercial-lease": [
    {
      q: "Is this compliant with provincial commercial tenancy law?",
      a: "Yes. The document is tailored to the selected province's Commercial Tenancies Act and regulations.",
    },
    {
      q: "Can I customize the lease term and rent amount?",
      a: "Absolutely. Our AI questionnaire lets you specify all key terms before generating your document.",
    },
  ],
};

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
  const { region, form } = await params;

  // Validate the route against the database
  if (!formsDb.regions.includes(region) || !formsDb.forms.includes(form)) {
    notFound();
  }

  const regionTitle = toTitleCase(region);
  const formTitle = toTitleCase(form);
  const faqs = faqByForm[form] ?? defaultFaq;

  const relatedForms = formsDb.forms
    .filter((f) => f !== form)
    .slice(0, 4)
    .map((f) => ({ slug: f, title: toTitleCase(f) }));

  const otherRegions = formsDb.regions
    .filter((r) => r !== region)
    .slice(0, 4)
    .map((r) => ({ slug: r, title: toTitleCase(r) }));

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
            <span className="text-slate-700 font-medium">{regionTitle}</span>
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
                  <span>{regionTitle} Legal Document</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                  File your {formTitle} in {regionTitle} instantly with AI.
                </h1>
              </div>
              <div className="px-8 py-6">
                <p className="text-lg text-slate-600 leading-relaxed">
                  Skip the <strong className="text-slate-900">$1,500 lawyer fees</strong>. Our AI agent knows exact{" "}
                  <strong className="text-slate-900">{regionTitle}</strong> provincial requirements. Answer 3 questions
                  and generate your ready-to-sign PDF.
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

            {/* What's Included */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">What&apos;s included in your {formTitle}</h2>
              <div className="space-y-3">
                {[
                  `Fully drafted ${formTitle} tailored to ${regionTitle} legislation`,
                  "All required statutory provisions and mandatory clauses",
                  `Compliance with the latest ${regionTitle} regulations (updated ${new Date().getFullYear()})`,
                  "Professional legal formatting — court and registry ready",
                  "Fillable PDF with your information pre-populated",
                  "30-day satisfaction guarantee",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Frequently asked questions
              </h2>
              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-slate-100 last:border-0 pb-6 last:pb-0">
                    <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Internal Links — Other Forms in This Region */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Other {regionTitle} forms
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedForms.map((rf) => (
                  <a
                    key={rf.slug}
                    href={`/${region}/${rf.slug}`}
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

            {/* Internal Links — Same Form in Other Regions */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                {formTitle} in other provinces
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {otherRegions.map((or_) => (
                  <a
                    key={or_.slug}
                    href={`/${or_.slug}/${form}`}
                    className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all group"
                  >
                    <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">
                      {formTitle} — {or_.title}
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

                <button
                  id="generate-document-btn"
                  className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all text-lg"
                >
                  Generate Official Document ($49)
                </button>

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

              {/* Lawyer Comparison */}
              <div className="bg-red-50 rounded-2xl border border-red-100 p-6">
                <h3 className="font-bold text-slate-900 text-sm mb-3">💡 Compare your options</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Bay Street Lawyer</span>
                    <span className="font-semibold text-red-600 line-through">$1,500–$3,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Legal Zoom</span>
                    <span className="font-semibold text-orange-500 line-through">$299+/yr</span>
                  </div>
                  <div className="flex justify-between border-t border-red-200 pt-2 mt-2">
                    <span className="font-bold text-slate-900">CanadianForms.ca</span>
                    <span className="font-black text-green-600">$49 flat</span>
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
