/* React tutorial - Velopert
누구든지 하는 리액트 7편: 배열 다루기 (1)생성과 렌더링
https://velopert.com/3636
누구든지 하는 리액트 8편: 배열 다루기 (2)제거와 수정
https://velopert.com/3638
누구든지 하는 리액트 9편: 불변성, 업데이트 최적화
https://velopert.com/3640
*/

/*중앙관리자(갑)역할
[Client 정보 등록]
1.PhoneForm에게 client로부터 들어온 정보 받을 바구니(onCreate) 넘기기
2.PhoneForm이 보낸 바구니에 담긴 정보를 information배열에 추가
[정보전체 rendring]
3.PhoneInfoList에게 현재 information배열을 넘겨서 박스list로 만들어주라고 주문하기
4.PhoneInfoList에게 박스list 받으면 화면에 표시하기
[정보 삭제]
5.PhoneInfoList에게 삭제할 id 담을 바구니(onRemvoe) 넘기기
6.PhoneInfoList가 보낸 삭제할 id 정보로 information filtering 수행
[정보 수정]
7.PhoneInfoList에게 수정할 id와 data 담은 바구니(onUpdate) 넘기기
8.PhoneInfoList가 보낸 수정할 id, data 정보로 information mapping 수행
*/

import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {
  id = 2 //렌더 되는것과 상관 없는 변수는 state에 넣을 필요 없다.
  state = {
    information : [
      {
        id: 0,
        name: '이철수',
        phone: '010-0000-0000'
      },
      {
        id: 1,
        name: '홍길동',
        phone: '010-0000-0001'
      },
    ],
    keyword: ''
  }
  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({ id: this.id++, ...data })
      /* 불변성 유지
      : react에서 state 내부 값은 직접적으로 형태를 변경시키면 안된다.
       -부적절(배열직접수정 내장함수): push, splice, unshift, pop, etc
       -적절(기존배열에 기반하여 새 배열 생성): concat, slice, map, filter, etc
      */
    })
  }
  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter( info => info.id !== id )
    })
  }
  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map(
        info => info.id === id
          ? {...info, ...data} //merge obj via spread syntax
          : info
      )
    })
  }
  handleChange = (e) => {
      this.setState({
        keyword : e.target.value
      })
  }
  render() {
    const { information, keyword } = this.state;
    // information rendering을 PhoneInfoList 컴포넌트에게 할당
    const filteredList = information.filter(
      info => info.name.indexOf(keyword) !== -1
      /* indexOf의 default return = 0 이므로
      입력값이 없으면 information 정보 전체를 filteredList에 반환한다.
      */
    );
    return (
      <div>
        <PhoneForm
          onCreate={this.handleCreate}
        />
        <p>
          <input
            placeholder = "검색 키워드"
            value = {keyword}
            onChange = {this.handleChange}
            name = "keyword"
          />
        </p>
        <hr />
        <PhoneInfoList
          data={filteredList}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );

    /* PhoneInfoList 없이 단순히 state.information 화면에 보여주기
    const { information } = this.state;
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate}/>
        {JSON.stringify(information)}
      </div>
    )
    */
  }
}

export default App;
