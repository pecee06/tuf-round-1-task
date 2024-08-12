import { useId, forwardRef } from "react"

const Input = forwardRef(
  (
    {
      label = "",
      type = "text",
      error = {},
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const id = useId()

    return (
      <div className="flex flex-col gap-2 w-full">
        <div
          className="flex flex-col items-center"
        >
          <label htmlFor={id}>
            {label}
          </label>

          <div className="w-full flex items-center gap-2">
            <input
              ref={ref}
              style={{ borderBottom: "1px solid red" }}
              id={id}
              type={type}
              className={`w-[40vw] bg-transparent text-sm focus:outline-none focus:bg-amber-100 transition-all p-3 ${className}`}
              {...props}
            />
            {children}
          </div>
        </div>
        <p className="text-red-500 text-sm">{error?.message}</p>
      </div>
    )
  }
)

export default Input