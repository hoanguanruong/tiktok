import React from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styled from 'styled-components';
import { useSpring, motion } from 'framer-motion';
import MenuItem from './MenuItem';
import styles from './Menu.module.scss'; // Load module scss của nó ra

const cx = classNames.bind(styles);

const Box = styled(motion.div)`
  border-radius: 4px;
`;

function Menu({ children, items = [] }) {
  const springConfig = { damping: 15, stiffness: 300 };
  const initialScale = 0.5;
  const opacity = useSpring(0, springConfig);
  const scale = useSpring(initialScale, springConfig);

  function onMount() {
    scale.set(1);
    opacity.set(1);
  }

  function onHide({ unmount }) {
    const cleanup = scale.onChange((value) => {
      if (value <= initialScale) {
        cleanup();
        unmount();
      }
    });

    scale.set(initialScale);
    opacity.set(0);
  }

  const renderItems = () => {
    return items.map((item, index) => <MenuItem key={index} data={item} />);
  };
  return (
    <Tippy
      interactive
      delay={[0, 1000]}
      placement="bottom-end"
      render={(attrs) => (
        <Box className={cx('menu_list')} style={{ scale, opacity }} tabIndex="-1" {...attrs}>
          <PopperWrapper className={cx('menu_popper')}>{renderItems()}</PopperWrapper>
        </Box>
      )}
      animation={true}
      onMount={onMount}
      onHide={onHide}
    >
      {children}
    </Tippy>
  );
}

export default Menu;
