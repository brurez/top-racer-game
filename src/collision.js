// Collisions between rectangle
const rectangles = (x1, y1, w1, h1, x2, y2, w2, h2, e = 0) => {
  if (x1 > x2 + w2 + e || x1 + w1 + e < x2) return false;
  if (y1 > y2 + h2 + e || y1 + h1 + e < y2) return false;
  return true;
};

const collision = (entity1, entity2, extra = 0) => {
  const { height: h1, width: w1 } = entity1;
  const { height: h2, width: w2 } = entity2;

  const { x: x1, y: y1 } = entity1.position;
  const { x: x2, y: y2 } = entity2.position;

  return rectangles(x1, y1, w1, h1, x2, y2, w2, h2, extra);
};

export default collision;
