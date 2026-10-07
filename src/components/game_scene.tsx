import { memo, useEffect, useState, type ReactNode } from 'react';
import useEngine from '@hooks/useEngine';
import { SceneContext } from '@hooks/useScene';
import { Scene } from '@babylonjs/core';

type Props = {
  children?: ReactNode;
};

const GameScene = memo<Props>(({ children }) => {
  const [engine] = useEngine();
  const [scene, setScene] = useState<Scene>();

  useEffect(() => {
    if (!engine) return;

    const s = new Scene(engine);
    setScene(s);
    return () => s.dispose();
  }, [engine]);

  return (
    <SceneContext.Provider value={scene}>{children}</SceneContext.Provider>
  );
});
GameScene.displayName = 'GameScene';

export default GameScene;
