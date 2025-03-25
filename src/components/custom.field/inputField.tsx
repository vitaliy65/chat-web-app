'use client';

import React from 'react';

type InputFieldProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  id: string;
  name: string;
  placeholder: string;
  required: boolean;
  label: string;
};

export default function InputField({
  handleChange,
  type,
  id,
  name,
  placeholder,
  required,
  label,
}: InputFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        className="input-field"
        placeholder={placeholder}
        onChange={handleChange}
        required={required}
      />
    </div>
  );
}
