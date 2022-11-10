import React from "react";

export default function Input({ value, onChange, title, type, name, className }) {
  return (
    <div className={className}>
      <label htmlFor="name" className="text-sm text-gray-600">{title}</label>
      <input
        type={type || "text"}
        value={value}
        name={name}
        onChange={onChange}
        className="w-full border p-1.5 rounded-md outline-none"
      />
    </div>
  );
}
