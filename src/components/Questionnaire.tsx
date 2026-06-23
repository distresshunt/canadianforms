"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Loader2, ArrowRight, FileText, Lock } from "lucide-react";
import Script from "next/script";
import ReactMarkdown from 'react-markdown';

export default function Questionnaire({ regionTitle, industryTitle, formTitle }: { regionTitle: string, industryTitle: string, formTitle: string }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    address: "",
    directors: "",
  });
  
  const [loadingStep, setLoadingStep] = useState(0);
  const [isGeneratingTest, setIsGeneratingTest] = useState(false);
  const [generatedDocument, setGeneratedDocument] = useState<string | null>(null);
  const loadingMessages = [
    "Analyzing provincial requirements...",
    "Formatting legal clauses...",
    "Finalizing PDF..."
  ];

  const handleAdminTest = async () => {
    setIsGeneratingTest(true);
    try {
      const response = await fetch('/api/generate-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          region: regionTitle,
          industry: industryTitle,
          form: formTitle,
          answers: formData
        })
      });
      const data = await response.json();
      if (data.document) {
        setGeneratedDocument(data.document);
      } else {
        alert('Failed to generate document.');
      }
    } catch (err) {
      console.error(err);
      alert('Error generating document.');
    } finally {
      setIsGeneratingTest(false);
    }
  };

  useEffect(() => {
    if (step === 4) {
      const interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev >= 2) {
            clearInterval(interval);
            setTimeout(() => setStep(5), 1000); // Wait 1s on the last message then show success
            return prev;
          }
          return prev + 1;
        });
      }, 1000); // 3 seconds total
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleNext = () => setStep((s) => s + 1);

  if (generatedDocument) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden min-h-[400px] max-h-[800px] overflow-y-auto p-8 animate-fade-in-up">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-6 border-b pb-4">Generated Document (Admin Mode)</h2>
        <div className="prose prose-slate max-w-none mb-8">
          <ReactMarkdown>{generatedDocument}</ReactMarkdown>
        </div>
        <button onClick={() => setGeneratedDocument(null)} className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-blue-700 transition-colors">
          Close Viewer
        </button>
      </div>
    );
  }

  if (step === 5) {
    return (
      <div className="relative bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden min-h-[400px] flex items-center justify-center p-8 animate-fade-in-up">
        {/* Fake blurred document background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 select-none flex flex-col gap-4 p-8 overflow-hidden blur-[3px]">
          <div className="w-1/3 h-6 bg-slate-300 rounded mb-8"></div>
          <div className="w-full h-3 bg-slate-200 rounded"></div>
          <div className="w-5/6 h-3 bg-slate-200 rounded"></div>
          <div className="w-full h-3 bg-slate-200 rounded"></div>
          <div className="w-4/5 h-3 bg-slate-200 rounded mb-6"></div>
          <div className="w-1/2 h-4 bg-slate-300 rounded mb-4"></div>
          <div className="w-full h-3 bg-slate-200 rounded"></div>
          <div className="w-full h-3 bg-slate-200 rounded"></div>
          <div className="w-3/4 h-3 bg-slate-200 rounded"></div>
        </div>

        {/* Success Content Overlay */}
        <div className="relative z-10 bg-white/90 backdrop-blur-md border border-slate-100 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Document Successfully Drafted</h2>
          <p className="text-slate-600 mb-8">
            Your official {formTitle} for {regionTitle} is ready. All legal clauses have been formatted to provincial standards.
          </p>

          <a
            href="https://gumroad.com/l/your-product-link"
            data-gumroad-overlay-checkout="true"
            className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-green-600/20 transition-all flex items-center justify-center gap-2 group text-lg"
          >
            Pay $49.00 CAD to Download
            <Lock className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
          </a>
          <button onClick={handleAdminTest} disabled={isGeneratingTest} className="mt-4 text-xs text-slate-400 hover:text-blue-500 underline disabled:opacity-50 transition-colors">
            {isGeneratingTest ? "Generating Test Document..." : "Admin Bypass: Test Generate Document"}
          </button>
          <p className="text-xs text-slate-500 mt-4 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" /> Secure 256-bit Checkout
          </p>
        </div>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center flex flex-col items-center justify-center min-h-[300px] animate-fade-in-up">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-6" />
        <h3 className="text-xl font-bold text-slate-900 transition-all duration-300">
          {loadingMessages[loadingStep]}
        </h3>
        <div className="w-48 h-1.5 bg-slate-100 rounded-full mt-8 overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-1000 ease-linear"
            style={{ width: `${((loadingStep + 1) / 3) * 100}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <>
    <div id="questionnaire" className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 animate-fade-in-up scroll-mt-24">
      <div className="flex items-center gap-2 text-sm font-medium text-blue-600 mb-8">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100">
          {step}
        </span>
        Step {step} of 3
      </div>

      <div className="space-y-6">
        {step === 1 && (
          <div className="animate-fade-in-up">
            <label className="block text-xl font-bold text-slate-900 mb-4">
              What is your legal Business Name?
            </label>
            <input
              type="text"
              autoFocus
              className="w-full text-lg px-4 py-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm"
              placeholder="e.g. Acme Corporation Inc."
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              onKeyDown={(e) => { if (e.key === "Enter" && formData.businessName) handleNext(); }}
            />
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in-up">
            <label className="block text-xl font-bold text-slate-900 mb-4">
              What is the primary registered address?
            </label>
            <input
              type="text"
              autoFocus
              className="w-full text-lg px-4 py-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm"
              placeholder="e.g. 123 Main St, Suite 400, Toronto, ON M1M 1M1"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              onKeyDown={(e) => { if (e.key === "Enter" && formData.address) handleNext(); }}
            />
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in-up">
            <label className="block text-xl font-bold text-slate-900 mb-4">
              List the full names of all acting directors.
            </label>
            <textarea
              autoFocus
              className="w-full text-lg px-4 py-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm min-h-[120px] resize-y"
              placeholder="1. Jane Doe&#10;2. John Smith"
              value={formData.directors}
              onChange={(e) => setFormData({ ...formData, directors: e.target.value })}
            />
          </div>
        )}

        <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="text-slate-500 hover:text-slate-700 font-medium px-4 py-2"
            >
              Back
            </button>
          ) : <div></div>}
          
          <button
            onClick={handleNext}
            disabled={
              (step === 1 && !formData.businessName) ||
              (step === 2 && !formData.address) ||
              (step === 3 && !formData.directors)
            }
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            {step === 3 ? "Generate Document" : "Continue"}
            {step !== 3 && <ArrowRight className="w-5 h-5" />}
            {step === 3 && <FileText className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
      <Script src="https://gumroad.com/js/gumroad.js" strategy="lazyOnload" />
    </>
  );
}
