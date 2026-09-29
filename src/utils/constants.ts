import { Color4 } from '@babylonjs/core';

const hexagonDiameter = 4;
const hexagonRadius = hexagonDiameter / 2;

const Constants = {
  hexagonDiameter,
  xOffset: Math.sqrt(
    hexagonRadius * hexagonRadius - (hexagonRadius * hexagonRadius) / 4,
  ),
  yOffset: hexagonRadius,
  fieldHeight: 0.1,
  tileColors: [
    new Color4(1, 0.94, 0), //desert
    new Color4(0.13, 0.69, 0.3), //forest
    new Color4(0.71, 0.96, 0.11), //hills
    new Color4(1, 0.79, 0.05), //fields
    new Color4(0.5, 0.5, 0.5), //mountains
    new Color4(0.73, 0.48, 0.34), //career
  ],
};

export default Constants;
