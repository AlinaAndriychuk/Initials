import * as PIXI from 'pixi.js';
import { contain } from 'intrinsic-scale';
import sayHello from './lib/sayHello';
import Mouse from './mouse';
import Ball from './ball';

class Animation {

  constructor({container}) {
    this.animationContainer = container;
    this.width = this.animationContainer.clientWidth;
    this.height = this.animationContainer.clientHeight;

    this.canvas = new PIXI.Application({
      width: this.width, 
      height: this.height,
      autoResize: true,
      autoStart: true,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      transparent: true,
    });

    this.container = new PIXI.Container();

    this.position = new Mouse(this.canvas.view);
    this.mouseBall = new Ball(this.position.x, this.position.y, 30, 0xffffff);
    this.time = 0;
    this.balls = [];

    this.init();
  }

  init() {
    window.addEventListener("resize", this.resize.bind(this));
    this.animationContainer.appendChild(this.canvas.view);
    this.canvas.stage.addChild(this.container);

    this.rect = new PIXI.Graphics();
    this.rect.drawRect(0, 0, 400, 600);
    this.container.addChild(this.rect);

    this.containerWidth = this.container.width;
    this.containerHeight = this.container.height;
    this.resizeContainer();

    this.drawInitials();
    this.drawBalls();
    this.play();
  }

  drawBalls() {
    for (let i = 0; i < 1000; i++) {
      this.balls.push(
        new Ball(
          Math.random() * this.width,
          Math.random() * this.height,
          1
        )
      )
      this.canvas.stage.addChild( this.balls[i].draw() )
    };
  }

  drawInitials() {
    this.shape = new PIXI.Graphics();
    this.shape.lineStyle(3, 0xffffff);
    this.shape.drawPolygon([
      20, 300,
      80, 150,
      140, 300,
      130, 300,
      80, 175,
      30, 300,
      20, 300,
      30, 300,
      50, 250,
      110, 250,
      106, 240,
      54, 240,
      30, 300,
      20, 300,
    ]);
    
    this.shape.lineStyle(2, 0xffffff);  
    this.shape.drawPolygon([
      157, 300,
      170, 300,
      170, 287,
      157, 287,
    ]);
    this.shape.endFill();

    this.shape.x = 10;
    this.shape.y = 30;

    this.cloneShape = this.shape.clone();
    this.cloneShape.x = 200;
    this.cloneShape.y = 30;

    this.container.addChild(this.shape);
    this.container.addChild(this.cloneShape);
  }

  moveShapes() {
    const shapeY = 0.7 * Math.sin(this.time) + this.shape.y;
    const cloneY = -0.7 * Math.sin(this.time) + this.cloneShape.y;

    this.shape.y = shapeY;
    this.cloneShape.y = cloneY;

    this.time += 0.03;
  }

  play() {
    requestAnimationFrame( this.play.bind(this) );

    this.moveShapes();
    this.render();
  }

  render (){
    this.mouseBall.setPosition(this.position.x, this.position.y)
  
    this.balls.forEach( ball => {
      ball.think(this.position, this.mouseBall.radius)
      ball.draw()
    })
  };

  resizeContainer() {
    const { width, height, x, y } = contain(this.width, this.height, this.containerWidth, this.containerHeight);
    this.container.width = width;
    this.container.height = height;
    this.container.position.set(x, y);
  }

  resize() {
    this.width = this.animationContainer.clientWidth;
    this.height = this.animationContainer.clientHeight;

    this.canvas.renderer.resize(this.width, this.height);
    this.resizeContainer();
  }
};


const container = document.querySelector('.js-container');
const animationControl = new Animation({container});
sayHello();