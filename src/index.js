import Tutorial from "./experiments/tutorial";

const tutorial = new Tutorial();
tutorial.launch();

/*var w = 600
var h = 380
var stage = new PIXI.Stage(0x66FF99);
var renderer = PIXI.autoDetectRenderer(w, h);
document.body.appendChild(renderer.view);
window.requestAnimationFrame(animate);
var n = 12; // CHANGE THIS
var at = 64; // tile width
var ad = 0.01; // gap between tiles
var ar = 1; // rotation of 1 gives you 45 Degrees
var ai = 2; // 2 gives you isometric view
var as = 1.0; // scale
var ox = (n * 2 + 1) * at * as // w  / 2;    // offset
var oy = ((n * 2 + 1) * at - at) * as / ai // ox/ai // (h - at) / 2;
// var borderX = 0 //at*as*n / 2
// var borderY = borderX
var borderL = -ox * 2 + w
var borderR = 0
var borderD = -(oy + at * as / ai) * 2 + h
var borderU = 0
var tooRight = true
var tooLeft = true
var tooHigh = true
var tooLow = true
var velx = 0
var vely = 0
var delx = 0
var dely = 0
var dragMode = 0 // 0: drag, 1: paint
var dragging = false
var count2 = 0
var background = new PIXI.DisplayObjectContainer();
var myContainer = null
var mt1 = new PIXI.Text(" ", {font: "12px Arial"});
mt1.position.x = 10;
mt1.position.y = 20;
stage.addChild(mt1);
var mt2 = new PIXI.Text(" ", {font: "12px Arial"});
mt2.position.x = 10;
mt2.position.y = 40;
stage.addChild(mt2);
var mt3 = new PIXI.Text(" ", {font: "12px Arial"});
mt3.position.x = 10;
mt3.position.y = 60;
stage.addChild(mt3);

// function clearStage()
// {
//     for (var i = stage.children.length - 1; i >= 0; i--) {
//         stage.removeChild(stage.children[i]);
//     };
// }

function initScene() {
  // clearStage()
  // Math.seedrandom('abc')
  for (var i = -n; i <= n; i++) {
    for (var j = -n; j <= n; j++) {
      initTile(i, j);
      // var c = Math.floor(Math.random('abc')*16777215).toString(16)
      let c = '009900'
      if (j < -7)
        c = '990000'
      if (i < -7)
        c = '990000'
      if (j > 7)
        c = '990000'
      if (i > 7)
        c = '990000'
      if (i == -5)
        c = '000099'
      setTile(i, j, c);
    }
  }
  console.log(background.getBounds())
  var d = background.getBounds()
  // render the tilemap to a render texture
  var texture = new PIXI.RenderTexture(ox * 2, (oy + at * as / ai) * 2)
  texture.render(background);
  // create a single background sprite with the texture
  // var myContainer = new PIXI.Sprite(texture);
  myContainer = new PIXI.Sprite(texture);
  stage.addChild(myContainer);
  myContainer.x = -400
  myContainer.y = -400
  myContainer.interactive = true;
  myContainer.mousedown = myContainer.touchstart = function(data) {
    dragging = true;
    mt1.setText('yay.')
    this.sx = data.getLocalPosition(myContainer).x * myContainer.scale.x;
    this.sy = data.getLocalPosition(myContainer).y * myContainer.scale.y;
    delx = dely = 0
    velx = vely = 0
  }
  myContainer.mouseup = myContainer.touchend = function(data) {
    dragging = false;
    mt1.setText('no dragging yet. ')
    if (delx == 0) {
      console.log('click')
      setGraphicTileColor(isoToIndex(this.sx, this.sy), '0xFF0000')
      texture.render(background);
    } else {
      velx = Math.floor(this.position.x - delx)
      vely = Math.floor(this.position.y - dely)
      delx = dely = 0
      console.log('drag -->', this.position.x, this.position.y, delx, dely, velx, vely)
    }
  }
  myContainer.mousemove = myContainer.touchmove = function(data) {
    var newPosition = data.getLocalPosition(myContainer);
    var c = isoToIndex(newPosition.x, newPosition.y)
    var i = c[0]
    var j = c[1]
    delNow = new Date().getMilliseconds()
    if (dragging) {
      var newPosition = data.getLocalPosition(this.parent);
      delx = this.position.x
      dely = this.position.y
      // }
      this.position.x = newPosition.x - this.sx;
      this.position.y = newPosition.y - this.sy;
    } else {
      mt2.setText((delx - this.position.x) + "xy/ij: " + newPosition.x + ', ' + newPosition.y + ' / ' + c);
    }
  }
}

function setGraphicTileColor(ij, c) {
  var i = ij[0];
  var j = ij[1];
  var num = (i + n) * (2 * n + 1) + j + n
  var gr = background.getChildAt(num)
  // mt1.setText('yay: ' + num )
  gr.clear()
  gr.c = c
  gr.beginFill(c);
  gr.moveTo(gr.c1[0], gr.c1[1])
  gr.lineTo(gr.c2[0], gr.c2[1])
  gr.lineTo(gr.c3[0], gr.c3[1])
  gr.lineTo(gr.c4[0], gr.c4[1])
  gr.endFill();
  // }
}

function initTile(i, j) {
  var gr = new PIXI.Graphics();
  gr.i = i
  gr.j = j
  gr.c = 0
  gr.c1 = indexToIso(i + 1 - ad, j + ad)
  gr.c2 = indexToIso(i + 1 - ad, j + 1 - ad)
  gr.c3 = indexToIso(i + ad, j + 1 - ad)
  gr.c4 = indexToIso(i + ad, j + ad)
  gr.hitArea = new PIXI.Polygon([
    new PIXI.Point(gr.c1[0], gr.c1[1]),
    new PIXI.Point(gr.c2[0], gr.c2[1]),
    new PIXI.Point(gr.c3[0], gr.c3[1]),
    new PIXI.Point(gr.c4[0], gr.c4[1])
  ]);
  background.addChild(gr)
}

function setTile(i, j, c) {
  var num = (i + n) * (2 * n + 1) + j + n
  var gr = background.getChildAt(num)
  gr.c1 = indexToIso(i + 1 - ad, j + ad)
  gr.c2 = indexToIso(i + 1 - ad, j + 1 - ad)
  gr.c3 = indexToIso(i + ad, j + 1 - ad)
  gr.c4 = indexToIso(i + ad, j + ad)
  if (c) {
    setGraphicTileColor([
      i, j
    ], '0x' + c);
  }
}

function indexToIso(i, j) {
  var x = ox + (i - j * ar) * as * at;
  var y = oy + (j + i * ar) * as * at / ai;
  // console.log('i2iso: '+i,j,x,y)
  return [x, y]
}

function isoToIndex(x, y) {
  var b = as * at
  var s = x - ox
  var t = y - oy
  var j = (t - s * ar / ai) / (1 + ar * ar) * ai / b
  var i = (s + j * b * ar) / b
  i = Math.floor(i)
  j = Math.floor(j)
  // console.log( 'isoToIndex: ' + x,y,i,j)
  return [i, j]
}

initScene()

var winmode = ''
var timer = setInterval(function() {
  if (window.innerHeight > window.innerWidth) {
    winmode = 'portrait'
  } else {
    winmode = 'landscape'
  }
  mt3.setText(winmode)
}, 500)

function animate() {
  // console.log(window.innerHeight, window.innerWidth  )
  // if(window.innerHeight > window.innerWidth){
  //   console.log("portrait");
  // }
  window.requestAnimationFrame(animate);
  if (dragging) {
    count2 += 1
    mt1.setText((count2))
  } else
    count2 = 0
  if (velx > 0) {
    myContainer.position.x += velx;
    velx -= 1
    // console.log(velx)
  }
  if (velx < 0) {
    myContainer.position.x += velx;
    velx += 1
  }
  if (vely > 0) {
    myContainer.position.y += vely;
    vely -= 1
  }
  if (vely < 0) {
    myContainer.position.y += vely;
    vely += 1
  }
  if (myContainer.position.x < borderL)
    myContainer.position.x = borderL;
  if (myContainer.position.x > borderR)
    myContainer.position.x = borderR;
  if (myContainer.position.y < borderD)
    myContainer.position.y = borderD;
  if (myContainer.position.y > borderU)
    myContainer.position.y = borderU;
  renderer.render(stage);
}*/
