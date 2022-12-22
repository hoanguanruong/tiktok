import React from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Menu.module.scss'; // Load module scss của nó ra
import styled from 'styled-components';
import { useSpring, motion } from 'framer-motion';

const cx = classNames.bind(styles);

const Box = styled(motion.div)`
  border-radius: 4px;
`;

function Menu({ children }) {
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

  return (
    <Tippy
      interactive
      placement="bottom-end"
      render={(attrs) => (
        <Box style={{ scale, opacity }} className={cx('menu_item_more')} tabIndex="-1" {...attrs}>
          <PopperWrapper>
            <h2>Menu Item</h2>
          </PopperWrapper>
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
