/*일꾼(병1)역할
1.PhoneInfoList가 넘겨준 info객체 1개를 박싱하여 반환
*/

import React, { Component } from 'react'

class PhoneInfo extends Component {
  static defaultProps = {
    info: {
      id: 0,
      name: '이름',
      phone: '010-0000-0000'
    }
  }

  render() {
    const style = {
      border: '1px solid black',
      padding: '8px',
      margin: '8px'
    };
    const {//비구조화 할당
      id, name, phone
    } = this.props.info;
    return (
      <div style={style}>
        <div><b>{name}</b></div>
        <div>{phone}</div>
      </div>
    );
  }
}

export default PhoneInfo;
