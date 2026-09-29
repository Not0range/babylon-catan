import { Scene } from '@babylonjs/core';
import { createContext, useContext } from 'react';

export const SceneContext = createContext<Scene | undefined>(undefined);

export default function useScene() {
  return useContext(SceneContext);
}
