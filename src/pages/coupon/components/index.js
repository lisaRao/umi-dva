import { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { InputItem, Button, List, ListView, Toast } from 'antd-mobile';
import Header from 'components/Header';
import styles from './index.less';
import { localCache } from 'utils/cache';

class Index extends Component {
  constructor(props) {
    super(props);
    const query = router.location.query && Object.keys(router.location.query).length > 0 ? router.location.query: '';  
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource: dataSource.cloneWithRows([]),
      disabled: true,
      useBodyScroll: true,
      pageSize: 100,
      inputValue: '',
      pageType: query.from,
      verdorsId: query.vendors_id,
      baksheeshCount: query.baksheesh,
      selectedCouponCode: '',
    }
  }
  componentDidMount = ()=> {
    const { pageType } = this.state;
    if (pageType && pageType === 'cart') {
      const coupon = localCache.get('couponInfo');
      if (coupon) this.setState({ selectedCouponCode: coupon.coupon_user_code, cacheCoupon: coupon });
    }
  }
  handleLeftClick = () => {
    router.goBack();
  }
  onchange = (value) => {
    const inputValueLen = value.length;
    if (inputValueLen > 0) {
      if (this.state.disabled) {
        this.setState({ disabled: false });
      }
    } else {
      if (!this.state.disabled) this.setState({ disabled: true });
    }
  }
  onblur = (value) => {
    this.setState({ inputValue: value });
  }
  addHandle = (e) => {
    e.preventDefault();
    const value = this.state.inputValue;
    console.log(value);
    this.props.dispatch({ type: 'coupon/add', payload: {code: value}, toast: Toast});    
  }
  onRenderFooter = () => {
    const {list, pageSize} = this.props;
    // 判断是否显示加载更多
    return list.length > 0 && list.length > pageSize ? <div style={{ textAlign: 'center' }}>'正在加載更多數據...'</div> : <div style={{ textAlign: 'center' }}><div className="coupon-buttom"><p className="no-more">沒有更多券了！</p></div></div>;
  }
  onEndReached = () => {
    // 暂不需要
    // const { loading, page, pageSize, list, dispatch } = this.props;
    // if (loading) return false;
    // // 判断是否需要翻页
    // if(list.length < pageSize) return;
    // // 请求数据
    // dispatch({ type: 'coupon/getCoupon', payload: { _page: page + 1, _pageSize: 100, orderby: 'date'} })
  };

  // 优惠多少钱和 折扣度区分显示 根据coupon_type
  filterCouponMoney = (item) => {
    let moneyDom;
    // 优惠金额
    if (item.coupon_type === 1) {
      moneyDom = (<h3 className="coupon-money">
        <span>$</span> <em>{item.coupon_type_value.toFixed(0)}</em>
      </h3>);
    }
    // 折扣额度
    if (item.coupon_type === 2) {
      // 整数显示
      let num1, num2;
      if (item.coupon_type_value % 1 === 0) {
        moneyDom = (<h3 className="coupon-money">
          <em>{item.coupon_type_value}</em><i>折</i>
        </h3>);
      } else {
        num1 = item.coupon_type_value.toFixed(1).toString().split('.')[0];
        num2 = item.coupon_type_value.toFixed(1).toString().split('.')[1];
        moneyDom = (<h3 className="coupon-money">
          <em>{num1}</em>.<i className="decimal">{num2}</i><i> 折 </i>
        </h3>);
      }
    }
    return moneyDom;
  }
  // 点击选中
  clickhandle = (coupon) => {
    // 如果是 我的——優惠券 則不可點擊
    if ((!coupon.is_discount && this.state.pageType === 'cart')||(!this.state.pageType) ) return;
    this.setState({ selectedCouponCode: coupon.coupon_user_code });
    let _coupon = localCache.get('couponInfo');
    _coupon = Object.assign({}, _coupon, coupon);
    localCache.set('couponInfo', _coupon);
    if(localCache.get('noCoupon')) localCache.remove('noCoupon');
    setTimeout(() => {
      router.goBack();
    }, 10);
  }
  // 移除 storange中的缓存
  noSelectedCoupon = () => {
    const nocoupon = {
      hasCoupon: false,
      verdorsId: this.state.verdorsId
    };
    localCache.set('noCoupon', nocoupon);
    setTimeout(() => {
      router.goBack();
    }, 10);
  }
  // 查看历史优惠券
  viewHistory = () => {
    router.push('/coupon/history');
  }

  render() {
    const { list, total, code } = this.props;
    const { dataSource, useBodyScroll, pageSize, pageType, selectedCouponCode } = this.state;
    const noCoupon = localCache.get('noCoupon');
    let isCouponInfo = true;
    if(noCoupon && noCoupon.verdorsId === this.state.verdorsId) {
      isCouponInfo = noCoupon.hasCoupon;
    }
    const historyRender = (pageType && pageType === 'cart') ? null : <a className="go-history-coupon" onClick={this.viewHistory}> 查看過往優惠券> </a>;
    const noSelected = (pageType && pageType === 'cart') ? <div className="buttom-block" onClick={this.noSelectedCoupon}>不使用優惠券</div>: null;
    const row = rowData => {
      return (<li key={`${rowData.coupon_user_code}`} onClick={(e) => this.clickhandle(e, rowData)} className={!rowData.is_discount && pageType === 'cart' ? 'disable-use grayscale' : 'default'}>
        <div className="coupon-info" >
        {rowData.coupon_user_code === selectedCouponCode && isCouponInfo ? (<p className="coupon-status selected">selected</p>) : null} 
          {this.filterCouponMoney(rowData)}
          <div className="coupon-use-info">
            <h3 className="coupon-card-title">{rowData.coupon_name
            }</h3>
            <p className="coupon-rule">滿${rowData.limit_money}可使用</p>
            <p className="validity-period">有效期至: {rowData.validity_period}</p>
            <div className="coupon-rule-desc">
              <p>適用規範:</p>
              <p>{rowData.canuse_tips}</p>
            </div>
          </div>
        </div>
      </li>);
    };
    const renderList = () => {
      return (
        <ul className="coupon-item-lists">
          <ListView
            key={useBodyScroll ? '0' : '1'}
            ref={el => this.lv = el}
            dataSource={dataSource.cloneWithRows(list)}
            renderRow={row}
            renderFooter={this.onRenderFooter}
            useBodyScroll={useBodyScroll}
            pageSize={pageSize}
            onEndReached={this.onEndReached}
          />
        </ul>
      );      
    }
    return (
      <div className={styles.homePage}>
        <Header titleTxt="我的優惠券" customStyle="has-bottom-border" handleLeftClick={this.handleLeftClick} />
        <div className={`${styles.lightGray} ${styles.couponPage}`}>
          <div className="add-coupon-box">
            <List>
              <InputItem
                placeholder="請輸入優惠券碼"
                name="coupon_code"
                onChange={this.onchange}
                onBlur={this.onblur}
                clear={true}
                ref={el => this.inputRef = el}
              ></InputItem>
            </List>
            <div className="addcode-button">
              <Button disabled={this.state.disabled} onClick={this.addHandle}>添加</Button>
            </div>
          </div>
          <div className={styles.couponList}>
            { code ? (code === 0 && total > 0 ? renderList() : <div className={styles.noContent}><p className={styles.noContentIco}></p><p className={styles.txt}>您未有優惠券</p></div>): null }
            {historyRender}
            {noSelected}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { couponList, couponData, listCode } = state.coupon;
  const data = couponData ? {
    total: couponData.total,
    page: couponData.page,
    pageSize: couponData.pageSize,
  }: {};
  return {
    data,
    code : listCode,
    list: couponList,
    loading: state.loading.models.coupon,
  };
}

export default connect(mapStateToProps)(Index);
