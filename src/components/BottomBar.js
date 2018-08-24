import { Component } from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import router from 'umi/router';
import styles from './bottombar.less';

class BottomBar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  static defaultProps = {
    bottomBarIsShow: true,
    indexOrder: 0,
  }
  handleClick = (item) => {
    switch (item) {
      case 'index':
      default:
        router.push('/home/');
        break;
      case 'order':
        router.push('/order/');
        break;
      case 'account':
        router.push('/mine/')
        break;
    }
  }
  renderItem = (item, index) => {
    const {indexOrder} = this.props;
    const zhText = ['主頁', '訂單', '帳戶'];
    const itemList = ['index', 'order', 'account'];
    if(item === itemList[indexOrder]) {
      return (<div key={item} className={`${styles.appNavCell} appNavPick`} onClick={(e)=>this.handleClick(item)}> 
      <h3 className={`app-nav-icon app-nav-${item}`}>{zhText[index]}</h3>
      <p className="app-nav-title">{zhText[index]}</p>
      </div>);
    } else {
      return (<div key={item} className={styles.appNavCell} onClick={()=> this.handleClick(item)}>
      <h3 className={`app-nav-icon app-nav-${item}`}>{zhText[index]}</h3>
      <p className="app-nav-title">{zhText[index]}</p></div>);
    }
  }
  render() {
    const { bottomBarIsShow } = this.props;
    const customClassName = bottomBarIsShow ? '' : 'none';
    const itemList = ['index', 'order', 'account'];
    const loop = data => data.map((item, index) => {
      return this.renderItem(item, index);
    })
    return (
      <div className={`${styles.appNavBox} ${customClassName}`}>
        {loop(itemList)}
      </div>
    );
  }
};

BottomBar.propType = {
  bottomBarIsShow: PropTypes.bool,
  indexOrder: PropTypes.number,
};

export default connect()(BottomBar);

