import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useSpring, motion } from 'framer-motion';
import styled from 'styled-components';
// import Proptypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './SuggestedAccounts.module.scss';
import AccountPreview from './AccountPreview';

const cx = classNames.bind(styles);
const Box = styled(motion.div)`
  border-radius: 4px;
`;

function AccountItem() {
  const renderPreview = (props) => {
    return (
      <Box className={cx('preview')} style={{ scale, opacity }} tabIndex="-1" {...props}>
        <PopperWrapper>
          <AccountPreview />
        </PopperWrapper>
      </Box>
    );
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
  }
  return (
    <div>
      <Tippy
        interactive
        delay={[800, 0]}
        placement="bottom-start"
        render={renderPreview}
        animation={true}
        onMount={onMount}
        onHide={onHide}
      >
        <div className={cx('account_item')}>
          <img
            className={cx('image')}
            src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1674021600&x-signature=BD%2BUqOQlB6DuO%2BpawhmBggNrhAY%3D"
            alt=""
          ></img>
          <div className={cx('item_info')}>
            <p className={cx('nickname')}>
              <strong>theanh28entertainment</strong>
              <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
            </p>
            <p className={cx('name')}>Theanh28 Entertainment</p>
          </div>
        </div>
      </Tippy>
    </div>
  );
}

// AccountItem.propTypes = {};

export default AccountItem;
