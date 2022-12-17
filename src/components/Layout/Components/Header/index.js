import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);
console.log(images.logo);
function Header() {
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        {/* logo */}
        {/* <div className={cx('logo')}>{images.logo}</div> */}
        <img src={images.logo} alt="tiktok" />
        {/* search */}
        {/* tool */}
      </div>
    </header>
  );
}

export default Header;
