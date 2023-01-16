import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ title, to, icon, activeIcon }) {
  return (
    <NavLink to={to} className={(nav) => cx('item_menu', { active: nav.isActive })}>
      <span className={cx('icon')}>{icon}</span>
      <span className={cx('active_icon')}>{activeIcon}</span>
      <span className={cx('title_item_menu')}>{title}</span>
    </NavLink>
  );
}

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

export default MenuItem;
