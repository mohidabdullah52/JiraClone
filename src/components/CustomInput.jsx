import React from 'react';

export default function CustomInput({ label, type = "text", value, onChange, placeholder }) {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-[12px] font-bold text-[#9fadbc] mb-1.5 ml-0.5">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-[#1d2125] border border-[#738496] rounded px-3 py-2 text-[#c7d1db] placeholder-[#738496] focus:outline-none focus:border-[#4c9aff] focus:ring-1 focus:ring-[#4c9aff] transition-all text-[14px]"
      />
    </div>
  );
}
