import { memo } from 'react';
import GameCanvas from '@cmps/game_canvas';
import GameScene from '@cmps/game_scene';
import MainScene from './scenes/main_scene';

const App = memo(() => {
  return (
    <GameCanvas>
      <GameScene>
        <MainScene />
      </GameScene>
    </GameCanvas>
  );
});
App.displayName = 'App';

export default App;
