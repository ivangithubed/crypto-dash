import {Link} from 'react-router';

const Header = () => {
  return (
    <nav className='top-nav'>
      <Link to="/">Головна</Link>
      <Link to="/about">Про проджект</Link>
        {/* <Link to="/coin">Деталі монети</Link> */}
    </nav>
  );
};

export default Header;
