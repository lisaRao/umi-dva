import { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import BottomBar from 'components/BottomBar';
import { localCache } from 'utils/cache';
import styles from './index.less';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOnLine: false,
    }
  }
  login = () => {
    // todo...
  }
  // 根据用户信息是否有判断是否已登录
  checkedLogin = () => {
    const userInfo = localCache.get('user');
    return Object.keys(userInfo).length < 0;
  }
  // 跳转
  toLink = (e, url, isneedLogin) => {
    // 简单处理如无登录则不跳转
    if(isneedLogin && this.checkedLogin()) return; 
    router.push(url);
  }
  render() {
    const {isOnLine} = this.state;
    return (
      <div className={styles.indexPage}>
        <section className={isOnLine ? "none" : "main-box mine-wall"}>
            <div className={styles.loginButton} onClick={()=> this.login}>登入或註</div>
        </section>
        <section className={styles.mineOption} >
          <ul className="account-menu">
            <li onClick={(e) => this.toLink(e, '/collect', true)}>
                <span className="mine-option-icon mine-option-collect">我的收藏</span>
                <span className="mine-option-arrow"></span>
            </li>
            <li onClick={(e) => this.toLink(e, '/coupon', false)} >
                <span className="mine-option-icon mine-option-coupon">我的優惠券</span>
                <span className="mine-option-arrow"></span>
            </li>
            <li onClick={(e) => this.toLink(e, '/custom', true)}>
                <span className="mine-option-icon mine-option-custom">我的客服</span>
                <span className="mine-option-arrow"></span>
            </li>
            <li onClick={(e) => this.toLink(e, '/advise', true)}>
                <span className="mine-option-icon mine-option-advise">意見反映</span>
                <span className="mine-option-arrow"></span>
            </li>
          </ul>
        </section>
        <BottomBar indexOrder={2} />
      </div>
    )
  }
}

export default connect()(Index);
