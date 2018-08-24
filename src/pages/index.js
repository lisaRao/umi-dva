import {Component} from 'react';
import { connect } from 'dva';
import Home from './home/components/home'
class IndexPage extends Component {
  render() {
    return (
      <div> <Home /></div>    
    )
  }
} 

export default connect()(IndexPage); 