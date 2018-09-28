/*일꾼(병1)역할
1.PhoneInfoList가 넘겨준 info객체 1개를 박싱하여 반환
2.PhoneInfoList에게 받은 onRemove 바구니에 사용자 요청에 의해 삭제 버튼이 눌린 정보의 id를 담아 보내기
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

  handleRemove = () => {
    const {info, onRemove } = this.props;
    onRemove(info.id);
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
        <button onClick={this.handleRemove}>삭제</button>
      </div>
    );
  }
}

export default PhoneInfo;
