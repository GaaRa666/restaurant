import { cloneDeep } from 'lodash';
import initialDishes from './initialDishes'

export default class Dishes {
  static _instance;

  constructor() {
    if (Dishes._instance) {
      return Dishes._instance;
    }
    Dishes._instance = this;
    this.dishes = cloneDeep(initialDishes)
  }

  save = (dish) => {
    const dishIndex = this.dishes.findIndex(d => d.id === dish.id)
    if (dishIndex === -1) {
      this.dishes.push(dish)
    } else {
      this.dishes.splice(dishIndex, 1, dish)
    }
    this.handleUpdate()
  }

  handleUpdate = () => {
    window.rootComponent.dishesChanged()
    window.rootComponent.forceUpdate()
  }
}
