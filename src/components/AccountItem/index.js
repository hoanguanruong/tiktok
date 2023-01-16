import PropTypes from 'prop-types';

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import Image from '~/components/Image';
const cx = classNames.bind(styles);

function AccountItem({ data }) {
  return (
    <Link to={`/@/${data.nickname}`} className={cx('wrapper')}>
      <Image className={cx('avatar')} src={data.thumb} alt={data.name} />
      <div className={cx('info')}>
        <p className={cx('name')}>
          <span>{data.name}</span>
          {data.special && <FontAwesomeIcon icon={faCheckCircle} className={cx('check')}></FontAwesomeIcon>}
        </p>
        <span className={cx('username')}>{data.description}</span>
      </div>
    </Link>
  );
}

AccountItem.propTypes = {
  // cái này dùng để validate kiểu dữ liệu dễ dàng debug
  data: PropTypes.object.isRequired,
};

export default AccountItem;
