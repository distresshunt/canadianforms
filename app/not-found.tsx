import { FileSearch, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-24">
      <div className="text-center max-w-lg mx-auto px-4">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <FileSearch className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">Form Not Found</h1>
        <p className="text-slate-600 mb-8 leading-relaxed">
          That form/province combination doesn&apos;t exist in our database. Browse our full directory to find the right document for your needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/directory"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Browse Directory
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-blue-300 text-slate-700 font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
