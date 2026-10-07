import { memo, useEffect, useRef } from 'react';
import { useScene } from '../common/hooks';
import { HemisphericLight, Vector3 } from '@babylonjs/core';

type Props = {
  intensity?: number;
};

const GameLight = memo<Props>(({ intensity }) => {
  const scene = useScene();
  const obj = useRef<HemisphericLight>(null);

  useEffect(() => {
    if (!scene) return;

    obj.current = new HemisphericLight('light1', Vector3.Up(), scene);
    obj.current.intensity = intensity ?? 1;
    return () => obj.current?.dispose();
  }, [scene]);

  useEffect(() => {
    if (obj.current) obj.current.intensity = intensity ?? 1;
  }, [intensity]);

  return null;
});
GameLight.displayName = 'GameLight';

export default GameLight;
