const Strategy = {
  circles(x1, y1, r1, x2, y2, r2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return dx * dx + dy * dy < (r1 + r2) * (r1 + r2);
  },

  // Collisions between rectangle
  rectangles(x1, y1, w1, h1, x2, y2, w2, h2, e = 0) {
    if (x1 > x2 + w2 + e || x1 + w1 + e < x2) return false;
    if (y1 > y2 + h2 + e || y1 + h1 + e < y2) return false;
    return true;
  },

  // Collisions between rectangle and circle
  rectangleCircle(x0, y0, w0, h0, cx, cy, r) {
    let testX = cx;
    let testY = cy;

    if (testX < x0) testX = x0;
    if (testX > x0 + w0) testX = x0 + w0;
    if (testY < y0) testY = y0;
    if (testY > y0 + h0) testY = y0 + h0;

    return (cx - testX) * (cx - testX) + (cy - testY) * (cy - testY) < r * r;
  }
};

const collision = (entity1, entity2, extra = 0) => {
  const { height: h1, width: w1 } = entity1;
  const { height: h2, width: w2 } = entity2;

  const { x: x1, y: y1 } = entity1.position;
  const { x: x2, y: y2 } = entity2.position;

  return Strategy.rectangles(x1, y1, w1, h1, x2, y2, w2, h2, extra);
};

export default collision;
