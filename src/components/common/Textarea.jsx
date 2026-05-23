export default function Textarea({

  value,

  onChange,

  placeholder = "",

  className = "",

  onClick,

  onKeyUp,

}) {

  return (
    <textarea
      value={value}
      onChange={onChange}
      onClick={onClick}
      onKeyUp={onKeyUp}
      placeholder={placeholder}
      className={`
        w-full
        h-64
        md:h-96
        p-4
        rounded-xl
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        text-[var(--color-text)]
        placeholder:text-zinc-500
        font-mono
        outline-none
        focus:ring-2
        focus:ring-[var(--color-primary)]
        resize-y
        transition-all
        ${className}
      `}
    />
  );
}