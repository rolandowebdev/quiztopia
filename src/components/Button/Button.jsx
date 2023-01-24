const Button = ({ type, children, value, ...rest }) => (
  <button
    type={type}
    className="p-3 mt-2 w-full font-semibold tracking-wide text-white hover:bg-[#3b47c2] capitalize cursor-pointer rounded-xl bg-primary"
    value={value}
    {...rest}>
    {children}
  </button>
);

export default Button;
