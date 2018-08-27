import { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { InputItem, Button, List, ListView, Toast } from 'antd-mobile';
import Header from 'components/Header';
import styles from './index.less';

class Index extends Component {
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
      inputValue: '',
      submiting: false,
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
    const { hasMore, currentPage, pageCount, isInit } = this.state;
    let footer = null;
    if(!isInit) {
      footer = <div style={{ textAlign: 'center' }}>
      {hasMore && currentPage < pageCount ? '正在加載更多數據...' : <div className="coupon-buttom"><p className="no-more">沒有更多券了！</p> </div>
      }
    </div>
    }
    return footer;
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
  render() {
    const { list, total } = this.props;
    const { dataSource, useBodyScroll, pageSize } = this.state;
    const row = rowData => {
      return (<li key={`${rowData.coupon_user_code}`} >
        <div className="coupon-info" > 
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
            {total && total > 1 ? renderList() : <div className="no-content"><p className="no-content-ico"></p><p className="txt">您未有優惠券</p></div>}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { list, total, page } = state.coupon;
  return {
    list,
    total,
    page,
    loading: state.loading.models.coupon,
  };
}

export default connect(mapStateToProps)(Index);
