import { TextStyle } from "pixi.js";

class Constants {
  static screenWidth: number = window.innerWidth;
  static screenHeight: number = window.innerHeight;

  static textStyles: TextStyle = new TextStyle({
    fontFamily: "Arial",
    fontSize: 36,
    fontWeight: "bold",
    fill: ["#ffffff"],
  });

  static backgroundImage: any = require("../assets/background.png");
  static arrowImage: any = require("../assets/arrow.png");
  static coordinatesJSON: any = require("../assets/enemyCoordinates.json");
  static enemyJSON: any = require("../assets/dragon.json");
  static enemyPng: any = require("../assets/dragon.png");
}

export default Constants;
