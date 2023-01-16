import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind'; // Thư viện dùng để đặt tên class có dấu - vì trong jsx không đặt được tên có dấu -
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import 'tippy.js/dist/tippy.css';

import HeadlessTippy from '@tippyjs/react/headless'; // Giống như tooltip

import styled from 'styled-components';
import { useSpring, motion } from 'framer-motion';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useDebounce } from '~/hooks';
import * as searchService from '~/services/searchService';
import styles from './Search.module.scss'; // Load module scss của nó ra
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';

const cx = classNames.bind(styles); //Khai báo cx dùng để chạy classNames
const Box = styled(motion.div)`
  border-radius: 4px;
`;

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [showLoading, setLoading] = useState(false);

  const debounced = useDebounce(searchValue, 500);

  const inputRef = useRef();

  const springConfig = { damping: 15, stiffness: 300 };
  const initialScale = 0.5;
  const opacity = useSpring(0, springConfig);
  const scale = useSpring(initialScale, springConfig);

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]); // xoá ký tự cuối cùng thì xoá luôn mảng
      return;
    }
    // setLoading(true);
    // // fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounced)}&type=less`)
    // axios
    //   .get(`https://bossstore.vn/index.php?route=api/search/getSearch`, {
    //     params: {
    //       search: debounced,
    //     },
    //   })
    //   .then((res) => {
    //     setSearchResult(res.data.products);
    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   });
    const fetchApi = async () => {
      setLoading(true);

      const result = await searchService.search(debounced);

      setSearchResult(result);
      setLoading(false);
    };
    fetchApi();
  }, [debounced]);

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

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };
  return (
    // dùng div để tippy không bị warning // Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.
    <div>
      <HeadlessTippy
        interactive
        visible={showResult && searchResult.length > 0}
        render={(attrs) => (
          <Box style={{ scale, opacity }} className={cx('search_result')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h4 className={cx('search_title')}>Account</h4>
              <div className={cx('search_value')}>
                {searchResult.map((result) => (
                  <AccountItem key={result.product_id} data={result} />
                ))}
              </div>
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
            onChange={handleChange}
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
          <button className={cx('search_btn')} /*onClick={handleSubmit}*/ onMouseDown={(e) => e.preventDefault()}>
            {/* Search */}
            <SearchIcon />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
