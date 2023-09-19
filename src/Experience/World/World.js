import * as kokomi from "kokomi.js";
import * as THREE from "three";
import gsap from "gsap";

import TestObject from "./TestObject";
import Slider from "./Slider";

export default class World extends kokomi.Component {
  constructor(base) {
    super(base);

    this.base.am.on("ready", async () => {
      this.slider = new Slider(this.base);
      await this.slider.addExisting();

      this.currentActiveMesh = null;

      this.slider.ig.iterate((maku) => {
        this.base.interactionManager.add(maku.mesh);
        maku.mesh.addEventListener("click", () => {
          console.log(maku);

          if (Math.abs(this.slider.ws.scroll.delta) > 5) {
            return;
          }

          const otherMakus = this.slider.ig.makuGroup.makus.filter(
            (item) => item !== maku
          );

          if (!this.currentActiveMesh) {
            this.slider.ws.disable();
            this.slider.dd.disable();

            otherMakus.forEach((item) => {
              gsap.to(item.mesh.material.uniforms.uOpacity, {
                value: 0,
                ease: "power2.out",
              });
            });

            const that = this;
            gsap.to(maku.mesh.material.uniforms.uProgress, {
              value: 1,
              duration: 1,
              ease: "power2.out",
              delay: 0.5,
              onUpdate() {
                if (this.progress() >= 0.5) {
                  that.currentActiveMesh = maku.mesh;
                }
              },
            });
            // this.currentActiveMesh = maku.mesh;
          }
        });
      });

      this.base.container.addEventListener("click", () => {
        if (this.currentActiveMesh) {
          const that = this;
          gsap.to(this.currentActiveMesh.material.uniforms.uProgress, {
            value: 0,
            duration: 1,
            ease: "power2.inOut",
            onUpdate() {
              if (this.progress() >= 0.5) {
                that.slider.ws.enable();
                that.slider.dd.enable();

                that.currentActiveMesh = null;
              }
            },
          });
          this.slider.ig.iterate((item) => {
            gsap.to(item.mesh.material.uniforms.uOpacity, {
              value: 1,
              delay: 0.5,
              ease: "power2.out",
            });
          });
          // this.currentActiveMesh = null;
        }
      });

      document.querySelector(".loader-screen")?.classList.add("hollow");
    });
  }
}
