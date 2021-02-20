import * as PIXI from 'pixi.js';

export default class Ball {
  constructor(x, y, radius, color) {
    this.shape = new PIXI.Graphics();
    this.x = x || 0;
    this.y = y || 0;
    this.originalX = x || 0;
    this.originalY = y || 0;
    this.vx = 0;
    this.vy = 0;
    this.radius = radius || 2;
    this.color = color || '0xe3bb1b';
    this.friction = 0.85;
    this.springFactor = 0.01;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  think(mouse, radius) {
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;

    const dist = Math.sqrt(dx*dx + dy*dy);
    
    // interaction
    if (dist < radius) {
      const angle = Math.atan2(dy, dx);
      const tx = mouse.x + Math.cos(angle) * radius;
      const ty = mouse.y + Math.sin(angle) * radius;

      this.vx += tx - this.x;
      this.vy += ty - this.y
    }

    // spring back
    const dx1 = -(this.x - this.originalX);
    const dy1 = -(this.y - this.originalY);

    this.vx += dx1 * this.springFactor;
    this.vy += dy1 * this.springFactor;

    // friction
    this.vx *= this.friction;
    this.vy *= this.friction;

    // actual move
    this.x += this.vx;
    this.y += this.vy;
  }

  draw() {
    this.shape.clear();
    this.shape.beginFill(this.color);
    this.shape.drawCircle(this.x, this.y, this.radius);
    this.shape.endFill();
    return this.shape;
  }
}