import { Vector3 } from '@babylonjs/core';

function poligon(vertexCount: number, x = 0, y = 0, z = 0) {
  const alpha = (2 * Math.PI) / vertexCount;
  return Array.from(
    { length: vertexCount },
    (_, i) => new Vector3(Math.sin(alpha * i) + x, y, Math.cos(alpha * i) + z),
  );
}

const Geometry = {
  poligon,
};

export default Geometry;
