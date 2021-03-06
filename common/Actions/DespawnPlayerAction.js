import ActionInterface from '../Interfaces/ActionInterface';
import SerializableInterface from '../Interfaces/SerializableInterface';
import BroadcastedActionInterface from '../Interfaces/BroadcastedActionInterface';
import { setDebugProperty } from '../Utils/Debug';

/**
 * @param {string} playerHashId
 * @param timeOccurred
 * @param {number|null} senderId
 * @constructor
 */
function DespawnPlayerAction(playerHashId, timeOccurred = 0, senderId = null) {
  const parameters = {};

  // INTERFACES IMPLEMENTATION.
  this.actionInterface = new ActionInterface(this, {
    getTimeOccurred: () => parameters.timeOccurred,

    setTimeOccurred: (newTimeOccurred) => {
      parameters.timeOccurred = newTimeOccurred;
      setDebugProperty(this, 'timeOccurred', newTimeOccurred);
      return this;
    },
  });

  this.broadcastedActionInterface = new BroadcastedActionInterface(this, {});

  // CLASS IMPLEMENTATION.
  this.getPlayerHashId = () => playerHashId;
  setDebugProperty(this, 'playerHashId', playerHashId);

  // INITIALIZE DEFAULT PARAMETERS.
  this.actionInterface.setTimeOccurred(timeOccurred);
  this.broadcastedActionInterface.setSenderId(senderId);
}

DespawnPlayerAction.serializableInterface =
  new SerializableInterface(DespawnPlayerAction, {
    /**
     * @param {DespawnPlayerAction} action
     */
    serialize: action => ({
      playerHashId: () => action.getPlayerHashId(),
      timeOccurred: () => action.actionInterface.getTimeOccurred(),
      senderId: () => action.broadcastedActionInterface.getSenderId(),
    }),

    deserialize: json => new DespawnPlayerAction(
      json.playerHashId,
      new Date(json.timeOccurred),
      json.senderId,
    ),
  });

export default DespawnPlayerAction;
