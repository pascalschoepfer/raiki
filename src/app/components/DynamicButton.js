'use client';

export default function DynamicButton({ href, children, className = "" }) {
  return (
    <a
      href={href}
      className={`group bg-[#151210] border-2 border-[#6b6055] px-4 py-3 relative overflow-hidden transition-all duration-200 hover:scale-105 hover:border-[#a09080] cursor-pointer flex items-center justify-center whitespace-nowrap w-32 ${className}`}
    >
      <div className="absolute inset-0 bg-[#a09080]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
      <span className="relative text-[#a09080] group-hover:text-[#e8e0d5] text-sm tracking-wider">{children}</span>
    </a>
  );
}