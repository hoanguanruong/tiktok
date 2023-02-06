import Proptypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label }) {
  return (
    <div className={cx('wrapper')}>
      <p className={cx('label')}>{label}</p>
      <AccountItem />
      <AccountItem />
      <AccountItem />
      <AccountItem />
      <p className={cx('more_button')}>See all</p>
    </div>
  );
}

SuggestedAccounts.propTypes = {
  label: Proptypes.string.isRequired,
};

export default SuggestedAccounts;
