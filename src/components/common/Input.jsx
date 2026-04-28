import React from 'react';

const Input = ({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  placeholder, 
  className = "", 
  containerClassName = "",
  icon: Icon,
  ...props 
}) => {
  return (
    <div className={`flex flex-col ${containerClassName}`}>
      {label && (
        <label className="text-[12px] font-bold text-[#9fadbc] mb-1.5 ml-0.5">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && <Icon className="w-4 h-4 absolute left-3 text-[#9fadbc]" />}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full bg-[#1d2125] border border-[#738496] rounded px-3 py-2 text-[#c7d1db] 
            placeholder-[#738496] focus:outline-none focus:border-[#4c9aff] focus:ring-1 
            focus:ring-[#4c9aff] transition-all text-[14px]
            ${Icon ? 'pl-9' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
