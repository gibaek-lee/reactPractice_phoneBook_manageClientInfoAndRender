/*일꾼(병1)역할
[정보 박싱]
1.PhoneInfoList가 넘겨준 info객체 1개를 박싱하여 반환
[정보 삭제]
2.PhoneInfoList에게 받은 onRemove 바구니에 사용자 요청에 의해 삭제 버튼이 눌린 정보의 id를 담아 보내기
[정보 수정]
3.PhoneInfoList에게 받은 onUpdate 바구니에 사용자 요청에 의해 수정된 id, data를 담아 보내기
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

  state = {
    name: '',
    phone: '',
    editing: false
  }

  handleRemove = () => {
    const {info, onRemove } = this.props;
    onRemove(info.id);
  }
  handleRevise = (e) => {
    this.setState({
      editing: true
    })
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    const {info, onRemove, onUpdate} = this.props;
    let data = {};
    if(!this.state.name && this.state.phone){
      data = {
        name: info.name,
        phone: this.state.phone
      }
    }else if(this.state.name && !this.state.phone){
      data = {
        name: this.state.name,
        phone: info.phone
      }
    }else if(this.state.name && this.state.phone){
      data = {
        name: this.state.name,
        phone: this.state.phone
      }
    }else{
      data = {
        name: info.name,
        phone: info.phone
      }
    }

    onUpdate(info.id,data);

    //초기화
    this.setState({
      name: '',
      phone: '',
      editing: false
    })
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

    if(this.state.editing){
      return (
        <div style={style}>
          <div>
            <input
              placeholder = "수정이름"
              value = {this.state.name}
              onChange = {this.handleChange}
              name = "name"
            />
          </div>
          <div>
            <input
              placeholder = "수정전화번호"
              value = {this.state.phone}
              onChange = {this.handleChange}
              name = "phone"
            />
          </div>
          <button onClick={this.handleRemove}>삭제</button>
          <button onClick={this.handleSubmit}>수정완료</button>
        </div>
      )
    }
    return (
      <div style={style}>
        <div><b>{name}</b></div>
        <div>{phone}</div>
        <button onClick={this.handleRemove}>삭제</button>
        <button onClick={this.handleRevise}>수정등록</button>
      </div>
    );
  }
}

export default PhoneInfo;
