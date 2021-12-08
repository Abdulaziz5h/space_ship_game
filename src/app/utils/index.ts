export function distanceVector(v1: any, v2: any) {
  var dx = v1.x - v2.x;
  var dy = v1.y - v2.y;
  var dz = v1.z - v2.z;

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export const setMeshTransform = (m, teta, radius) => {
  let x = radius;
  let y = 0;

  let x1 =
    x * Math.cos((teta / 180) * Math.PI) -
    y * Math.sin((teta / 180) * Math.PI);
  let y1 =
    x * Math.sin((teta / 180) * Math.PI) +
    y * Math.cos((teta / 180) * Math.PI);
  m.position.x = m.position.x + x1;
  m.position.y = m.position.y + y1;
};

