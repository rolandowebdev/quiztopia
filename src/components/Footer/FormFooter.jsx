const FormFooter = ({ text, type }) => (
  <p>
    {text} <span className="font-semibold capitalize cursor-pointer text-primary hover:underline">{type}</span>
  </p>
);

export default FormFooter;
