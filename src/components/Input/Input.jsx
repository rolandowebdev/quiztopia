import { forwardRef } from 'react';

const Input = forwardRef(({ label, id, type, placeholder, forgotPassword }, ref) => (
  <label htmlFor={id}>
    <span className="block mb-1 capitalize text-slate-900">{label}</span>
    <input
      type={type}
      id={id}
      ref={ref}
      placeholder={placeholder}
      className="block w-full p-3 bg-transparent outline-none ring-1 ring-gray-400 rounded-xl text-primary focus:ring-primary"
      required
    />
    {forgotPassword && (
      <span className="block mt-1 font-semibold text-right cursor-pointer text-primary hover:underline">
        Forgot Password?
      </span>
    )}
  </label>
));

export default Input;
