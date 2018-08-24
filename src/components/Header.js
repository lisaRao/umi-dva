import { Component } from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import { NavBar, Icon } from 'antd-mobile';
import router from 'umi/router';
import styles from './header.less';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  static defaultProps = {
    customStyle: 'default',
    titleTxt: 'title',
    mode: 'light',
    icon: <Icon type="left" />,
    handleLeftClick: this.handleLeftClick, 
    hasLeftIcon: true, 
  }

  handleLeftClick = () => {
    router.go(-1);
  }
  
  render() {
    const { customStyle, mode, icon, handleLeftClick, rightContent, titleTxt, hasLeftIcon } = this.props;
    return (
      <div className={`${styles.commonHeaders} ${customStyle}`}>
        <NavBar
          mode={mode}
          icon={hasLeftIcon ? icon : ''}
          onLeftClick={handleLeftClick}
          rightContent={rightContent}
        >
          {titleTxt}
        </NavBar>
      </div>
    );
  }
};

Header.propType = {
  customStyle: PropTypes.string,
  titleTxt: PropTypes.string.isRequired,
  mode: PropTypes.string,
  icon: PropTypes.node,
  handleLeftClick: PropTypes.func,
  rightContent: PropTypes.any,
  hasLeftIcon: PropTypes.bool,
};

export default connect()(Header);

