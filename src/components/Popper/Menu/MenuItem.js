import classNames from 'classnames/bind';
import styles from './Menu.module.scss'; // Load module scss của nó ra
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
  const classes = cx('menu_item', {
    separate: data.separate,
  });
  return (
    <Button className={classes} leftIcon={data.icon} to={data.to} onClick={onClick}>
      {data.title}
    </Button>
  );
}

export default MenuItem;
