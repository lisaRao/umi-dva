import { Component } from 'react';
import { connect } from 'dva';
import Header from 'components/Header';
import BottomBar from 'components/BottomBar';


class Home extends Component {
  render() {
    return (
      <div className="home-page">
        <Header titleTxt="首页" customStyle="has-bottom-border" />
        <div className="mian-body">这是首页</div>
        <BottomBar indexOrder={0} />
      </div>
    )
  }
}

export default connect()(Home);
