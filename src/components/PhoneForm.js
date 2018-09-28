/*일꾼(을1)역할
[Client 정보 등록]
1.client input창을 화면에 띄우고 input event를 처리
2.client가 submit하면 객체로 만들어진  input 정보를 부모컴포넌트(App)에게 반환
*/

import React, { Component } from 'react';

class PhoneForm extends Component {
  state = {
    name: '',
    phone: ''
  }
  handleChange = (e) => {
    this.setState({//state의 값을 고치려면 무조건 this.setState를 거쳐야 한다.
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();//form tag에서 submit발생시 패이지 리로딩 방지

    //부모컴포에 정보 전달하기
    //1.부모컴포(App)에서 메소드(handleCreate)를 만들기
    //2.부모컴포가 전달한 메소드를 자식컴포(PhoneForm)에서 받아 호출
    //3.부모컴포로 자식컴포의 정보(this.state)를 전달한다.
    this.props.onCreate(this.state);
    //참고
    //1.props는 부모컴포가 자식컴포에게 주는 값. 자식은 받아온 props를 수정할 수 없다.
    //2.자식컴포가 받은 정보는 this.props로 조회할 수 있다.
    //3.defaultProps를 통해 props의 기본값을 설정해 놓을 수 있다.
    //4.state는 props와 다르게 컴포 내부에서 선언하며 내부에서 값 변경 가능하다.

    this.setState({
      name: '',
      phone: ''
    });
  }
  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder = "이름"
          value = {this.state.name}
          onChange = {this.handleChange}
          name = "name"
        />
        <input
          placeholder = "전화번호"
          value = {this.state.phone}
          onChange = {this.handleChange}
          name = "phone"
        />
        <button type="submit">등록</button>
        {/*<div>{this.state.name} {this.state.phone}</div>*/}
      </form>
    )
  }
}

export default PhoneForm;
