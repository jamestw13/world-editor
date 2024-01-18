class Graph {
  constructor(points = [], segments = []) {
    this.points = points;
    this.segments = segments;
  }

  addPoint(point) {
    this.points.push(point);
  }

  addSegment(segment) {
    this.segments.push(segment);
  }

  removePoint(point) {
    const segs = this.getSegmentsWithPoint(point);
    for (const seg of segs) {
      this.removeSegment(seg);
    }
    this.points.splice(this.points.indexOf(point), 1);
  }

  removeSegment(seg) {
    this.segments.splice(this.segments.indexOf(seg), 1);
  }

  containsPoint(point) {
    return this.points.find(p => p.equals(point));
  }

  containsSegment(segment) {
    return this.segments.find(seg => seg.equals(segment));
  }

  getSegmentsWithPoint(point) {
    const segs = [];
    for (const seg of this.segments) {
      if (seg.includes(point)) {
        segs.push(seg);
      }
    }
    return segs;
  }

  dispose() {
    this.points = [];
    this.segments = [];
  }

  tryAddPoint(point) {
    if (!this.containsPoint(point)) {
      this.addPoint(point);
      return true;
    }
    return false;
  }

  tryAddSegment(seg) {
    if (!this.containsSegment(seg) && !seg.p1.equals(seg.p2)) {
      this.addSegment(seg);
      return true;
    }
    return false;
  }

  draw(ctx) {
    for (const seg of this.segments) {
      seg.draw(ctx);
    }

    for (const p of this.points) {
      p.draw(ctx);
    }
  }
}
