/*일꾼(병1)역할
[정보 박싱]
1.PhoneInfoList가 넘겨준 info객체 1개를 박싱하여 반환
[정보 삭제]
2.PhoneInfoList에게 받은 onRemove 바구니에 사용자 요청에 의해 삭제 버튼이 눌린 정보의 id를 담아 보내기
[client 수정요청 등록]
3.client에게 수정 정보 수집하기
4.PhoneInfoList에게 받은 onUpdate 바구니에 client 요청에 의해 수정된 id, data를 담아 보내기
[컴포넌트 리렌더링 최적화]
5.edit 상태가 아니고, PhoneInfoList에게 이전/이후에 받은 info를 비교하여 다르면 rendering 수행, 같으면 수행하지 않음
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
  /*handleRevise = () => {
    this.setState({
      editing: true
    });
  }*/
  handleToggleEdit = () => {//handleRevise와 handleSubmit => handleToggleEdit와 componentDidUpdate
    const { editing } = this.state;
    this.setState({
      editing: !editing
    });
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }
  /*handleSubmit = (e) => {
    const {info, onUpdate} = this.props;
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

    //초기화 -> toggle로 처리
    this.setState({
      name: '',
      phone: '',
      editing: false
    })
  }*/
  componentDidUpdate(prevProps, prevState) {
    //component API. 컴포넌트에서 render 호출하면 그 다음에 자동으로 실행됨
    const { info, onUpdate } = this.props;

    if(!prevState.editing && this.state.editing){//수정등록 클릭했을 때
      this.setState({
        name: info.name,
        phone: info.phone
      })
    }

    if(prevState.editing && !this.state.editing){//수정완료 클릭했을 때
      this.setState({
         name: this.state.name,
         phone: this.state.phone
      })
      onUpdate(info.id,{
        name: this.state.name,
        phone: this.state.phone
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    /* API component 최적화
    새로운 정보가 아니면 렌더링 하지 않는다.
    */
    if( !this.state.editing
      && !nextState.editing
      && this.props.info === nextProps.info
    ) return false
    return true
  }

  render() {
    console.log('render PhoneInfo' + this.props.info.id);

    const style = {
      border: '1px solid black',
      padding: '8px',
      margin: '8px'
    };

    const { editing } = this.state;

    if(editing){
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
          <button onClick={this.handleToggleEdit}>수정완료</button>
          {/*<button onClick={this.handleSubmit}>수정완료</button>*/}
        </div>
      )
    }

    const {//비구조화 할당
      name, phone
    } = this.props.info;

    return (
      <div style={style}>
        <div><b>{name}</b></div>
        <div>{phone}</div>
        <button onClick={this.handleRemove}>삭제</button>
        <button onClick={this.handleToggleEdit}>수정등록</button>
        {/*<button onClick={this.handleRevise}>수정등록</button>*/}
      </div>
    );
  }
}

export default PhoneInfo;
