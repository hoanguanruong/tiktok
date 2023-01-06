import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind'; // Thư viện dùng để đặt tên class có dấu - vì trong jsx không đặt được tên có dấu -
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';

import 'tippy.js/dist/tippy.css';

import HeadlessTippy from '@tippyjs/react/headless'; // Giống như tooltip

import styled from 'styled-components';
import { useSpring, motion } from 'framer-motion';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Search.module.scss'; // Load module scss của nó ra
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/icons';

const cx = classNames.bind(styles); //Khai báo cx dùng để chạy classNames
const Box = styled(motion.div)`
  border-radius: 4px;
`;

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [showLoading, setLoading] = useState(false);

  const inputRef = useRef();

  const springConfig = { damping: 15, stiffness: 300 };
  const initialScale = 0.5;
  const opacity = useSpring(0, springConfig);
  const scale = useSpring(initialScale, springConfig);

  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResult([]); // xoá ký tự cuối cùng thì xoá luôn mảng
      return;
    }
    setLoading(true);
    fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(searchValue)}&type=less`)
      .then((res) => res.json())
      .then((res) => {
        setSearchResult(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [searchValue]);
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
  const handleClear = () => {
    setSearchValue('');
    setSearchResult([]);
    inputRef.current.focus(); // đoạn này dùng useRef để focus vào input mỗi lần xoá hết giá trị
  };
  const handleHideResult = () => {
    setShowResult(false); // Xử lý cho phần click ra ngoài ẩn tippy
  };
  return (
    <HeadlessTippy
      interactive
      visible={showResult && searchResult.length > 0}
      render={(attrs) => (
        <Box style={{ scale, opacity }} className={cx('search_result')} tabIndex="-1" {...attrs}>
          <PopperWrapper>
            <h4 className={cx('search_title')}>Account</h4>
            {searchResult.map((result) => (
              <AccountItem key={result.id} data={result} />
            ))}
          </PopperWrapper>
        </Box>
      )}
      animation={true}
      onMount={onMount}
      onHide={onHide}
      onClickOutside={handleHideResult}
    >
      <div className={cx('search')} spellCheck={false}>
        <input
          ref={inputRef}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          spellCheck={false}
          placeholder="Search accounts and videos"
          onFocus={() => setShowResult(true)} // hiển thị ô tìm kiếm khi mà click lại vào trong input
        />
        {!!searchValue && !showLoading && (
          <button className={cx('clear')} onClick={handleClear}>
            {/* Clear */}
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        )}

        {/* Loading */}
        {showLoading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
        <button className={cx('search_btn')}>
          {/* Search */}
          <SearchIcon />
        </button>
      </div>
    </HeadlessTippy>
  );
}

export default Search;
