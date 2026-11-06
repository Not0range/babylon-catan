import { memo, useEffect, useMemo, useRef, useState } from 'react';
import useScene from '@hooks/useScene';
import {
  ActionManager,
  Color3,
  ExecuteCodeAction,
  Mesh,
  MeshBuilder,
  Node,
  StandardMaterial,
  TransformNode,
} from '@babylonjs/core';
import Constants from '../utils/constants';
import GameMap from '../utils/map';

type Props = {
  visible?: boolean;
  onHover?: (index: number) => void;
  onPick?: (index: number) => void;
};

const HexPicker = memo<Props>(({ visible = true, onHover, onPick }) => {
  const scene = useScene();
  const self = useRef<TransformNode>(undefined);
  const [inited, setInited] = useState(false);

  useEffect(() => {
    if (!scene) return;

    self.current = new TransformNode('hex-picker', scene);
    self.current.isVisible = visible;
    setInited(true);
    return () => self.current?.dispose();
  }, [scene]);

  useEffect(() => {
    if (self.current) self.current.isVisible = visible;
  }, [visible]);

  const items = useMemo(() => {
    if (!inited) return null;
    return GameMap.standard.map((_, i) => (
      <PickerItem
        key={i}
        index={i}
        parent={self.current}
        onHover={onHover}
        onPick={onPick}
      />
    ));
  }, [inited, onHover, onPick]);

  return items;
});
HexPicker.displayName = 'HexPicker';

type ItemProps = {
  index: number;
  parent?: Node;
} & Pick<Props, 'onPick' | 'onHover'>;

const PickerItem = memo<ItemProps>(props => {
  const { index, parent = null } = props;

  const scene = useScene();
  const self = useRef<Mesh>(null);

  const propsRef = useRef(props);

  useEffect(() => {
    if (!scene) return;

    const mat = new StandardMaterial(`picker-mat${index}`);
    mat.disableLighting = true;
    mat.emissiveColor = unactiveColor;
    mat.alpha = 0.25;

    self.current = MeshBuilder.CreateCylinder(`picker${index}`, {
      height: Constants.fieldHeight,
      tessellation: 6,
      diameter: Constants.hexagonDiameter,
    });
    self.current.inheritVisibility = true;
    self.current.material = mat;

    const manager = new ActionManager(scene);
    manager.registerAction(
      new ExecuteCodeAction(
        { trigger: ActionManager.OnPointerOverTrigger },
        e => {
          mat.emissiveColor = activeColor;
          propsRef.current.onHover?.(index);
        },
      ),
    );
    manager.registerAction(
      new ExecuteCodeAction(
        { trigger: ActionManager.OnPointerOutTrigger },
        e => {
          mat.emissiveColor = unactiveColor;
        },
      ),
    );
    manager.registerAction(
      new ExecuteCodeAction({ trigger: ActionManager.OnPickTrigger }, e => {
        propsRef.current.onPick?.(index);
      }),
    );

    self.current.actionManager = manager;

    self.current.position = GameMap.standard[index];
    self.current.parent = parent;
  }, [scene]);

  useEffect(() => {
    if (!self.current) return;

    self.current.position = GameMap.standard[index];
  }, [index]);

  useEffect(() => {
    if (self.current) self.current.parent = parent;
  }, [parent]);

  useEffect(() => {
    propsRef.current = props;
  }, [props]);

  return null;
});

const activeColor = new Color3(0, 1, 0);
const unactiveColor = new Color3(1, 0, 0);

function nop(index: number) {}

export default HexPicker;
