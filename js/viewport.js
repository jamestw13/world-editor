class Viewport {
  constructor(canvas, graph) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    this.zoom = 1;
    this.center = new Point(canvas.width / 2, canvas.height / 2);
    this.offset = scale(this.center, -1);

    this.drag = {
      start: new Point(0, 0),
      end: new Point(0, 0),
      offset: new Point(0, 0),
      active: false,
    };

    this.#addEventListeners();

    this.graph = graph;

    this.selected = null;
    this.hovered = null;
    this.dragging = false;
    this.mouse = null;
  }

  getMouse(e, subractDragOffset = false) {
    const p = new Point(
      (e.offsetX - this.center.x) * this.zoom - this.offset.x,
      (e.offsetY - this.center.y) * this.zoom - this.offset.y
    );
    return subractDragOffset ? subtract(p, this.drag.offset) : p;
  }

  getOffset() {
    return add(this.offset, this.drag.offset);
  }

  #addEventListeners() {
    this.canvas.addEventListener('mousewheel', this.#handleMouseWheel.bind(this));
    this.canvas.addEventListener('mousedown', this.#handleMouseDown.bind(this));
    this.canvas.addEventListener('mousemove', this.#handleMouseMove.bind(this));
    this.canvas.addEventListener('mouseup', this.#handleMouseUp.bind(this));
  }

  #handleMouseDown(e) {
    if (e.button === 1) {
      this.drag.start = this.getMouse(e);
      this.drag.active = true;
    }
  }

  #handleMouseMove(e) {
    if (this.drag.active) {
      this.drag.end = this.getMouse(e);
      this.drag.offset = subtract(this.drag.end, this.drag.start);
    }
  }

  #handleMouseUp(e) {
    if (this.drag.active) {
      this.offset = add(this.offset, this.drag.offset);
      this.drag = {
        start: new Point(0, 0),
        end: new Point(0, 0),
        offset: new Point(0, 0),
        active: false,
      };
    }
  }

  #handleMouseWheel(e) {
    const direction = Math.sign(e.deltaY);
    const step = 0.1;
    this.zoom += direction * step;
    this.zoom = Math.max(1, Math.min(5, this.zoom));
  }
}
