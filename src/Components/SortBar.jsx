import React from "react";
import { ArrowDownAZ, ArrowUpAZ, TrendingDown, TrendingUp } from "lucide-react";

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "priceLowHigh", label: "Price: Low → High" },
  { value: "priceHighLow", label: "Price: High → Low" },
  { value: "nameAZ", label: "Name: A → Z" },
  { value: "nameZA", label: "Name: Z → A" },
];

const SortBar = ({ sortBy, onSortChange }) => {
  return (
    <div>
      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">
        Sort By
      </h4>
      <select
        className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-slate-800 border-none text-slate-700 dark:text-slate-300 focus:ring-2 ring-brand-500 transition-all duration-300 appearance-none cursor-pointer"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortBar;
