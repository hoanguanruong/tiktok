import React, { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styled from 'styled-components';
import { useSpring, motion } from 'framer-motion';
import { Wrapper as PopperWrapper } from '~/components/Popper';

import MenuItem from './MenuItem';
import Header from './Header';
import styles from './Menu.module.scss'; // Load module scss của nó ra

const cx = classNames.bind(styles);

const Box = styled(motion.div)`
  border-radius: 4px;
`;
const defaultFn = () => {};

function Menu({ children, items = [], onChange = defaultFn }) {
  const [history, setHistory] = useState([{ data: items }]);
  const current = history[history.length - 1];

  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children; // Convert Bool
      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => {
            if (isParent) {
              setHistory((prev) => [...prev, item.children]);
            } else {
              onChange(item);
            }
          }}
        />
      );
    });
  };

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
    setTimeout(() => {
      setHistory((prev) => prev.slice(0, 1));
    }, 500);
  }
  return (
    <Tippy
      interactive
      delay={[0, 1000]}
      offset={[12, 8]}
      placement="bottom-end"
      render={(attrs) => (
        <Box className={cx('menu_list')} style={{ scale, opacity }} tabIndex="-1" {...attrs}>
          <PopperWrapper className={cx('menu_popper')}>
            {history.length > 1 && (
              <Header title="Language" onBack={() => setHistory((prev) => prev.slice(0, prev.length - 1))} />
            )}
            {renderItems()}
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
