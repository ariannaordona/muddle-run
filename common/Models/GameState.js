/**
 * Readonly interface for accessing game scene state (usable by front-end).
 *
 * @param {GameScene} gameScene
 * @constructor
 */
function GameState(gameScene) {
  this.getAllObjects = () => gameScene.getAllObjects();
  this.getObject = hashId => gameScene.getObject(hashId);
  this.hasObject = hashId => gameScene.hasObject(hashId);

  this.getBuildableObject = hashId => gameScene.getBuildableObject(hashId);
  this.hasBuildableObject = hashId => gameScene.hasBuildableObject(hashId);
  this.getAllBuildableObjects = () => gameScene.getAllBuildableObjects();

  this.getPlayer = hashId => gameScene.getPlayer(hashId);
  this.getAllPlayers = () => gameScene.getAllPlayers();
}

export default GameState;
