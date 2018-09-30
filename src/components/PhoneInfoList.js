/* 일꾼(을2)역할
[정보전체 rendering]
1.information 배열 전체를 App으로부터 받아와서 박스list로 가공하여 반환
[정보 박싱]
2.information 배열 내의 객체 1개씩을 PhoneInfo에 넘겨서 박스로 만들게 시키기
[정보 삭제]
3.App에게 받은 onRemove 바구니를 PhoneInfo에게 넘기고 id 담게하여 회수하면 App에게 다시 주기
[정보 수정]
4.App에게 받은 onUpdate 바구니를 PhoneInfo에게 넘기고 id, data 담게하여 회수하면 App에게 다시 주기
[컴포넌트 리렌더링 최적화]
5.App에게 이전, 이후에 받은 data를 비교하여 다르면 rendering 수행, 같으면 수행하지 않음
*/

import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo';

class PhoneInfoList extends Component {
  static defaultProps = {
    data: [],
    onRevmoe: () => console.warn('onRemove not defined'),
    onUpdate: () => console.warn('onUpdate not defined'),
  }
  shouldComponentUpdate(nextProps, nextState) {
    /* API components 최적화
    부모컴포가 rendering되면 자식컴포도 rendering된다.
    App컴포의 검색 입력과정에서 data 변화가 없는데도 PhonInfoList의 VirtualDOM이 렌더링 된다.
    명확히 변화가 없는 이벤트에 대해서는 VirtualDOM을 그리는게 자원 낭비이므로
    shouldComponentUpdate API로 data를 비교해 return false일 때 VirtualDOM을 안그리게 한다.
    */
    return nextProps.data !== this.props.data
    /* 불변성을 지켰기 때문에 위 return 결과에 true가 나올 수 있다.
    App에서 information 배열을 직접수정하는 내장함수를 사용했다면
    이전과 이후 데이터가 같은 주소로 연결되어있어서 무조건 false가 나오게 된다.
    */
    /* trouble
    검색결과가 이전에도 없고 이후에도 없으면 둘 다 비어있는 배열이 오는 것인데
    이 경우 서로 같지 않은 데이터로 판단하고 return true가 되고 있다.
    */
  }
  render() {
    console.log('render PhoneInfoList');
    const { data, onRemove, onUpdate } = this.props;//App의 state.information : [{},{},...]
    const list = data.map(
      //고유값을 꼭 key로 사용해야 한다. 기본 index로 배정할 시 중간에 정보가 추가될 때 문제
      info => (
        <PhoneInfo
          key={info.id}
          info={info}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      )
      /* key가 없다면?
      //만일 key값이 없다면 위와 같이 할때 경고창 뜬다. 다음과 같이 하면 경고 없어진다.
      //하지만 성능은 key가 없는 것과 동일하다.
      (info, index) => (<PhoneInfo key={index} info={info}/>)
      */
    );

    return (
      <div>
        {list}
      </div>
    )
  }
}

export default PhoneInfoList;
