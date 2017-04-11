// found at https://github.com/kittykatattack/learningPixi

import {
  Container,
  Rectangle,
  Sprite,
  autoDetectRenderer,
  loader,
  resources,
  TextureCache,
  utils
} from "../helper/PixiAliases";
import scaleToWindow from "../helper/scaleToWindow";

import "../styles/base.css";

export default class Tutorial {

  renderer = autoDetectRenderer(
    1280, 720,
    {antialias: false, transparent: false, resolution: 1}
  );

  stage = new Container();

  steps = [
    (index) => {
      console.debug("Tutorial - Step 1: Print renderer");

      let type = "WebGL";
      if (!utils.isWebGLSupported()){
        type = "canvas";
      }
      utils.sayHello(type);

      if (index < this.steps.length - 1) {
        this.steps[index + 1](index+ 1);
      }
    },

    (index) => {
      console.debug("Tutorial - Step 2: Creating the renderer and stage");

      this.renderer.autoResize = true;
      this.renderer.view.style.position = "absolute";
      this.renderer.view.style.display = "block";
      this.renderer.autoResize = true;
      this.renderer.render(this.stage);

      document.body.appendChild(this.renderer.view);

      if (index < this.steps.length - 1) {
        this.steps[index + 1](index+ 1);
      }
    },

    (index) => {
      console.debug("Tutorial - Step 3: Auto resize");

      scaleToWindow(this.renderer.view);

      window.addEventListener("resize", () => {
        scaleToWindow(this.renderer.view);
      });

      if (index < this.steps.length - 1) {
        this.steps[index + 1](index+ 1);
      }
    },

    (index) => {
      console.debug("Tutorial - Step 4: Loading images into the texture cache");
      console.debug("Tutorial - Step 5: ... and show the loading progress");

      const toLoad = [
        "../../assets/tilesets/general-buildings.png"
      ];

      let loaded = 0;

      loader
        .add(toLoad)
        .on("progress", (loader, resource) => {
          console.debug(`- loaded ${loader.progress}% (${++loaded}/${toLoad.length}): ${resource.name}`);
        })
        .load((loader, resources) => {
          console.debug("= loaded all resources");
          /*Object.values(resources).forEach((resource) => {
            const sprite = new Sprite(resource.texture);
            this.stage.addChild(sprite);
          });
          this.renderer.render(this.stage);
          */
          if (index < this.steps.length - 1) {
            this.steps[index + 1](index+ 1);
          }
        });
    },

    (index) => {
      console.debug("Tutorial - Step 6: Positioning and resizing sprite from tileset");

      const width = 256;
      const height = 256;

      const texture = TextureCache["../../assets/tilesets/general-buildings.png"];
      texture.frame = new Rectangle(0, 0, width, height);
      const silverMineSprite = new Sprite(texture);
      silverMineSprite.x = 100;
      silverMineSprite.y = 100;
      silverMineSprite.width = 64;
      silverMineSprite.height = 64;
      this.stage.addChild(silverMineSprite);
      this.renderer.render(this.stage);

      if (index < this.steps.length - 1) {
        this.steps[index + 1](index+ 1);
      }
    },

    (index) => {
      console.debug("Tutorial - Step 7: Using a texture atlas");

      if (index < this.steps.length - 1) {
        this.steps[index + 1](index+ 1);
      }
    }
  ];

  launch = () => {
    this.steps[0](0);
  };
}
