import * as Three from "three";
// import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "../node_modules/three/examples/jsm/loaders/GLTFLoader.js";

class App {
  constructor() {
    const container = document.querySelector("#container");
    this.$container = container;

    const renderer = new Three.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(1);
    container.appendChild(renderer.domElement);
    this.$renderer = renderer;

    const scene = new Three.Scene();
    this.$scene = scene;

    this.setupVector();
    this.setupCamera();
    this.setupLight();
    this.setupBackgound();
    this.setupModel();
    this.setupRaycaster();
    this.setUpControls();
    this.setupEvent();

    window.onresize = this.resize.bind(this);
    this.resize();
  }

  setupRaycaster() {
    const raycaster = new Three.Raycaster();
    this.$raycaster = raycaster;

    raycaster.setFromCamera(this.$mouse, this.$camera);
  }

  setupVector() {
    const mouse = new Three.Vector3();
    this.$mouse = mouse;
  }

  setUpControls() {
    // new OrbitControls(this.$camera, this.$container);
  }

  setupBackgound() {
    this.$scene.background = new Three.Color("0xffffff");
  }

  setupCamera() {
    const width = this.$container.clientWidth;
    const height = this.$container.clientHeight;
    const aspect = width / height;
    const camera = new Three.PerspectiveCamera(75, aspect, 0.1, 100);

    camera.position.z = 2;
    this.$camera = camera;
    this.$scene.add(camera);
  }

  setupLight() {
    const lightColor = 0xffffff;
    const intensity = 7;
    const light = new Three.DirectionalLight(lightColor, intensity);

    const ambientLight = new Three.AmbientLight(0xffffff, 4);
    ambientLight.position.set(1, 2, 2);
    light.position.set(1, 2, 4);
    this.$camera.add(light);
    this.$scene.add(ambientLight);
  }

  setupModel() {
    const loader = new GLTFLoader();
    loader.load("../public/asset/skull/scene.gltf", (obj) => {
      const skullHead = obj.scene;
      skullHead.rotation.x = 1.2;

      const skull = new Three.Object3D();
      skull.add(skullHead);
      this.$scene.add(skull);
      this.$skull = skull;

      requestAnimationFrame(this.render.bind(this));
    });
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
    // this.$mouse.unproject(this.$camera);
    // const direction = this.$mouse.sub(this.$camera.position).normalize();
    // this.$skull.rotation.y =
    //   -Math.atan2(direction.z, -direction.x) - Math.PI / 2;
    // this.$skull.rotation.x = -Math.asin(direction.y);
  }

  setupEvent() {
    document.addEventListener("mousemove", (e) => {
      const x = e.pageX;
      const y = e.pageY;

      this.$mouse.x = (x / window.innerWidth) * 2 - 1;
      this.$mouse.y = -(y / window.innerHeight) * 2 + 1;
      this.$mouse.z = 0.5;

      this.$mouse.unproject(this.$camera);
      const direction = this.$mouse.sub(this.$camera.position).normalize();

      this.$skull.rotation.y =
        -Math.atan2(direction.z, -direction.x) - Math.PI / 2;

      this.$skull.rotation.x = -Math.asin(direction.y);
    });
  }
}

window.onload = function () {
  new App();
};
