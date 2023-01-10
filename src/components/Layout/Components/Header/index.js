import classNames from 'classnames/bind'; // Thư viện dùng để đặt tên class có dấu - vì trong jsx không đặt được tên có dấu -
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import Menu from '~/components/Popper/Menu';
import Button from '~/components/Button';

import styles from './Header.module.scss'; // Load module scss của nó ra
import images from '~/assets/images'; // Load Hình ảnh từ folder ra
import routes from '~/config/routes';
import Image from '~/components/Image';
import Search from '../Search';
import {
  LanguageIcon,
  GetCoinIcon,
  KeyboardIcon,
  InboxIcon,
  LogOutIcon,
  MessageIcon,
  SettingIcon,
  UploadIcon,
  ViewProfileIcon,
  FeedBackIcon,
} from '~/components/icons';

const cx = classNames.bind(styles); //Khai báo cx dùng để chạy classNames

const MENU_ITEMS = [
  {
    icon: <LanguageIcon />,
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
    icon: <FeedBackIcon />,
    title: 'Feedback & help',
    to: '/feedback',
  },
  {
    icon: <KeyboardIcon />,
    title: 'Keyboard shorcuts',
  },
];
function Header() {
  const currentUser = true;

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
      icon: <ViewProfileIcon />,
      title: 'View profile',
      to: '/@Hoaa',
    },
    {
      icon: <GetCoinIcon />,
      title: 'Get coins',
      to: '/coin',
    },
    {
      icon: <SettingIcon />,
      title: 'Settings',
      to: '/settings',
    },
    ...MENU_ITEMS,
    {
      icon: <LogOutIcon />,
      title: 'Log out',
      to: '/logout',
      separate: true,
    },
  ];
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        {/* logo */}
        <Link to={routes.home} className={cx('logo')}>
          <img src={images.logo} alt="tiktok" />
        </Link>
        {/* search */}
        <Search />

        {/* Kiểm tra trạng thái đăng nhập */}
        <div className={cx('action')}>
          {currentUser ? (
            <>
              <Tippy delay={(0, 200)} content="Upload video" placement="bottom">
                <button className={cx('action_btn')}>
                  <UploadIcon />
                </button>
              </Tippy>
              <Tippy delay={(0, 200)} content="Messages" placement="bottom">
                <button className={cx('action_btn')}>
                  <MessageIcon />
                </button>
              </Tippy>
              <Tippy delay={(0, 200)} content="Inbox" placement="bottom">
                <button className={cx('action_btn')}>
                  <InboxIcon />
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
              <Image
                className={cx('image_user')}
                alt="Nguyễn văn C"
                src="https://cdn-upmostlymulti.pressidium.com/wp-content/uploads/james-dietrich-100x100.jpeg"
                fallback="http://localhost:3000/logo192.png"
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
