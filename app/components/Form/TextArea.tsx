import React, { TextareaHTMLAttributes } from 'react'

type TextareaProps = {
  label?: string
  placeholder?: string
  name?: string
  className?: string
  labelClassName?: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea: React.FC<TextareaProps> = ({
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
      <textarea
        className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-neutral-100 ${className}`}
        placeholder={placeholder}
        {...props}
      />
    </div>
  )
}

export default Textarea
