import { Vector3 } from '@babylonjs/core';
import Constants from './constants';

const standard = Array.from({ length: 5 }, (_, i) => {
  i -= 2;
  switch (Math.abs(i)) {
    case 2:
      return Array.from(
        { length: 3 },
        (_, j) =>
          new Vector3(
            (i + Math.sign(i)) * Constants.yOffset,
            0,
            -2 * Constants.xOffset + j * 2 * Constants.xOffset,
          ),
      );
    case 1:
      return Array.from(
        { length: 4 },
        (_, j) =>
          new Vector3(
            (i + Math.sign(i) / 2) * Constants.yOffset,
            0,
            -3 * Constants.xOffset + j * 2 * Constants.xOffset,
          ),
      );
    default: //0
      return Array.from(
        { length: 5 },
        (_, j) =>
          new Vector3(0, 0, -4 * Constants.xOffset + j * 2 * Constants.xOffset),
      );
  }
}).flat();

const GameMap = { standard };

export default GameMap;
