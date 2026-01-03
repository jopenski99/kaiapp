"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

/** Base option shape */
export type SelectOption<TValue> = {
  label: string;
  value: TValue;
};

type CustomSelectProps<TValue> = {
  label: string;
  options: SelectOption<TValue>[];
  value?: TValue;
  onChange: (value: TValue) => void;
};

export default function CustomSelect<TValue>({
  label,
  options,
  value,
  onChange,
}: CustomSelectProps<TValue>) {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find((o) => o.value === value);

  const handleOptionSelect = (option: SelectOption<TValue>) => {
    onChange(option.value); // ✅ value only
    setOpen(false);
  };

  return (
    <div className="relative">
      {/* Trigger */}
      <label className="flex items-center justify-between w-full">
                <span className="flex text-center w-3/12">{label}</span>
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    className="flex items-center justify-end input"
                >
                    <span className="flex-1">{selectedOption?.label}</span>
                    <ChevronDown size={16} className="justify-end" />
                </button>
            </label>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 w-full mt-1 bg-black border border-teal-400 rounded-2xl shadow-lg">
          {options.map((opt) => (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => handleOptionSelect(opt)}
              className={`w-full text-left px-3 py-2 rounded-2xl hover:bg-gray-800
                ${
                  opt.value === value
                    ? "bg-gray-800 text-white"
                    : "text-gray-300"
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
