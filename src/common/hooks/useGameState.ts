import { makeAutoObservable } from 'mobx';
import { useLocalObservable } from 'mobx-react-lite';
import { createContext, useContext } from 'react';
import { Tile } from '../../data/models';

export const GameStateContext = createContext<GameStateCls | undefined>(
  undefined,
);

export function useGameStateFactory() {
  return useLocalObservable(() => new GameStateCls());
}

export default function useGameState() {
  return useContext(GameStateContext)!;
}

class GameStateCls {
  hexes = new Map<number, Tile>();

  constructor() {
    makeAutoObservable(this);
  }

  placeHex(index: number, tile: Tile) {
    if (this.hexes.has(index)) return; //TODO throw error
    this.hexes.set(index, tile);
  }
}
