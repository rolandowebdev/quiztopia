const Input = ({ label, id, type, placeholder, forgotPassword }) => (
  <label htmlFor={id}>
    <span className="block mb-1 capitalize text-slate-900">{label}</span>
    <input
      type={type}
      id={id}
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
);

export default Input;
