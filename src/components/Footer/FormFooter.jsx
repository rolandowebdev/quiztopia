import { Link } from 'react-router-dom';

const FormFooter = ({ textInfo, textLink, link }) => (
  <p>
    {textInfo}{' '}
    <Link to={link} className="font-semibold capitalize cursor-pointer text-primary hover:underline">
      {textLink}
    </Link>
  </p>
);

export default FormFooter;
