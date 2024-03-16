import React, { ButtonHTMLAttributes } from 'react'
import Icon from '../Icon/Icon'
import { ThemeIcon } from '../Icon/type'

type ButtonProps = {
  title?: string
  titleClassName?: string
  btnClassName?: string
  icon?: ThemeIcon
  iconSize?: number
  variant?: 'filled' | 'outlined'
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({
  title,
  titleClassName,
  btnClassName,
  icon,
  iconSize,
  variant,
  ...props
}) => {
  let baseStyle = `flex gap-4 items-center mt-8 py-1 px-2 rounded-full ${icon ? 'justify-between' : 'justify-center'}`;
  let variantStyle = '';

  switch (variant) {
    case 'filled':
      variantStyle = 'bg-blue-500 border-0';
      break;
    case 'outlined':
      variantStyle = 'border-2 border-neutral-500';
      break;
    default:
      variantStyle = 'bg-blue-500 border-0';
  }
  return (
    <>
      <button
        className={`${baseStyle} ${variantStyle} ${btnClassName}`}
        {...props}
      >
        <span className={`${titleClassName}`}>{title}</span>
        {icon && (
          <Icon
            name={icon}
            size={iconSize ?? 16}
          />
        )}
      </button>
    </>
  )
}

export default Button