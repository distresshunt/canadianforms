"use client";

import { useEffect, useState, useMemo } from 'react';
import { Command } from 'cmdk';
import { FileText, Search } from 'lucide-react';
import Fuse from 'fuse.js';
import formsDb from '@/src/data/forms-db.json';
import { useRouter } from 'next/navigation';

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

// Pre-compute the search combinations
const searchableItems = formsDb.industries.flatMap(industry => 
  formsDb.forms.map(form => ({
    title: `${toTitleCase(form)} for ${toTitleCase(industry)}`,
    industry,
    form
  }))
);

const POPULAR_SEARCHES = [
  { form: 'non-disclosure-agreement', industry: 'indie-game-studios' },
  { form: 'commercial-lease', industry: 'botox-medical-spas' },
  { form: 'independent-contractor-agreement', industry: 'residential-roofing' },
  { form: 'shareholder-agreement', industry: 'ecommerce-startups' },
  { form: 'privacy-policy', industry: 'saas-providers' }
].map(item => ({
  title: `${toTitleCase(item.form)} for ${toTitleCase(item.industry)}`,
  industry: item.industry,
  form: item.form
}));

const fuse = new Fuse(searchableItems, {
  keys: ['title'],
  threshold: 0.3,
  includeMatches: false,
});

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Listen for custom event to open from the homepage fake search bar
  useEffect(() => {
    const openCmdk = () => setOpen(true);
    window.addEventListener('open-cmdk', openCmdk);
    return () => window.removeEventListener('open-cmdk', openCmdk);
  }, []);

  const { filteredResults, activeRegion } = useMemo(() => {
    if (!search) return { filteredResults: POPULAR_SEARCHES, activeRegion: 'ontario' };
    
    let regionMatch = 'ontario';
    let query = search;

    // Detect if they typed a region (e.g. "Alberta NDA")
    for (const region of formsDb.regions) {
      const formattedRegion = region.replace(/-/g, ' ');
      if (search.toLowerCase().includes(formattedRegion)) {
        regionMatch = region;
        query = query.replace(new RegExp(formattedRegion, 'ig'), '').trim();
        break;
      }
    }

    if (!query) {
       return { filteredResults: POPULAR_SEARCHES, activeRegion: regionMatch };
    }

    const results = fuse.search(query).slice(0, 8).map(r => r.item);
    return { filteredResults: results, activeRegion: regionMatch };
  }, [search]);

  return (
    <Command.Dialog 
      open={open} 
      onOpenChange={setOpen}
      label="Global Command Menu"
      className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-[640px] bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-2xl overflow-hidden text-slate-900 z-50 animate-in fade-in zoom-in-95 duration-200"
    >
      <div className="flex items-center px-4 border-b border-slate-100">
        <Search className="w-5 h-5 text-slate-400" />
        <Command.Input 
          value={search}
          onValueChange={setSearch}
          placeholder="Search forms or industries... (e.g. 'NDA for roofing')"
          className="w-full px-4 py-5 text-lg focus:outline-none bg-transparent placeholder-slate-400 font-medium" 
        />
      </div>

      <Command.List className="p-2 max-h-[400px] overflow-y-auto overscroll-contain">
        <Command.Empty className="px-6 py-8 text-center text-slate-500">
          No results found. Try broader terms like "Lease" or "Agreement".
        </Command.Empty>

        {filteredResults.length > 0 && (
          <Command.Group 
            heading={!search ? `POPULAR SEARCHES IN ${activeRegion.toUpperCase().replace(/-/g, ' ')}` : `Results in ${toTitleCase(activeRegion)}`} 
            className="px-2 py-2 text-slate-400 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:mb-2"
          >
            {filteredResults.map((item, index) => (
              <Command.Item
                key={`${item.industry}-${item.form}-${index}`}
                onSelect={() => {
                  setOpen(false);
                  setSearch("");
                  router.push(`/${activeRegion}/${item.industry}/${item.form}`);
                }}
                className="px-4 py-3 rounded-xl hover:bg-blue-50 aria-selected:bg-blue-50 aria-selected:text-blue-700 cursor-pointer flex items-center gap-3 transition-colors text-slate-700 group normal-case text-base"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-blue-100 group-aria-selected:bg-blue-100 transition-colors">
                  <FileText className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-aria-selected:text-blue-600" />
                </div>
                <span className="font-medium group-hover:text-blue-900 group-aria-selected:text-blue-900">
                  📝 {item.title}
                </span>
              </Command.Item>
            ))}
          </Command.Group>
        )}
      </Command.List>
    </Command.Dialog>
  );
}
