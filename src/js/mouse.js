export default class Mouse {
  constructor(canvas) {
    this.canvas = canvas;
    this.rect = this.canvas.getBoundingClientRect();
    this.x = 0;
    this.y = 0;

    this.init();
  }

  init() {
    this.canvas.addEventListener('mousemove', this.move.bind(this))
  }

  move(e) {
    this.x = e.clientX - this.rect.left;
    this.y = e.clientY - this.rect.top;
  }
}