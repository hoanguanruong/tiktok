import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
  className,
  to,
  href,
  primary = false,
  outline = false,
  rounded = false,
  small = false,
  large = false,
  text = false,
  disabled = false,
  leftIcon,
  rightIcon,
  children,
  onClick,
  ...passProps
}) {
  let Comp = 'button';
  const props = { onClick, ...passProps };

  // remove event when button disable
  if (disabled) {
    Object.keys(props).forEach((keys) => {
      if (keys.startsWith('on') && typeof props[keys] === 'function') {
        delete props[keys];
      }
    });
  }
  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = 'a';
  }

  const classes = cx('wrapper', { [className]: className, primary, outline, rounded, small, large, text, disabled });
  return (
    <Comp className={classes} {...props}>
      {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
      <span className={cx('title')}>{children}</span>
      {rightIcon && <span className={cx('icon')}></span>}
    </Comp>
  );
}

export default Button;
