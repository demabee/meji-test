import React, { InputHTMLAttributes } from 'react'

type TextInputProps = {
  label?: string
  placeholder?: string
  name?: string
  className?: string
  labelClassName?: string
} & InputHTMLAttributes<HTMLInputElement>

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  name,
  className,
  labelClassName,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className={`font-bold ${labelClassName}`}>{label}</label>
      <input
        className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
        placeholder={placeholder}
        {...props}
      />
    </div>
  )
}

export default TextInput