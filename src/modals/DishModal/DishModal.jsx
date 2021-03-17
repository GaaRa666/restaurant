import { sumBy, uniqueId } from "lodash";
import React from "react";
import { RestInput, RestTextArea } from 'src/components';
import "./DishModal.scss";

class DishModal extends React.Component {
  constructor() {
    super();
    this.dishName = ''
    this.dishDescription = ''
    this.ingridients = [
      { name: '', calory: '' }
    ]
  }
  handleChangeDishName = (val) => {
    this.dishName = val
    this.forceUpdate()
  }
  handleChangeDishDescription = (val) => {
    this.dishDescription = val
    this.forceUpdate()
  }
  handleChangeIngridientName = (val, index) => {
    this.ingridients[index].name = val
    console.log("this.ingridients[index].name", this.ingridients[index].name)
    console.log(" this.ingridients" , this.ingridients)
    this.forceUpdate()
  }
  handleChangeIngridientCalory = (val, index) => {
    this.ingridients[index].calory = val
    this.forceUpdate()
  }
  checkIsAllFieldFilled = () => {
    const isDishFilled = this.dishName && this.dishDescription
    return isDishFilled && this.ingridients.every(ing => ing.name && ing.calory)
  }
  getSumCalory = () => {
    return sumBy(this.ingridients, ing => +ing.calory)
  }
  saveToStore = () => {
    const newDish = {
      id: uniqueId(),
      name: this.dishName,
      description: this.dishDescription,
      callory: this.getSumCalory(),
      ingridients: this.ingridients,
    }
    window.dishStore.save(newDish)
    window.hideModal()
  }
  addIngredient = () => {
    this.ingridients.push({ name: '', calory: '' })
    this.forceUpdate()
  }
  deleteIngredient = (index) => {
    this.ingridients.splice (index,1)
    this.forceUpdate()
  }
  render() {
    const isAllFieldsFiled = this.checkIsAllFieldFilled()
    return (
      <div className="modal-frame" id="modalFrame">
        <div className="modal-frame-head">
          <h3 className="modal-frame-head-title">Add a new dish</h3>
          <p className="modal-frame-head-desc">Please enter all informations about your new dish</p>
        </div>
        <div className="modal-frame-content">
          <RestInput
            placeholder='Dish name'
            value={this.dishName}
            handleInput={this.handleChangeDishName}
          >
            <p className="name-max">Max. 50 ch</p>
          </RestInput>
          <RestTextArea
            className='modal-frame-content-textarea'
            placeholder='Dish description'
            value={this.dishDescription}
            handleInput={this.handleChangeDishDescription}
          >
            <p className="description-max">Max. 150 ch</p>
          </RestTextArea>
          <div className="ingridients-head">
            <h4 className='ingridients-head-title'>Ingredients</h4>
            <div className="add-new-ingridient" onClick = {this.addIngredient}>
              <span>Add a new ingredient</span>
              <img className="add-new-ingridient-image" src="/img/plus.svg" alt="" ></img>
            </div>
          </div>
          {
            this.ingridients.map((ingridient, index) => (
              <div className="ingridient-bar" key={index}>
                <img className="ingridient-bar-marker" src="/img/menu.svg" alt=""></img>
                <RestInput
                  className='name-ingredient'
                  placeholder='Ingredient name'
                  value={ingridient.name}
                  handleInput={(val) => this.handleChangeIngridientName(val, index)}
                >
                  <p className="name-max">Max. 50 ch</p>
                </RestInput>
                <RestInput
                  className='kcl'
                  placeholder='Weight (Kcl)'
                  value={ingridient.calory}
                  handleInput={(val) => this.handleChangeIngridientCalory(val, index)}
                ></RestInput>
                <div className="remove-ingridient" onClick = {() => this.deleteIngredient(index)}>
                  <img className="remove-ingridient-image" src="/img/dark-plus.svg" alt="" ></img>
                </div>
              </div>
            ))
          }

        </div>
        {
          isAllFieldsFiled && <div className = "modal-frame-output">
            <div className = "modal-frame-output-ingredient">
              <b>{this.ingridients.length} Ingredients</b> in your dish
            </div>
            <div className = "modal-frame-output-kcl">
              Total weight : <b>{this.getSumCalory()} Kcl</b>
            </div>
          </div>
        }
        {
            isAllFieldsFiled && <div className="modal-frame-buttom" onClick={this.saveToStore}>Add this dish to my menu</div>
        }
      </div>
    );
  }
}

export default DishModal;
