import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
  return (
    <div className={cx('wrapper')}>
      <img
        className={cx('avatar')}
        src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/249e92ce361eff93d1e2c6f34ce1cebb~c5_100x100.jpeg?x-expires=1671742800&x-signature=5RJiC2f8J8p48IqNowqymV8wYm4%3D"
        alt=""
      />
      <div className={cx('info')}>
        <p className={cx('name')}>
          <span>Nguyễn Ích Y Yét</span>
          <FontAwesomeIcon icon={faCheckCircle} className={cx('check')}></FontAwesomeIcon>
        </p>
        <span className={cx('username')}>Nguyễn A Bê Cê</span>
      </div>
    </div>
  );
}

export default AccountItem;
