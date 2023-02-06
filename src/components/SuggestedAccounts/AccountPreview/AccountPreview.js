import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './AccountPreview.module.scss';

const cx = classNames.bind(styles);

function AccountPreview() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <img
          className={cx('image')}
          src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1674021600&x-signature=BD%2BUqOQlB6DuO%2BpawhmBggNrhAY%3D"
          alt=""
        ></img>
        <div>
          <Button primary>Follow</Button>
        </div>
      </div>
      <div className={cx('item_info')}>
        <p className={cx('nickname')}>
          <strong>theanh28entertainment</strong>
          <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
        </p>
        <p className={cx('name')}>Theanh28 Entertainment</p>
      </div>

      <p className={cx('analytic')}>
        <strong className={cx('value')}>8.2M</strong>
        <span className={cx('label')}>Followers</span>
        <strong className={cx('value')}>126K</strong>
        <span className={cx('label')}>Likes</span>
      </p>
    </div>
  );
}

export default AccountPreview;
