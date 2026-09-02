import React from 'react';
import { History, MapPin, X, ArrowRight, Trash2 } from 'lucide-react';
import { SearchHistoryItem } from '../types';

interface RecentSearchesProps {
  history: SearchHistoryItem[];
  onSelect: (item: SearchHistoryItem) => void;
  onRemove: (id: string, e: React.MouseEvent) => void;
  onClearAll: () => void;
}

export const RecentSearches: React.FC<RecentSearchesProps> = ({
  history,
  onSelect,
  onRemove,
  onClearAll,
}) => {
  if (history.length === 0) return null;

  return (
    <div id="recent-searches-drawer" className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-800 text-[11px] font-bold uppercase tracking-widest">
          <History className="w-3.5 h-3.5 text-blue-600" />
          <span>Recent Searches</span>
        </div>
        <button
          id="clear-all-history-btn"
          onClick={onClearAll}
          className="text-[11px] font-bold text-slate-400 hover:text-red-600 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <Trash2 className="w-3 h-3" />
          <span>Clear</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {history.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            className="inline-flex items-center gap-2 pl-3.5 pr-2.5 py-2 rounded-xl bg-slate-50 hover:bg-white hover:shadow-xs border border-slate-200 transition-all cursor-pointer group text-xs text-slate-700"
          >
            <MapPin className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0" />
            <span className="font-semibold max-w-[180px] truncate">{item.displayName || item.address}</span>
            <button
              onClick={(e) => onRemove(item.id, e)}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
              title="Remove item"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
