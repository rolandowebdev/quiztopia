const Button = ({ type, children, ...rest }) => (
  <button
    type={type}
    className="p-3 mt-2 font-semibold tracking-wide text-white hover:bg-[#3b47c2] capitalize cursor-pointer rounded-xl bg-primary"
    {...rest}>
    {children}
  </button>
);

export default Button;
