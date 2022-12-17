import classNames from 'classnames/bind'; // Thư viện dùng để đặt tên class có dấu - vì trong jsx không đặt được tên có dấu -
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss'; // Load module scss của nó ra
import images from '~/assets/images'; // Load Hình ảnh từ folder ra

const cx = classNames.bind(styles); //Khai báo cx dùng để chạy classNames

function Header() {
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        {/* logo */}
        <div className={cx('logo')}>
          <img src={images.logo} alt="tiktok" />
        </div>
        {/* search */}
        <div className={cx('search')} spellCheck={false}>
          <input placeholder="Tìm kiếm tài khoản và video" />

          <button className={cx('clear')}>
            {/* Clear */}
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
          {/* Loading */}
          <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
          <button className={cx('search_btn')}>
            {/* Search */}
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        {/* Action */}
        <div className={cx('action')}></div>
      </div>
    </header>
  );
}

export default Header;
