import { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { ListView } from 'antd-mobile';
import Header from 'components/Header';
import styles from './index.less';

// 优惠券状态 0已使用 1待投放、2待领取、3待使用、4已失效、5已过期、
const couponCNStatus = ['已使用', '待投放', '待领取', '待使用', '已失效', '已过期'];

class History extends Component {
  constructor(props) {
    super(props); 
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource: dataSource.cloneWithRows([]),
      disabled: true,
      useBodyScroll: true,
      pageSize: 100,
    }
  }
  handleLeftClick = () => {
    router.goBack();
  }
  onRenderFooter = () => {
    const { list, pageSize} = this.props;
    // 判断是否显示加载更多
    return list.length > 0 && list.length > pageSize ? <div style={{ textAlign: 'center' }}>'正在加載更多數據...'</div> : <div style={{ textAlign: 'center' }}><div className="coupon-buttom"><p className="no-more">沒有更多券了！</p></div></div>;
  }
  onEndReached = () => {
    const { loading, page, pageSize, list, dispatch } = this.props;
    if (loading) return false;
    // 判断是否需要翻页
    if(list.length < pageSize) return;
    // 请求数据
    dispatch({ type: 'coupon/getHistoryCoupon', payload: { _page: page + 1, _pageSize: 100} })
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
  render() {
    const { list, total, code } = this.props;
    const { dataSource, useBodyScroll, pageSize } = this.state;
    const row = rowData => {
      const statusCode = rowData.code_status ? rowData.code_status : 0;
      return (<li key={`${rowData.code}`} className="disable-use">
        <div className="coupon-info">
          <p className="coupon-status expire">{couponCNStatus[statusCode]}</p>
          {this.filterCouponMoney(rowData)}
          <div className="coupon-use-info">
            <h3 className="coupon-card-title">{rowData.coupon_name}</h3>
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
        <Header titleTxt="歷史優惠券" customStyle="has-bottom-border" handleLeftClick={this.handleLeftClick} />
        <div className={`${styles.lightGray} ${styles.couponPage}`}>
          <div className={styles.couponList}>
            { list ? (code === 0 && total > 0 ? renderList() : <div className={styles.noContent}><p className={styles.noContentIco}></p><p className={styles.txt}>您未有優惠券</p></div>): null }
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { couponHistoryList, historyData, historyCode } = state.coupon;
  const data = historyData ? {
    total: historyData.total,
    page: historyData.page,
    pageSize: historyData.pageSize,
  }: {};
  return {
    ...data,
    list: couponHistoryList,
    code: historyCode,
    loading: state.loading.models.coupon,
  };
}

export default connect(mapStateToProps)(History);