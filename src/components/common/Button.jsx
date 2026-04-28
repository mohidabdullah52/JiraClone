import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  type = 'button', 
  className = '', 
  disabled = false,
  icon: Icon,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded font-medium transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#579dff] hover:bg-[#85b8ff] text-[#1d2125] px-3 py-1.5",
    secondary: "bg-[#282e33] hover:bg-[#38414a] text-[#c7d1db] px-3 py-1.5 border border-[#8c9bab]/20",
    ghost: "hover:bg-[#282e33] text-[#9fadbc] hover:text-[#c7d1db] p-1.5 transition-colors",
    danger: "bg-[#ef4444] hover:bg-[#f87171] text-white px-3 py-1.5",
    link: "text-[#579dff] hover:underline p-0 h-auto font-normal",
    icon: "p-1 hover:bg-[#282e33] rounded text-[#9fadbc] transition-colors",
    tab: "flex items-center space-x-1.5 px-3 py-2 text-[14px] font-medium border-b-2 transition-colors relative top-[1px] rounded-none bg-transparent"
  };

  const variantStyles = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {Icon && <Icon className={`${children ? 'mr-1.5' : ''} w-4 h-4`} />}
      {children}
    </button>
  );
};

export default Button;
