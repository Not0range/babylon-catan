import { memo, useEffect, useRef } from 'react';
import { useScene } from '../common/hooks';
import { Models } from '../data';
import { Color4, Mesh, MeshBuilder } from '@babylonjs/core';
import Constants from '../utils/constants';
import GameMap from '../utils/map';

type Props = {
  tile: Models.Tile;
  index: number;
};

const GameTile = memo<Props>(({ tile, index }) => {
  const scene = useScene();
  const obj = useRef<Mesh>(null);

  useEffect(() => {
    if (!scene) return;

    obj.current = MeshBuilder.CreateCylinder(
      `cylinder${tile.id}`,
      {
        height: Constants.fieldHeight,
        tessellation: 6,
        diameter: Constants.hexagonDiameter,
        faceColors: [
          new Color4(1, 1, 1, 1),
          new Color4(1, 1, 1, 1),
          Constants.tileColors[tile.type],
        ],
      },
      scene,
    );
    obj.current.position = GameMap.standard[index];
    return () => obj.current?.dispose();
  }, [scene, tile]);

  useEffect(() => {
    if (obj.current) obj.current.position = GameMap.standard[index];
  }, [index]);

  return null;
});

export default GameTile;
