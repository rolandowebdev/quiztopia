import { Link } from 'react-router-dom'

export const NavigateLink = ({ textInfo, textLink, link, linkStyle }) => (
  <p className={linkStyle}>
    {textInfo}
    <Link to={link} className="ml-1 font-semibold capitalize cursor-pointer text-primary hover:underline">
      {textLink}
    </Link>
  </p>
)
