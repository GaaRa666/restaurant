import React from "react";
import CardList from "./components/CardList";
import Modal from "./modals/Modal/Modal";
import { RestInput } from 'src/components';

import DishesStore from "./store/Dishes";

import "./App.scss";

export default class extends React.Component {
  constructor() {
    super();
    this.search = '';
    window.dishStore = new DishesStore(this);
    this.dishesList = window.dishStore.dishes.slice(0);
  }

  searchDishAndIngredient = (val) => {
    this.search = val;
    this.dishesList = window.dishStore.dishes.slice(0);
    if (val) {
      this.dishesList = this.dishesList.filter(coord => 
        (coord.name.toLowerCase().includes(val.toLowerCase())) ||
        coord.ingridients.find(el => el.name.toLowerCase().includes(val.toLowerCase()))
      );
    }
    this.forceUpdate();
  }

  componentDidMount() {
    window.rootComponent = this;
    document.addEventListener("scroll", this.dishOverScrollHandler);
  }
  componentWillUnmount() {
    document.removeEventListener("scroll", this.dishOverScrollHandler);
  }

  dishesChanged = () => {
    // this.dishesList = window.dishStore.dishes.slice(0);
    this.searchDishAndIngredient(this.search)
  };

  dishOverScrollHandler = () => {
    const html = document.getElementById("html-id");
    if (html.scrollHeight - (html.scrollTop + html.clientHeight) <= 20) {
      this.dishesList = this.dishesList.concat(window.dishStore.dishes);
      this.forceUpdate();
    }
  };

  render() {
    return (
      <div className="root-app">
        <Modal></Modal>
        <div className="root-app-header" id="headear">
          <div className="root-app-header-navigation">
            <img
              className="root-app-header-navigation-logo"
              src="/img/restaurant-logo.png"
              alt=""
            ></img>
            <ul className="root-app-header-navigation-menu">
              <li className="root-app-header-navigation-menu-point">Our Restaurant</li>
              <li className="root-app-header-navigation-menu-point nav_menu_but">Menu</li>
              <li className="root-app-header-navigation-menu-point">Contact us</li>
            </ul>
            <div className="root-app-header-navigation-search">
              <div className="root-app-header-navigation-search-input-wrapper">
                <RestInput
                  className="root-app-header-navigation-search-input"
                  placeholder="Try « Chicken cotoletta »"
                  value={this.search}
                  handleInput={this.searchDishAndIngredient}
                >
                </RestInput>
                <img
                  className="root-app-header-navigation-search-img"
                  src="/img/search.svg"
                  alt=""
                />
              </div>
              <div className="root-app-header-navigation-search-user">
                <span className="root-app-header-navigation-search-user-name">John C.</span>
                <img src="/img/user.svg" alt="" />
              </div>
            </div>
          </div>
          <div className="root-app-header-logo-wrapper">
            <h1 className="root-app-header-logo-wrapper-menu">Menu</h1>
          </div>
        </div>
        <div className="root-app-contener">
          <div className="root-app-contener-marker"></div>
          <div className="root-app-contener-menu">
            <p className="root-app-contener-menu-p">Meat Dishes</p>
            <h4 className="root-app-contener-menu-h">
              Some of the best meat dishes from worldwide
            </h4>
          </div>
          <button
            className="root-app-contener-add"
            id="btnAdd"
            onClick={() => {
              window.showModal();
            }}
          >
            Add a new dish
          </button>
        </div>

        <div className="root-app-card-contener">
          <CardList cardList={this.dishesList} />
        </div>
      </div>
    );
  }
}
