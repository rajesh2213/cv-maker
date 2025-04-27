import React from "react";

export default function InputGroup({
  label,
  type,
  id,
  name,
  value,
  onChange,
  required,
  placeholder = ''
}) {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      {name == "description" ? (
        <textarea
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={!!required}
      />
      ):(
        <input
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={!!required}
      />
      )
      }
    </div>
  );
}