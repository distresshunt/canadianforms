"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, FileText, Shield, Zap, Clock, CheckCircle, Star, ArrowRight, Building2, Users, Globe, Search } from "lucide-react";
import formsDb from "@/src/data/forms-db.json";

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

const features = [
  {
    icon: <Zap className="w-6 h-6 text-blue-600" />,
    title: "AI-Generated in Minutes",
    desc: "Answer 3 simple questions. Our AI crafts a jurisdiction-accurate document instantly.",
  },
  {
    icon: <Shield className="w-6 h-6 text-blue-600" />,
    title: "Province-Specific Compliance",
    desc: "Each form reflects the latest provincial regulations — automatically updated.",
  },
  {
    icon: <FileText className="w-6 h-6 text-blue-600" />,
    title: "Court-Ready PDF",
    desc: "Download a fully formatted, ready-to-sign PDF. No editing required.",
  },
  {
    icon: <Clock className="w-6 h-6 text-blue-600" />,
    title: "Skip the $1,500 Lawyer",
    desc: "Get the same professional-grade document for a flat $49 fee.",
  },
];

const testimonials = [
  {
    name: "Sarah K.",
    role: "Startup Founder, Toronto",
    quote: "Filed my Ontario articles of incorporation in 8 minutes. My lawyer quoted me $1,800. This cost me $49.",
    rating: 5,
  },
  {
    name: "James M.",
    role: "Contractor, Calgary",
    quote: "The Independent Contractor Agreement was perfectly tailored to Alberta regulations. Incredibly impressed.",
    rating: 5,
  },
  {
    name: "Priya R.",
    role: "Small Business Owner, Vancouver",
    quote: "Used it for a BC Commercial Lease. Saved me $2,000 in legal fees. Will use again for every filing.",
    rating: 5,
  },
];

const stats = [
  { value: "10,000+", label: "Documents Generated" },
  { value: "$8.2M+", label: "Legal Fees Saved" },
  { value: "14", label: "Regions Covered" },
  { value: "4.9★", label: "Average Rating" },
];

export default function HomePage() {
  const router = useRouter();
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedForm, setSelectedForm] = useState("");
  const [error, setError] = useState("");

  function handleStartFiling() {
    if (!selectedRegion || !selectedIndustry || !selectedForm) {
      setError("Please select a province, industry, and document type.");
      return;
    }
    setError("");
    router.push(`/${selectedRegion}/${selectedIndustry}/${selectedForm}`);
  }

  function openCmdk() {
    window.dispatchEvent(new CustomEvent('open-cmdk'));
  }

  return (
    <>
      {/* Hero Section */}
      <section id="search" className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-white pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzYgMzRhMiAyIDAgMSAxIDAtNCAyIDIgMCAwIDEgMCA0IiBmaWxsPSIjMjU2M2ViIi8+PC9nPjwvc3ZnPg==')] bg-repeat" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-4 py-2 rounded-full mb-8 animate-fade-in-up">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              AI-Powered Legal Document Engine
            </div>

            <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight animate-fade-in-up animate-delay-100">
              Canadian Business Forms,{" "}
              <span className="text-blue-600">Automated by AI.</span>
            </h1>

            <p className="mt-6 text-xl text-slate-600 leading-relaxed animate-fade-in-up animate-delay-200">
              Stop overpaying lawyers for standard filings. Search from 105,000+ industry-specific documents and receive a court-ready PDF in minutes — for a flat <strong className="text-slate-900">$49</strong>.
            </p>

            {/* FAKE SEARCH BAR FOR CMDK */}
            <div className="mt-10 animate-fade-in-up animate-delay-300">
              <button
                onClick={openCmdk}
                className="w-full max-w-2xl mx-auto bg-white border-2 border-blue-100 hover:border-blue-300 shadow-xl rounded-2xl px-6 py-5 flex items-center gap-4 transition-all hover:shadow-2xl group"
              >
                <Search className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
                <span className="text-lg text-slate-400 font-medium text-left flex-1">
                  🔍 What legal document do you need?
                </span>
                <div className="hidden sm:flex items-center gap-1">
                  <kbd className="bg-slate-100 text-slate-500 px-2 py-1 rounded-md text-sm font-semibold font-sans border border-slate-200 shadow-sm">⌘</kbd>
                  <kbd className="bg-slate-100 text-slate-500 px-2 py-1 rounded-md text-sm font-semibold font-sans border border-slate-200 shadow-sm">K</kbd>
                </div>
              </button>
            </div>

            {/* Search Widget */}
            <div className="mt-10 bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8 animate-fade-in-up animate-delay-300 max-w-6xl mx-auto w-full">
              <div className="flex flex-col md:flex-row items-end gap-4 w-full mb-2">
                
                {/* Province Selector */}
                <div className="relative w-full md:w-1/4">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 text-left">
                    Region
                  </label>
                  <div className="relative">
                    <select
                      value={selectedRegion}
                      onChange={(e) => { setSelectedRegion(e.target.value); setError(""); }}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-xl px-4 py-3.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer h-[54px]"
                    >
                      <option value="">Province...</option>
                      {formsDb.regions.map((r) => (
                        <option key={r} value={r}>{toTitleCase(r)}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Industry Selector */}
                <div className="relative w-full md:w-1/3">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 text-left">
                    Industry
                  </label>
                  <div className="relative">
                    <select
                      value={selectedIndustry}
                      onChange={(e) => { setSelectedIndustry(e.target.value); setError(""); }}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-xl px-4 py-3.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer h-[54px]"
                    >
                      <option value="">Select industry...</option>
                      {formsDb.industries.map((i) => (
                        <option key={i} value={i}>{toTitleCase(i)}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Document Selector */}
                <div className="relative w-full md:w-1/3">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 text-left">
                    Document
                  </label>
                  <div className="relative">
                    <select
                      value={selectedForm}
                      onChange={(e) => { setSelectedForm(e.target.value); setError(""); }}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-xl px-4 py-3.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer h-[54px]"
                    >
                      <option value="">Document type...</option>
                      {formsDb.forms.map((f) => (
                        <option key={f} value={f}>{toTitleCase(f)}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="w-full md:w-auto shrink-0 flex flex-col justify-end">
                  <button
                    onClick={handleStartFiling}
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold px-8 rounded-xl shadow-lg transition-all text-lg flex items-center justify-center gap-2 pulse-btn group h-[54px]"
                  >
                    Start Filing
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm mt-2 text-left">{error}</p>
              )}

              <p className="text-xs text-slate-400 mt-4">
                No subscription. Instant download. Satisfaction guaranteed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-blue-600 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-extrabold">{stat.value}</div>
                <div className="text-blue-200 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Three steps. One official document.
            </h2>
            <p className="mt-4 text-slate-600 text-lg">
              The fastest way to file legal forms in Canada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Select Your Form",
                desc: "Choose your province, industry, and document type from our database of 105,000+ form combinations.",
                icon: <FileText className="w-7 h-7 text-blue-600" />,
              },
              {
                step: "02",
                title: "Answer 3 Questions",
                desc: "Our AI asks for the minimum information needed — your name, address, and filing date.",
                icon: <Users className="w-7 h-7 text-blue-600" />,
              },
              {
                step: "03",
                title: "Download Your PDF",
                desc: "Receive a fully formatted, jurisdiction-compliant PDF ready to sign and submit.",
                icon: <CheckCircle className="w-7 h-7 text-blue-600" />,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all group"
              >
                <div className="absolute -top-4 left-8 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Step {item.step}
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Built for Canadian founders
            </h2>
            <p className="mt-4 text-slate-600 text-lg">
              Every feature designed to save you time and money.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Trusted by Canadian entrepreneurs
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-slate-50 rounded-2xl p-8 border border-slate-100"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-slate-700 leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div>
                  <div className="font-semibold text-slate-900">{t.name}</div>
                  <div className="text-slate-500 text-sm">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold mb-4">One simple price.</h2>
          <p className="text-slate-400 text-xl mb-12">No subscriptions. No hidden fees. Pay only when you file.</p>

          <div className="bg-slate-800 rounded-3xl p-10 border border-slate-700 max-w-md mx-auto">
            <div className="text-6xl font-black text-white mb-2">$49</div>
            <div className="text-slate-400 mb-8">per document</div>
            <ul className="space-y-3 text-left mb-10">
              {[
                "AI-generated, jurisdiction-specific document",
                "Instant PDF download",
                "Province-accurate legal language",
                "30-day satisfaction guarantee",
                "No lawyer required",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="#search"
              className="block w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl text-center transition-colors"
            >
              Get Started — $49
            </a>
          </div>

          <p className="mt-8 text-slate-500 text-sm">
            Compare to $1,500+ for a lawyer. You save over 96%.
          </p>
        </div>
      </section>

      {/* Directory CTA */}
      <section className="py-16 bg-blue-50 border-y border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Globe className="w-8 h-8 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Browse all 105,000+ form combinations
          </h2>
          <p className="text-slate-600 mb-6">
            72 document types across 104 industries and 14 Canadian regions.
          </p>
          <a
            href="/directory"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
          >
            <Building2 className="w-5 h-5" />
            View Full Directory
          </a>
        </div>
      </section>
    </>
  );
}
