import { ArcRotateCamera, MeshBuilder, Vector3 } from '@babylonjs/core';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { useEngine, useScene } from '../common/hooks';
import GameLight from '../components/game_light';
import GameTile from '../components/game_tile';
import { Models } from '../data';
import Constants from '../utils/constants';

const MainScene = memo(() => {
  const [engine, canvas] = useEngine();
  const scene = useScene();

  const [hexes, setHexes] = useState<{ [index: number]: Models.Tile }>({});

  const [current, setCurrent] = useState<Models.Tile>({ id: 1, type: 0 });
  const [index, setIndex] = useState<number>();

  useEffect(() => {
    if (!engine || !scene) return;

    MeshBuilder.CreateGround('ground', { width: 20, height: 20 }, scene);
    const camera = new ArcRotateCamera(
      'camera1',
      0,
      Math.PI / 4,
      10,
      Vector3.Zero(),
      scene,
    );
    camera.lowerRadiusLimit = 2;

    if (canvas) {
      // camera.inputs.clear();
      // camera.inputs.addMouseWheel().addPointers();
      // camera.inputs.attached.pointers;
      // console.log(camera.inputs.attached.pointers);

      camera.attachControl(canvas, true);
    }

    scene.onPointerMove = (e, i) => {
      const res = scene.pick(
        scene.pointerX,
        scene.pointerY,
        (e) => e.name === 'ground',
        true,
      );

      if (res.pickedPoint) {
        let r = (res.pickedPoint.x + Constants.yOffset) / Constants.yOffset;

        if (r > 0) r -= Constants.yOffset / 2;
        r = Math.floor(r);
        if (Math.abs(r) > 2) r = Math.max(-2, Math.min(2, r));

        let c = Math.floor(
          (res.pickedPoint.z + Constants.xOffset) / Constants.xOffset,
        );
        if (Math.abs(c) > 4) return;

        let l = 0;
        for (let i = -2; i < r; i++) {
          switch (Math.abs(i)) {
            case 2:
              l += 3;
              break;
            case 1:
              l += 4;
              break;
            default:
              l += 5;
              break;
          }
        }
        if (Math.abs(r) === 2) {
          if (Math.abs(c) > 2) return;
        } else if (Math.abs(r) === 1) {
          c += 1;
          if (c < -2) return;
        }
        const pos = l + Math.floor(c / 2) + (r === 0 ? 2 : 1);
        if (pos < 0 || pos > 18) return;
        // console.log(r, c, pos);

        setIndex(pos);
      }
    };

    engine.runRenderLoop(() => {
      scene.render();
    });
  }, [scene]);

  const tiles = useMemo(
    () =>
      Object.entries(hexes).map(([i, e]) => (
        <GameTile key={e.id} tile={e} index={+i} />
      )),
    [hexes],
  );
  const currentTile = useMemo(() => {
    if (current === undefined || index === undefined) return undefined;
    return <GameTile tile={current} index={index} />;
  }, [current, index]);

  return (
    <>
      <GameLight />
      <GameTile tile={{ id: 1, type: 1 }} index={0} />
      <GameTile tile={{ id: 1, type: 2 }} index={1} />
      {/* <GameTile tile={{ id: 1, type: 3 }} index={2} /> */}
      {/* <GameTile tile={{ id: 1, type: 0 }} index={3} /> */}
      {tiles}
      {currentTile}
    </>
  );
});
MainScene.displayName = 'MainScene';

const deck = [];

export default MainScene;
