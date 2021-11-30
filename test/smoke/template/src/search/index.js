import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from '../images/a_05.jpg';

// import "../../common/index"
import { a } from './tree-shaking'
// import './search.less';
if (false) {
  const funa = a();
}
class Search extends Component {
  constructor() {
    super()
    this.state = {
      Text: null
    }
  }
  loadCom () {
    console.log(111)
    const thia = this
    import('./text.js').then((Text) => {
      thia.setState({
        text: Text.default
      })
    })
  }
  render () {
    const { Text } = this.state;
    return <div className='search'>
      查看!!!s是么我想回家 {
        Text ? <Text /> : null
      }
      <img src={logo} onClick={this.loadCom.bind(this)} />
    </div>
  }
}

ReactDOM.render(
  <Search />,
  document.getElementById('root')
)