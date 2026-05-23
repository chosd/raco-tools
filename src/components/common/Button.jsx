export default function Button({

  children,

  onClick,

  variant = "primary",

  className = "",

  disabled = false,

  size="md",

}) {

  const variantStyle = {

    primary: `
      bg-[var(--color-primary)]
      hover:bg-[var(--color-primary-hover)]
      text-white
    `,

    secondary: `
      bg-[var(--color-surface)]
      hover:bg-zinc-700
      text-white
    `,

    success: `
      bg-green-600
      hover:bg-green-700
      text-white
    `,

    danger: `
      bg-red-600
      hover:bg-red-700
      text-white
    `,

  };

  const sizeStyle = {

    sm: `
        px-3
        py-1
        text-sm
    `,

    md: `
        px-4
        py-2
        text-base
    `,

    lg: `
        px-5
        py-3
        text-lg
    `,
    };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${sizeStyle[size]}
        rounded-lg
        font-medium
        transition-colors
        duration-150
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variantStyle[variant]}
        ${className}
      `}
    >

      {children}

    </button>
  );
}