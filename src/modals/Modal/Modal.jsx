import React from "react"
import DishModal from '../DishModal/DishModal'
import './Modal.scss'

class Modal extends React.Component {
  constructor() {
    super()
    window.showModal = this.showModal
    window.hideModal = this.hideModal
  }
  showModal = () => {
    this.activeModal = DishModal
    window.rootComponent.forceUpdate()
  }
  hideModal = () => {
    this.activeModal = null
    window.rootComponent.forceUpdate()
  }
  render () {
    const ActiveModal = this.activeModal
    return (
      <section className='modal-root'>
        {
          this.activeModal && (
            <div className='modal'>
              <div className='modal-content'>
                <ActiveModal></ActiveModal>
              </div>
            </div>
          )
        }
      </section>
    )
  }
}

export default Modal
