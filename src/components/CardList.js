import React from 'react';
import Card from './Card';
import  './CardList.scss'

class CardList extends React.Component {

  constructor() {
    super()
  }

  render() {
    return (
      <div className='card-list'>
          {
            this.props.cardList.map((card,i) =>
              <Card key={i} card={card}/>
            )
          }
      </div>
    );
  }
}

export default CardList
