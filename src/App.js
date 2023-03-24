import * as Three from "../node_modules/three/build/three.module.js";

class App {
  constructor() {
    const container = document.querySelector("#container");
    this.$container = container;

    const renderer = new Three.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    this.$renderer = renderer;

    const scene = new Three.Scene();
    this.$scene = scene;

    this.setupCamera();
    this.setupLight();
    this.setupModel();

    window.onresize = this.resize.bind(this);
    this.resize();

    requestAnimationFrame(this.render.bind(this));
  }

  setupCamera() {
    const width = this.$container.clientWidth;
    const height = this.$container.clientHeight;
    const aspect = width / height;
    const camera = new Three.PerspectiveCamera(75, aspect, 0.1, 100);

    camera.position.z = 2;
    this.$camera = camera;
  }

  setupLight() {
    const lightColor = 0xffffff;
    const intensity = 1;
    const light = new Three.DirectionalLight(lightColor, intensity);

    light.position.set(-1, 2, 4);
    this.$scene.add(light);
  }

  setupModel() {
    const geometry = new Three.BoxGeometry(1, 1, 1);
    const material = new Three.MeshPhongMaterial({ color: 0x44a88 });

    const cube = new Three.Mesh(geometry, material);
    this.$scene.add(cube);
    this.$cube = cube;
  }

  resize() {
    const width = this.$container.clientWidth;
    const height = this.$container.clientHeight;

    this.$camera.aspect = width / height;
    this.$camera.updateProjectionMatrix();

    this.$renderer.setSize(width, height);
  }

  render(time) {
    this.$renderer.render(this.$scene, this.$camera);
    this.update(time);
    requestAnimationFrame(this.render.bind(this));
  }

  update(time) {
    const milTime = time * 0.001;
    this.$cube.rotation.x = milTime;
    this.$cube.rotation.y = milTime;
  }
}

window.onload = function () {
  new App();
};
