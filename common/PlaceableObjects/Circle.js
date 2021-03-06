import HashableIdInterface from '../Interfaces/HashableIdInterface';
import SerializableInterface from '../Interfaces/SerializableInterface';
import PlaceableObjectInterface from '../Interfaces/PlaceableObjectInterface';
import { setDebugProperty } from '../Utils/Debug';
import SavableInterface from '../Interfaces/SavableInterface';
import Paper from '../Paper';
import { deserialize, serialize } from '../Utils/SerializationHelper';

/**
 * @param {CommonVector2} position
 * @param {number} radius
 * @param {CommonColor} color
 * @param {boolean} isPlaced
 * @param {string} predefinedHashId
 * @constructor
 */
function Circle(position, radius, color, isPlaced, predefinedHashId = '') {
  const parameters = {};
  let path;

  // INTERFACES IMPLEMENTATION.
  this.hashableIdInterface = new HashableIdInterface(this, predefinedHashId, {
    getHashedContent: () => (
      this.placeableObjectInterface.getScene().hashableIdInterface.getHashId()
    ),
  });

  this.placeableObjectInterface = new PlaceableObjectInterface(this, {
    getType: () => 'circle',

    getPosition: () => parameters.position,
    setPosition: (newPosition) => {
      parameters.position = newPosition;
      setDebugProperty(this, 'position', newPosition);
      return this;
    },

    getColor: () => parameters.color,
    setColor: (newColor) => {
      parameters.color = newColor;
      setDebugProperty(this, 'color', newColor);
      return this;
    },

    isPlaced: () => parameters.isPlaced,
    setPlaced: (newIsPlaced) => {
      parameters.isPlaced = newIsPlaced;
      setDebugProperty(this, 'isPlaced', newIsPlaced);
      return this;
    },

    recalculatePath: () => {
      path = new Paper.Path.Circle(parameters.position, parameters.radius);
    },
    getPath: () => path,
  });

  this.savableInterface = new SavableInterface(this, {
    /**
     * @param {Circle} newEntity
     */
    save: (newEntity) => {
      const newPosition = newEntity.placeableObjectInterface.getPosition();
      if (newPosition !== undefined) {
        this.placeableObjectInterface.setPosition(newPosition.clone());
      }

      const newColor = newEntity.placeableObjectInterface.getColor();
      if (newColor !== undefined) {
        this.placeableObjectInterface.setColor(newColor.clone());
      }

      const newRadius = newEntity.getRadius();
      if (newRadius !== undefined) {
        this.setRadius(newRadius);
      }

      const newIsPlaced = newEntity.placeableObjectInterface.isPlaced();
      if (newIsPlaced !== undefined) {
        this.placeableObjectInterface.setPlaced(newIsPlaced);
      }
      return this;
    },
  });

  // CLASS IMPLEMENTATION.
  this.getRadius = () => parameters.radius;
  this.setRadius = (newRadius) => {
    parameters.radius = newRadius;
    setDebugProperty(this, 'Radius', newRadius);
    return this;
  };

  // INITIALIZE DEFAULT PARAMETERS.
  this.placeableObjectInterface.setPosition(position);
  this.setRadius(radius);
  this.placeableObjectInterface.setColor(color);
  this.placeableObjectInterface.setPlaced(isPlaced);
  this.placeableObjectInterface.recalculatePath();
}

Circle.serializableInterface = new SerializableInterface(Circle, {
  serialize: circle => ({
    position: () => serialize(circle.placeableObjectInterface.getPosition()),
    radius: () => circle.getRadius(),
    color: () => serialize(circle.placeableObjectInterface.getColor()),
    isPlaced: () => circle.placeableObjectInterface.isPlaced(),
    hashId: () => circle.hashableIdInterface.getHashId(),
  }),

  deserialize: object => new Circle(
    deserialize(object.position),
    object.radius,
    deserialize(object.color),
    object.isPlaced,
    object.hashId,
  ),
});

export default Circle;
