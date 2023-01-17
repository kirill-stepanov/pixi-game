import { Application, Sprite, Text } from "pixi.js";
import Constants from "../constants";
import EnemyDragon from "../models/EnemyDragon";

class ApplicationService {
  public app: Application;
  public enemiesCounter: number = 1;
  public enemiesCounterSprite: Text;
  public score: number = 0;
  public scoreSprite: Text;

  public init() {
    this.app = new Application({
      width: Constants.screenWidth,
      height: Constants.screenHeight,
    });

    document.body.appendChild(this.app.view as HTMLCanvasElement);

    const backgroundImageSprite: Sprite = Sprite.from(
      Constants.backgroundImage.default
    );

    backgroundImageSprite.width = Constants.screenWidth;
    backgroundImageSprite.height = Constants.screenHeight;

    this.app.stage.addChild(backgroundImageSprite);

    this.createScore();
    this.createEnemiesCounter();
    this.addEnemy();
  }

  public createScore() {
    this.scoreSprite = new Text(this.score, Constants.textStyles);
    this.scoreSprite.x = 170;
    this.scoreSprite.y = 50;

    const deadEnemiesText: Text = new Text(`Score: `, Constants.textStyles);
    deadEnemiesText.x = 50;
    deadEnemiesText.y = 50;

    this.app.stage.addChild(deadEnemiesText);
    this.app.stage.addChild(this.scoreSprite);
  }

  public createEnemiesCounter() {
    this.enemiesCounterSprite = new Text(
      `${this.enemiesCounter}`,
      Constants.textStyles
    );

    this.enemiesCounterSprite.position.set(Constants.screenWidth - 80, 100);

    this.app.stage.addChild(this.enemiesCounterSprite);

    const arrowDownStripe: Sprite = Sprite.from(Constants.arrowImage.default);
    const arrowUpStripe: Sprite = Sprite.from(Constants.arrowImage.default);

    arrowDownStripe.position.set(Constants.screenWidth - 100, 150);
    arrowDownStripe.width = 60;
    arrowDownStripe.height = 50;
    arrowDownStripe.interactive = true;
    arrowDownStripe.cursor = "pointer";
    arrowDownStripe.on("click", () =>
      this.arrowDownOnClick(this.enemiesCounterSprite)
    );

    arrowUpStripe.position.set(Constants.screenWidth - 100, 90);
    arrowUpStripe.width = 60;
    arrowUpStripe.height = 50;
    arrowUpStripe.interactive = true;
    arrowUpStripe.cursor = "pointer";
    arrowUpStripe.scale.y *= -1;
    arrowUpStripe.on("click", () =>
      this.arrowUpOnClick(this.enemiesCounterSprite)
    );

    this.app.stage.addChild(arrowUpStripe);
    this.app.stage.addChild(arrowDownStripe);
  }

  public arrowDownOnClick(counterText: Text) {
    if (this.enemiesCounter > 0) {
      this.enemiesCounter--;
      counterText.text = this.enemiesCounter;
      this.app.stage.removeChild(this.app.stage.children.at(-1));
    }
  }

  public arrowUpOnClick(counterText: Text) {
    this.enemiesCounter++;
    counterText.text = this.enemiesCounter;
    this.addEnemy();
  }

  public addEnemy() {
    new EnemyDragon(this);
  }
}

export default ApplicationService;
