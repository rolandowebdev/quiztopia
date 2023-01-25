import { forwardRef } from 'react'

const Input = forwardRef(({ label, id, type, placeholder, ...rest }, ref) => (
  <label htmlFor={id}>
    <span className="block mb-[6px] capitalize">{label}</span>
    <div className="relative">
      <input
        type={type}
        id={id}
        ref={ref}
        placeholder={placeholder}
        className="block w-full p-3 bg-transparent outline-none ring-1 ring-gray-400 rounded-xl text-primary focus:ring-primary"
        required
        {...rest}
      />
    </div>
  </label>
))

export default Input
