import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss'; // Load module scss của nó ra

const cx = classNames.bind(styles);

function Header({ title, onBack }) {
  return (
    <header className={cx('header')}>
      <button className={cx('back_btn')} onClick={onBack}>
        <FontAwesomeIcon className={cx('back_icon')} icon={faChevronLeft} />
      </button>
      <h4 className={cx('header_title')}>{title}</h4>
    </header>
  );
}

export default Header;
