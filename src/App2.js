import * as THREE from "../node_modules/three/build/three.module.js";
import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls.js";

class App {
  constructor() {
    const container = document.querySelector("#container");
    this.$container = container;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    this.$renderer = renderer;

    const scene = new THREE.Scene();
    this.$scene = scene;

    this.setupCamera();
    this.setupLight();
    this.setupModel();
    this.setControls();

    window.onresize = this.resize.bind(this);
    this.resize();

    requestAnimationFrame(this.render.bind(this));
  }

  setControls() {
    new OrbitControls(this.$camera, this.$container);
  }

  setupCamera() {
    const width = this.$container.clientWidth;
    const height = this.$container.clientHeight;
    const aspect = width / height;
    const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100);

    camera.position.z = 15;
    this.$camera = camera;
  }

  setupLight() {
    const lightColor = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(lightColor, intensity);

    light.position.set(-2, 2, 4);
    this.$scene.add(light);
  }

  setupModel() {
    class CustomSinCurve extends THREE.Curve {
      constructor(scale) {
        super();
        this.scale = scale;
      }
      getPoint(t) {
        const tx = t * 3 - 1.5;
        const ty = Math.sin(2 * Math.PI * t);
        const tz = 0;
        return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
      }
    }

    const path = new CustomSinCurve(4);
    const geometry = new THREE.TubeGeometry(path);

    const fillMaterial = new THREE.MeshPhongMaterial({ color: 0x515151 });
    const cube = new THREE.Mesh(geometry, fillMaterial);

    const material = new THREE.LineBasicMaterial({ color: 0xffff00 });
    const line = new THREE.LineSegments(
      new THREE.WireframeGeometry(geometry),
      material
    );

    const group = new THREE.Group();
    group.add(cube);
    group.add(line);

    this.$scene.add(group);
    this.$cube = group;
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
    // this.update(time);
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
