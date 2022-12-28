import { useState } from 'react';
import classNames from 'classnames/bind'; // Thư viện dùng để đặt tên class có dấu - vì trong jsx không đặt được tên có dấu -
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleXmark,
  faSpinner,
  faMagnifyingGlass,
  faEllipsisVertical,
  faEarthAsia,
  faCircleQuestion,
  faKeyboard,
  faUpload,
  faUser,
  faCoins,
  faGear,
  faSignOut,
} from '@fortawesome/free-solid-svg-icons';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import HeadlessTippy from '@tippyjs/react/headless'; // Giống như tooltip

import styled from 'styled-components';
import { useSpring, motion } from 'framer-motion';

import Menu from '~/components/Popper/Menu';
import Button from '~/components/Button';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Header.module.scss'; // Load module scss của nó ra
import images from '~/assets/images'; // Load Hình ảnh từ folder ra
import AccountItem from '~/components/AccountItem';

const cx = classNames.bind(styles); //Khai báo cx dùng để chạy classNames
const Box = styled(motion.div)`
  border-radius: 4px;
`;

const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
    title: 'English',
    children: {
      title: 'Language',
      data: [
        {
          type: 'Language',
          code: 'en',
          title: 'English',
        },
        {
          type: 'Language',
          code: 'vi',
          title: 'Tiếng Việt',
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: 'Feedback & help',
    to: '/feedback',
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: 'Keyboard shorcuts',
  },
];
function Header() {
  const currentUser = true;
  const [searchResult, setsearchResult] = useState([]);

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
  // Handle logic
  const handleMenuChange = (menuItem) => {
    switch (menuItem.type) {
      case 'language':
        // Handle Change
        break;
      default:
    }
  };

  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'View profile',
      to: '/@Hoaa',
    },
    {
      icon: <FontAwesomeIcon icon={faCoins} />,
      title: 'Get coins',
      to: '/coin',
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: 'Settings',
      to: '/settings',
    },
    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faSignOut} />,
      title: 'Log out',
      to: '/logout',
      separate: true,
    },
  ];
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        {/* logo */}
        <div className={cx('logo')}>
          <img src={images.logo} alt="tiktok" />
        </div>
        {/* search */}
        <HeadlessTippy
          interactive
          visible={searchResult.length > 0}
          render={(attrs) => (
            <Box style={{ scale, opacity }} className={cx('search_result')} tabIndex="-1" {...attrs}>
              <PopperWrapper>
                <h4 className={cx('search_title')}>Account</h4>
                <AccountItem />
                <AccountItem />
                <AccountItem />
                <AccountItem />
              </PopperWrapper>
            </Box>
          )}
          animation={true}
          onMount={onMount}
          onHide={onHide}
        >
          <div className={cx('search')} spellCheck={false}>
            <input onChange={(e) => setsearchResult(e.target.value)} placeholder="Tìm kiếm tài khoản và video" />

            <button className={cx('clear')}>
              {/* Clear */}
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            {/* Loading */}
            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

            <button className={cx('search_btn')}>
              {/* Search */}
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </HeadlessTippy>

        {/* Kiểm tra trạng thái đăng nhập */}
        <div className={cx('action')}>
          {currentUser ? (
            <>
              <Tippy delay={(0, 200)} content="Upload video" placement="bottom">
                <button className={cx('action_btn')}>
                  <FontAwesomeIcon icon={faUpload} />
                </button>
              </Tippy>
            </>
          ) : (
            // Action
            <>
              <Button outline text>
                Upload
              </Button>
              <Button primary>Log In</Button>
            </>
          )}

          <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
            {currentUser ? (
              <img
                className={cx('image_user')}
                alt="Nguyễn văn C"
                src="https://cdn-upmostlymulti.pressidium.com/wp-content/uploads/james-dietrich-100x100.jpeg"
              />
            ) : (
              <button className={cx('more_btn')}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
