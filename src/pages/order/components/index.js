import { Component } from 'react';
import { connect } from 'dva';
import Header from 'components/Header';
import BottomBar from 'components/BottomBar';


class Index extends Component {
  render() {
    return (
      <div className="home-page">
        <Header titleTxt="订单" customStyle="has-bottom-border" />
        <div className="mian-body">这是订单页</div>
        <BottomBar indexOrder={1} />
      </div>
    )
  }
}

export default connect()(Index);
