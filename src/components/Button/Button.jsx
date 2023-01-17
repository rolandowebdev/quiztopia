const Button = ({ type, children }) => (
  <button type={type} className="p-3 mt-2 font-semibold tracking-wide text-white capitalize rounded-xl bg-primary">
    {children}
  </button>
);

export default Button;
