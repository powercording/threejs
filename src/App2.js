import * as THREE from "../node_modules/three/build/three.module.js";
import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls.js";
import {
  size,
  relativeSize,
  relativeDistance,
  distance,
  solarUniverse,
  orbitRotate,
} from "./const/const.js";

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

    camera.position.z = 40;
    camera.position.y = 10;
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
    // space
    const solarSystem = new THREE.Object3D();
    this.$solarSystem = solarSystem;
    this.$scene.add(solarSystem);

    // start shape
    const radius = size;
    const widthSegments = 64;
    const heightSegments = 64;

    const sphereGeometry = new THREE.SphereGeometry(
      radius,
      widthSegments,
      heightSegments
    );

    // textureLoader
    const textureLoader = new THREE.TextureLoader();

    //sun
    const sunMap = textureLoader.load("../asset/sun.jpg", (texture) => {});
    const sunMaterial = new THREE.MeshStandardMaterial({
      map: sunMap,
    });
    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    sunMesh.scale.set(relativeSize.sun, relativeSize.sun, relativeSize.sun);
    solarSystem.add(sunMesh);
    this.sun = sunMesh;

    //generate stars
    solarUniverse.forEach((star) => {
      console.log(star);
      const orbit = new THREE.Object3D();
      solarSystem.add(orbit);

      const map = textureLoader.load(`../asset/${star}.jpg`, (texture) => {});
      const material = new THREE.MeshStandardMaterial({
        map: map,
      });
      const mesh = new THREE.Mesh(sphereGeometry, material);
      console.log(relativeSize[star]);
      mesh.scale.set(
        relativeSize[star],
        relativeSize[star],
        relativeSize[star]
      );

      orbit.position.x = relativeDistance[star];
      orbit.add(mesh);
      orbit.rotateZ(orbitRotate[star]);

      this[`${star}`] = mesh;
      this[`${star}Orbit`] = orbit;
    });

    //moon
    const moonOrbit = new THREE.Object3D();
    moonOrbit.position.x = 1.5;

    this.earth.add(moonOrbit);
    const moonMap = textureLoader.load("../asset/moon.jpg", (texture) => {});
    const moonMaterial = new THREE.MeshStandardMaterial({
      map: moonMap,
    });

    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
    moonMesh.scale.set(0.3, 0.3, 0.3);
    moonOrbit.add(moonMesh);
    this.moonOrbit = moonOrbit;
  }

  resize() {
    const width = this.$container.clientWidth;
    const height = this.$container.clientHeight;

    this.$camera.aspect = width / height;
    this.$camera.updateProjectionMatrix();

    this.$renderer.setSize(width, height);
  }

  sunUpdate(time) {
    const rotation = time * 0.006;
    this.sun.rotation.y = rotation / 10;
  }

  earthUpdate(time) {
    const angle = time * 0.001;
    const rotation = time * 0.006;
    const radius = relativeDistance.earth;

    // (radius X cos) , (radius X sin)의 좌표값은 빗변의 길이를 radius 만큼으로 한다. 여기서는 10으로 임의로 정했다.
    // angle 의 경우 무한히 증가하는 시간값 (time 파라미터) 이지만 Math.cos 함수가 이를 1~0까지의 값으로 순환시킬 수 있다.
    // 그리하여 시간값의 증가로 인하여 cos 와 sin 은 무한히 1과 0사이를 반복하고 이 값에 반지름을 곱하여 천체 공전의 궤적을 추적할 수 있다.
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    this.earthOrbit.position.x = x;
    this.earthOrbit.position.z = y;

    this.earth.rotation.y = -rotation;
    this.moonOrbit.rotation.y = rotation;
  }

  moonUpdate(time) {
    const angle = time * 0.015;
    const radiust = 2;

    const x = Math.cos(angle) * radiust;
    const z = Math.sin(angle) * radiust;

    this.moonOrbit.position.x = x;
    this.moonOrbit.position.z = z;
  }

  mercuryUpdate(time) {
    const angle = time * 0.004;
    const radius = relativeDistance.mercury;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    this.mercuryOrbit.position.x = x;
    this.mercuryOrbit.position.z = z;
  }

  venusUpdate(time) {
    const angle = time * 0.0022;
    const radius = relativeDistance.venus;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    this.venusOrbit.position.x = x;
    this.venusOrbit.position.z = z;
  }

  marsUpdate(time) {
    const angle = time * 0.00055;
    const radius = relativeDistance.mars;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    this.marsOrbit.position.x = x;
    this.marsOrbit.position.z = z;
  }

  jupiterUpdate(time) {
    const angle = (time * 0.001) / 12;
    const radius = relativeDistance.jupiter;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    this.jupiterOrbit.position.x = x;
    this.jupiterOrbit.position.z = z;
    this.jupiterOrbit.rotation.y = time * 0.001;
  }

  saturnUpdate(time) {
    const angle = (time * 0.001) / 30;
    const radius = relativeDistance.saturn;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    this.saturnOrbit.position.x = x;
    this.saturnOrbit.position.z = z;
    this.saturnOrbit.rotation.y = time * 0.001;
  }

  uranusUpdate(time) {
    const angle = (time * 0.001) / 40;
    const radius = relativeDistance.uranus;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    this.uranusOrbit.position.x = x;
    this.uranusOrbit.position.z = z;
    this.uranusOrbit.rotation.y = time * 0.001;
  }

  neptuneUpdate(time) {
    const angle = (time * 0.001) / 70;
    const radius = relativeDistance.neptune;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    this.neptuneOrbit.position.x = x;
    this.neptuneOrbit.position.z = z;
    this.neptuneOrbit.rotation.y = time * 0.001;
  }

  render(time) {
    this.$renderer.render(this.$scene, this.$camera);
    this.sunUpdate(time);
    this.mercuryUpdate(time);
    this.earthUpdate(time);
    this.moonUpdate(time);
    this.venusUpdate(time);
    this.marsUpdate(time);
    this.jupiterUpdate(time);
    this.saturnUpdate(time);
    this.uranusUpdate(time);
    this.neptuneUpdate(time);
    requestAnimationFrame(this.render.bind(this));
  }
}

window.onload = function () {
  new App();
};
