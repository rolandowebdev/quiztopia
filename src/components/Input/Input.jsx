import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

const Input = forwardRef(({ label, id, type, placeholder, forgotPassword, ...rest }, ref) => (
  <label htmlFor={id}>
    <span className="block mb-[6px] capitalize">{label}</span>
    <input
      type={type}
      id={id}
      ref={ref}
      placeholder={placeholder}
      className="block w-full p-3 bg-transparent outline-none ring-1 ring-gray-400 rounded-xl text-primary focus:ring-primary"
      required
      {...rest}
    />
    {forgotPassword && (
      <Link
        to="/forgot-password"
        className="block mt-1 font-semibold text-right cursor-pointer text-primary hover:underline">
        Forgot Password?
      </Link>
    )}
  </label>
));

export default Input;
