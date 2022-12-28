import classNames from 'classnames';
import { useState, forwardRef } from 'react';
import images from '~/assets/images';
import styles from './Image.module.scss';
const Image = forwardRef(({ src, alt, className, fallback: customFallback, ...props }, ref) => {
  // eslint-disable-next-line
  const [fallBack, setFallBack] = useState('');
  const handleError = () => {
    setFallBack(customFallback || images.noImage);
  };
  return (
    <img
      className={classNames(styles.wrapper, className)}
      ref={ref}
      src={fallBack || src}
      alt={alt}
      {...props}
      onError={handleError}
    />
  );
});

export default Image;
