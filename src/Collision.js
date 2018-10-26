const Collision = {
  circles(x1, y1, r1, x2, y2, r2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return dx * dx + dy * dy < (r1 + r2) * (r1 + r2);
  },

  // Collisions between rectangle
  rectangles(x0, y0, w0, h0, x2, y2, w2, h2) {
    if (x0 > x2 + w2 || x0 + w0 < x2) return false;
    if (y0 > y2 + h2 || y0 + h0 < y2) return false;
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

export default Collision;
