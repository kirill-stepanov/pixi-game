import ApplicationService from "../services/Application";
import Enemy from "./Enemy";

export default class EnemyDragon extends Enemy {
  public enemyName: string = "dragon";

  constructor(app: ApplicationService) {
    super(app);
    this.sprite = this.getAnimatedEnemy(12);
    this.move();
    this.app.app.stage.addChild(this.sprite);
  }
}
