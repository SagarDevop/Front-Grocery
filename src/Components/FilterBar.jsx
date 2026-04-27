import React from "react";
import { cn } from "../Utils/cn";

const FilterBar = ({ categories, selected, onSelect }) => {
  return (
    <div>
      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">
        Categories
      </h4>
      <div className="flex flex-col gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            className={cn(
              "px-4 py-2.5 rounded-xl text-sm font-semibold text-left transition-all duration-300",
              selected === cat
                ? "bg-brand-500 text-white shadow-lg shadow-brand-500/20"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            )}
            onClick={() => onSelect(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
