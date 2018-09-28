/*일꾼(을2)역할
1.information 배열 전체를 App으로부터 받아와서 박스list로 가공하여 반환
2.information 배열 내의 객체 1개씩을 PhoneInfo에 넘겨서 박스로 만들게 시키기
3.App에게 받은 onRemove 바구니를 PhoneInfo에게 넘기고 id 담게하여 회수하면 App에게 다시 주기
*/

import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo';

class PhoneInfoList extends Component {
  static defaultProps = {
    data: [],
    onRevmoe: () => console.warn('onRemove not defined')
  }

  render() {
    const { data, onRemove } = this.props;//App의 state.information : [{},{},...]
    const list = data.map(
      //고유값을 꼭 key로 사용해야 한다. 기본 index로 배정할 시 중간에 정보가 추가될 때 문제
      info => (
        <PhoneInfo
          key={info.id}
          info={info}
          onRemove={onRemove}
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
