import React from 'react';
import { History, Building2, MapPin, X, Trash2, ShieldCheck, Store, AlertTriangle, ShieldAlert } from 'lucide-react';
import { VerificationHistoryItem } from '../types';

interface VerificationHistoryProps {
  history: VerificationHistoryItem[];
  onSelect: (item: VerificationHistoryItem) => void;
  onRemove: (id: string, e: React.MouseEvent) => void;
  onClearAll: () => void;
}

export const VerificationHistory: React.FC<VerificationHistoryProps> = ({
  history,
  onSelect,
  onRemove,
  onClearAll,
}) => {
  if (history.length === 0) return null;

  return (
    <div id="recent-verifications-panel" className="bg-white rounded-[28px] border border-slate-200/90 shadow-sm p-5 space-y-3.5">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2 text-slate-800 text-xs font-bold uppercase tracking-wider">
          <History className="w-3.5 h-3.5 text-blue-600" />
          <span>Recent Verifications</span>
        </div>
        <button
          id="clear-all-history-btn"
          onClick={onClearAll}
          className="text-[11px] font-semibold text-slate-400 hover:text-red-600 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <Trash2 className="w-3 h-3" />
          <span>Clear</span>
        </button>
      </div>

      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {history.map((item) => {
          const isHQ = item.verificationStatus === 'VERIFIED_OFFICIAL_ADDRESS';
          const isBranch = item.verificationStatus === 'VERIFIED_BRANCH_LOCATION';
          const isMismatch = item.verificationStatus === 'MISMATCH_UNVERIFIED';

          return (
            <div
              key={item.id}
              onClick={() => onSelect(item)}
              className="p-3 rounded-xl bg-slate-50/80 hover:bg-blue-50/60 border border-slate-200/70 hover:border-blue-200 transition-all cursor-pointer group flex items-start justify-between gap-2.5"
            >
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-900 group-hover:text-blue-700 truncate">
                    {item.companyName}
                  </span>
                  <span
                    className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded ${
                      isHQ
                        ? 'bg-emerald-100 text-emerald-800'
                        : isBranch
                        ? 'bg-blue-100 text-blue-800'
                        : isMismatch
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {isHQ ? 'Official HQ' : isBranch ? 'Active Store' : isMismatch ? 'Mismatch' : 'Partial'}
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 font-mono truncate">
                  {item.companyAddress}
                </p>

                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <span>{item.localLanguage}</span>
                  <span>•</span>
                  <span>Score: {item.confidenceScore}%</span>
                </div>
              </div>

              <button
                onClick={(e) => onRemove(item.id, e)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-200/60 transition-colors shrink-0"
                title="Remove from history"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
