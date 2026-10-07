import { Engine } from '@babylonjs/core';
import { useEffect, useMemo, useRef, useState } from 'react';
import { memo, type ReactNode } from 'react';
import { EngineContext } from '../common/hooks';

type Props = {
  children?: ReactNode;
};

const GameCanvas = memo<Props>(({ children }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [engine, setEngine] = useState<Engine>();

  useEffect(() => {
    if (!ref.current) return;

    const e = new Engine(ref.current);
    setEngine(e);
    return () => e.dispose();
  }, []);

  const value: [Engine, HTMLCanvasElement] = useMemo(
    () => [engine!, ref.current!],
    [engine],
  );

  return (
    <EngineContext.Provider value={value}>
      <canvas ref={ref} />
      {engine !== undefined && children}
    </EngineContext.Provider>
  );
});
GameCanvas.displayName = 'GameCanvas';

export default GameCanvas;
