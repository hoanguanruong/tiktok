import classNames from 'classnames/bind';
import styles from './Menu.module.scss'; // Load module scss của nó ra
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function MenuItem({ data }) {
  return (
    <Button className={cx('menu_item')} leftIcon={data.icon} to={data.to}>
      {data.title}
    </Button>
  );
}

export default MenuItem;
