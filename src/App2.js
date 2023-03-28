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

    camera.position.z = 25;
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
    const solarSystem = new THREE.Object3D();
    this.$scene.add(solarSystem);

    const radius = 1;
    const widthSegments = 24;
    const heightSegments = 24;

    const sphereGeometry = new THREE.SphereGeometry(
      radius,
      widthSegments,
      heightSegments
    );

    const sunMaterial = new THREE.MeshPhongMaterial({
      emissive: 0xffff00,
      flatShading: true,
    });

    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    sunMesh.scale.set(3, 3, 3);
    solarSystem.add(sunMesh);
    this.$sunMesh = sunMesh;

    const earthOrbit = new THREE.Object3D();
    solarSystem.add(earthOrbit);

    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0x2233ff,
      emissive: 0x112244,
      flatShading: true,
    });
    const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
    earthOrbit.position.x = 10;
    earthOrbit.add(earthMesh);

    const moonOrbit = new THREE.Object3D();
    moonOrbit.position.x = 2;
    earthOrbit.add(moonOrbit);

    const moonMaterial = new THREE.MeshPhongMaterial({
      color: 0x888888,
      emissive: 0x222222,
      flatShading: true,
    });

    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
    moonMesh.scale.set(0.4, 0.4, 0.4);
    moonOrbit.add(moonMesh);

    this.$solarSystem = solarSystem;
    this.$earthOrbit = earthOrbit;
    this.$moonOrbit = moonOrbit;
  }

  resize() {
    const width = this.$container.clientWidth;
    const height = this.$container.clientHeight;

    this.$camera.aspect = width / height;
    this.$camera.updateProjectionMatrix();

    this.$renderer.setSize(width, height);
  }

  update(time) {
    // const milTime = time * 0.001;
    // const x = 10 ** 2 - milTime ** 2;
    // const y = 10 ** 2 - x ** 2;
    // console.log(Math.sqrt(x));
    // this.$earthOrbit.position.x = Math.sqrt(x);
    // this.$earthOrbit.position.y = Math.sqrt(y);
  }

  earthUpdate(time) {
    const angle = time * 0.001;
    const rotation = time * 0.006;

    // (radius X cos) , (radius X sin)의 좌표값은 빗변의 길이를 radius 만큼으로 한다. 여기서는 10으로 임의로 정했다.
    // angle 의 경우 무한히 증가하는 시간값 (time 파라미터) 이지만 Math.cos 함수가 이를 1~0까지의 값으로 순환시킬 수 있다.
    // 그리하여 시간값의 증가로 인하여 cos 와 sin 은 무한히 1과 0사이를 반복하고 이 값에 반지름을 곱하여 천체 공전의 궤적을 추적할 수 있다.
    const x = Math.cos(angle) * 10;
    const y = Math.sin(angle) * 10;

    this.$earthOrbit.position.x = x;
    this.$earthOrbit.position.z = y;

    this.$sunMesh.rotation.y = rotation / 10;
    this.$earthOrbit.rotation.y = rotation;
    this.$moonOrbit.rotation.y = rotation;
  }

  render(time) {
    this.$renderer.render(this.$scene, this.$camera);
    // this.update(time);
    this.earthUpdate(time);
    requestAnimationFrame(this.render.bind(this));
  }
}

window.onload = function () {
  new App();
};
