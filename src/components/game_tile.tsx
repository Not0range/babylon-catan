import { memo, useEffect, useRef } from 'react';
import useScene from '@hooks/useScene';
import { Models } from '../data';
import {
  Color3,
  Color4,
  Mesh,
  MeshBuilder,
  StandardMaterial,
  TransformNode,
} from '@babylonjs/core';
import Constants from '../utils/constants';
import GameMap from '../utils/map';

type Props = {
  tile: Models.Tile;
  index: number;
  parent?: TransformNode;
};

const GameTile = memo<Props>(({ tile, index, parent }) => {
  const scene = useScene();
  const obj = useRef<Mesh>(null);

  useEffect(() => {
    if (!scene) return;

    const material = new StandardMaterial(`tile${tile.id}-mat`, scene);

    obj.current = MeshBuilder.CreateCylinder(
      `tile${tile.id}`,
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
    obj.current.material = material;
    obj.current.parent = parent ?? null;
    return () => obj.current?.dispose();
  }, [scene, tile]);

  useEffect(() => {
    if (obj.current) obj.current.position = GameMap.standard[index];
  }, [index]);

  useEffect(() => {
    if (obj.current) obj.current.parent = parent ?? null;
  }, [parent]);

  return null;
});

export default GameTile;
