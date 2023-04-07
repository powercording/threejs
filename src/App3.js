import * as THREE from "../node_modules/three/build/three.module.js";
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js";
import { RectAreaLightUniformsLib } from "../node_modules/three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import { RectAreaLightHelper } from "../node_modules/three/examples/jsm/helpers/RectAreaLightHelper.js";

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

    // camera.position.z = 2;
    camera.position.set(7, 7, 0);
    camera.lookAt(0, 0, 0);
    this.$camera = camera;
  }

  setupLight() {
    // const light = new THREE.AmbientLight(0xffffff, 35);
    // const light = new THREE.HemisphereLight("#b0d8f5", "#bb7a1c", 1);

    //directionLight
    // const light = new THREE.DirectionalLight("#ffffff", 1);
    // light.position.set(0, 5, 0);
    // light.target.position.set(0, 0, 0);
    // this.$scene.add(light.target);

    // const helper = new THREE.DirectionalLightHelper(light);
    // this.$scene.add(helper);
    // this.$lightHelper = helper;

    //PointLight
    // const light = new THREE.PointLight(0xffffff, 2);
    // light.position.set(0, 5, 0);

    // light.distance = 0;

    // const helper = new THREE.PointLightHelper(light);
    // this.$scene.add(helper);

    // spotLight;
    // const light = new THREE.SpotLight(0xffffff, 1);
    // light.position.set(0, 5, 0);
    // light.target.position.set(0, 1, 0);
    // light.angle = THREE.MathUtils.degToRad(30);
    // light.penumbra = 0.3;
    // this.$scene.add(light.target);

    // const helper = new THREE.SpotLightHelper(light);
    // this.$scene.add(helper);
    // this.$lightHelper = helper;

    //RecAreaLight
    RectAreaLightUniformsLib.init();

    const light = new THREE.RectAreaLight("white", 10, 6, 2);
    light.position.set(0, 5, 0);
    light.rotation.x = THREE.MathUtils.degToRad(-45);

    const helper = new RectAreaLightHelper(light);
    light.add(helper);

    this.$scene.add(light);
    this.$light = light;
  }

  setupModel() {
    const groundGeometry = new THREE.PlaneGeometry(10, 10);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: "#2c3e50",
      roughness: 0.5,
      metalness: 0.5,
      side: THREE.DoubleSide,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = THREE.MathUtils.degToRad(-90);
    this.$scene.add(ground);

    const bigSphereGeometry = new THREE.SphereGeometry(1.5, 64, 64, 0, Math.PI);
    const bigSphereMaterial = new THREE.MeshStandardMaterial({
      color: "#ffffff",
      roughness: 0.1,
      metalness: 0.2,
    });
    const bigSphere = new THREE.Mesh(bigSphereGeometry, bigSphereMaterial);
    bigSphere.rotation.x = THREE.MathUtils.degToRad(-90);
    this.$scene.add(bigSphere);

    const torusGeometry = new THREE.TorusGeometry(0.4, 0.1, 32, 32);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: "#9b59b6",
      roughness: "0.5",
      metalness: "0.9",
    });

    for (let i = 0; i < 8; i++) {
      const torusPivot = new THREE.Object3D();
      const torus = new THREE.Mesh(torusGeometry, torusMaterial);
      torusPivot.rotation.y = THREE.MathUtils.degToRad(45 * i);
      torus.position.set(3, 0.5, 0);
      torusPivot.add(torus);
      this.$scene.add(torusPivot);
    }

    const smallSphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const smallSphereMaterial = new THREE.MeshStandardMaterial({
      color: "#e74c3c",
      roughness: "0.2",
      metalness: "0.5",
    });
    const smallSpherePivot = new THREE.Object3D();
    const smallSphere = new THREE.Mesh(
      smallSphereGeometry,
      smallSphereMaterial
    );
    smallSpherePivot.add(smallSphere);
    smallSpherePivot.name = "smallSpherePivot";
    smallSphere.position.set(3, 0.5, 0);
    this.$scene.add(smallSpherePivot);
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
    const smallSpherePivot = this.$scene.getObjectByName("smallSpherePivot");
    if (smallSpherePivot) {
      smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(milTime * 100);

      // if (this.$light) {
      //   const smallSphere = smallSpherePivot.children[0];
      //   smallSphere.getWorldPosition(this.$light.position);

      //   if (this.$lightHelper) this.$lightHelper.update();
      // }

      if (this.$light.target) {
        const smallSphere = smallSpherePivot.children[0];
        smallSphere.getWorldPosition(this.$light.target.position);

        if (this.$lightHelper) this.$lightHelper.update();
      }
    }
  }
}

new App();
