import { ArcRotateCamera, MeshBuilder, Vector3 } from '@babylonjs/core';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useScene from '@hooks/useScene';
import useEngine from '@hooks/useEngine';
import useGameState, {
  GameStateContext,
  useGameStateFactory,
} from '@hooks/useGameState';
import GameLight from '@cmps/game_light';
import GameTile from '@cmps/game_tile';
import HexPicker from '@cmps/hex_picker';
import { Models } from '../data';
import { observer } from 'mobx-react-lite';
import { entries, ObservableMap } from 'mobx';

const MainScene = memo(() => {
  const [engine, canvas] = useEngine();
  const scene = useScene();
  const state = useGameStateFactory();

  const [current, setCurrent] = useState<Models.Tile>();
  const [index, setIndex] = useState<number>();
  const lastIndex = useRef(0);

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

    camera.lowerRadiusLimit = 5;
    camera.upperRadiusLimit = 20;
    camera.attachControl(canvas, true);

    window.setCurrentTile = (type: number) => {
      setCurrent({ id: ++lastIndex.current, type });
    };
    const cb = () => scene.render();
    engine.runRenderLoop(cb);
    return () => engine.stopRenderLoop(cb);
  }, [scene]);

  const onPick = useMemo(() => {
    if (!current) return undefined;
    return (index: number) => {
      state.placeHex(index, current);
      setCurrent(undefined);
    };
  }, [current]);

  const currentTile = useMemo(() => {
    if (current === undefined || index === undefined) return undefined;
    return <GameTile tile={current} index={index} />;
  }, [current, index]);

  return (
    <GameStateContext.Provider value={state}>
      <GameLight />
      <HexPicker
        visible={current !== undefined}
        onHover={setIndex}
        onPick={onPick}
      />
      <Tiles />
      {currentTile}
    </GameStateContext.Provider>
  );
});
MainScene.displayName = 'MainScene';

const Tiles = observer(() => {
  const state = useGameState();
  const map = entries(state.hexes as ObservableMap<number, Models.Tile>);

  const tiles = useMemo(
    () => map.map(([i, e]) => <GameTile key={e.id} tile={e} index={i} />),
    [map],
  );

  return tiles;
});

export default MainScene;
