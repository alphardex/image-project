import * as kokomi from "kokomi.js";

import sliderVertexShader from "../Shaders/Slider/vert.glsl";
import sliderFragmentShader from "../Shaders/Slider/frag.glsl";

export default class Slider extends kokomi.Component {
  constructor(base) {
    super(base);

    const params = {
      uDistortX: {
        value: 1.15,
      },
      uDistortZ: {
        value: 1.5,
      },
    };
    this.params = params;

    this.ig = new kokomi.InfiniteGallery(this.base, {
      elList: [...document.querySelectorAll(".gallery-item")],
      direction: "horizontal",
      gap: 128,
      vertexShader: sliderVertexShader,
      fragmentShader: sliderFragmentShader,
      uniforms: {
        uVelocity: {
          value: 0,
        },
        uOpacity: {
          value: 1,
        },
        uProgress: {
          value: 0,
        },
        ...params,
      },
      materialParams: {
        transparent: true,
      },
    });

    this.ws = new kokomi.WheelScroller();
    this.ws.listenForScroll();

    this.dd = new kokomi.DragDetecter(this.base);
    this.dd.detectDrag();
    this.dd.on("drag", (delta) => {
      this.ws.scroll.target -= delta[this.ig.dimensionType] * 2;
    });

    const debug = this.base.debug;
    if (debug.active) {
      const debugFolder = debug.ui.addFolder("gallery");
      debugFolder
        .add(params.uDistortX, "value")
        .min(0)
        .max(2)
        .step(0.01)
        .name("distortX");
      debugFolder
        .add(params.uDistortZ, "value")
        .min(0)
        .max(2)
        .step(0.01)
        .name("distortZ");
    }
  }
  async addExisting() {
    this.ig.addExisting();
    await this.ig.checkImagesLoaded();
  }
  update() {
    this.ws.syncScroll();
    const { current, delta } = this.ws.scroll;
    this.ig.sync(current);

    this.ig.iterate((maku) => {
      maku.mesh.material.uniforms.uVelocity.value = delta;

      maku.mesh.material.uniforms.uDistortX.value = this.params.uDistortX.value;
      maku.mesh.material.uniforms.uDistortZ.value = this.params.uDistortZ.value;
    });
  }
}
