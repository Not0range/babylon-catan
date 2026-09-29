import { Engine } from '@babylonjs/core';
import { createContext, useContext } from 'react';

export const EngineContext = createContext<
  [Engine, HTMLCanvasElement] | undefined
>(undefined);

export default function useEngine() {
  return useContext(EngineContext)!;
}
