import { AnimatedSprite, BaseTexture, Rectangle, Texture } from "pixi.js";

import Constants from "../constants";
import { Directions } from "../interfaces";
import ApplicationService from "../services/Application";

abstract class Enemy {
  protected directions: Directions = {
    left: "LEFT",
    right: "RIGHT",
  };
  public abstract enemyName: string;
  public app: ApplicationService;
  public sprite: AnimatedSprite;

  constructor(app: ApplicationService) {
    this.app = app;
  }

  protected getDirection() {
    const directions = Object.values(this.directions);
    return directions[Math.floor(Math.random() * directions.length)];
  }

  public getAnimatedEnemy(enemyAmount: Number) {
    const enemyJSON = require(`../assets/${this.enemyName}.json`);
    const enemyTextures = [];

    for (let i = 1; i <= enemyAmount; i++) {
      const enemyFrame = enemyJSON.frames[`${this.enemyName}${i}.png`].frame;

      const rect: Rectangle = new Rectangle(
        enemyFrame.x,
        enemyFrame.y,
        enemyFrame.w,
        enemyFrame.h
      );

      const baseTexture = new BaseTexture(Constants.enemyPng.default);
      const texture = new Texture(baseTexture, rect);

      enemyTextures.push(texture);
    }

    return new AnimatedSprite(enemyTextures);
  }

  public move() {
    this.sprite.position.set(
      Constants.coordinatesJSON.coordinates[
        Math.floor(Math.random() * Constants.coordinatesJSON.coordinates.length)
      ].x,
      Constants.coordinatesJSON.coordinates[
        Math.floor(Math.random() * Constants.coordinatesJSON.coordinates.length)
      ].y
    );

    this.sprite.interactive = true;
    this.sprite.cursor = "pointer";
    this.sprite.on("click", () => this.kill());
    this.sprite.play();
    this.sprite.animationSpeed = 0.15;

    let enemyDirection = this.getDirection();

    if (enemyDirection == this.directions.right) {
      this.sprite.scale.x *= -1;
    }

    this.app.app.ticker.add(() => {
      if (this.sprite.x <= 0) {
        enemyDirection = this.directions.right;
        this.sprite.scale.x *= -1;
      } else if (this.sprite.x >= Constants.screenWidth) {
        enemyDirection = this.directions.left;
        this.sprite.scale.x *= -1;
      }
    });

    this.app.app.ticker.add(() => {
      if (enemyDirection == this.directions.left) {
        this.sprite.x -= 2;
      }

      if (enemyDirection == this.directions.right) {
        this.sprite.x += 2;
      }
    });
  }

  public kill() {
    this.app.score++;
    this.app.enemiesCounter--;
    this.app.scoreSprite.text = this.app.score;
    this.app.enemiesCounterSprite.text = this.app.enemiesCounter;
    this.app.app.stage.removeChild(this.sprite);
  }
}

export default Enemy;
