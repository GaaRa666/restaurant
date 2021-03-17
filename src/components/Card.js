import React from 'react'
import './Card.scss'

class Card extends React.Component {

  constructor () {
    super()
  }

  render () {
    const card = this.props.card
    return(
      <div className='card'>
        <div className = 'card-type'>
          <span>MEAT</span>
          <span>{card.callory}</span>
        </div>
        <div className='card-name'>
          <span>{card.name}</span>
          <div className='card-name-marker'></div>  
        </div>
        <div className='card-description'>{card.description}</div>
      </div>
    )
  }
}

export default Card
