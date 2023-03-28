import * as THREE from "../node_modules/three/build/three.module.js";
import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls.js";

const distance = 12;
const relativeDistance = {
  mercury: 0.4,
  venus: 0.7,
  earth: 1,
  mars: 1.5,
  jupiter: 2,
  saturn: 3,
  uranus: 4,
  neptune: 5,
};

const size = 1;
const relativeSize = {
  sun: 3,
  mercury: 0.4,
  venus: 0.5,
  earth: 0.9,
  mars: 0.5,
  jupiter: 2,
  saturn: 1.8,
  uranus: 1.18,
  neptune: 1.18,
};

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
    const textureLoader = new THREE.TextureLoader();

    const sunMap = textureLoader.load(
      "../asset/sunTexture.jpg",
      (texture) => {}
    );
    const mercuryMap = textureLoader.load(
      "../asset/mercuryTexture.jpg",
      (texture) => {}
    );
    const venusMap = textureLoader.load(
      "../asset/venusTexture.jpg",
      (texture) => {}
    );
    const earthMap = textureLoader.load(
      "../asset/earthmap1k.jpg",
      (texture) => {}
    );
    const moonMap = textureLoader.load(
      "../asset/moonTexture.jpg",
      (texture) => {}
    );
    const marsMap = textureLoader.load(
      "../asset/marsTexture.jpg",
      (texture) => {}
    );
    const jupiterMap = textureLoader.load(
      "../asset/jupiterTexture.jpg",
      (texture) => {}
    );
    const saturnMap = textureLoader.load(
      "../asset/saturnTexture.jpg",
      (texture) => {}
    );
    const uranusMap = textureLoader.load(
      "../asset/uranusTexture.jpg",
      (texture) => {}
    );
    const neptuneMap = textureLoader.load(
      "../asset/neptuneTexture.jpg",
      (texture) => {}
    );

    const radius = size;
    const widthSegments = 64;
    const heightSegments = 64;

    const sphereGeometry = new THREE.SphereGeometry(
      radius,
      widthSegments,
      heightSegments
    );

    //space
    const solarSystem = new THREE.Object3D();
    this.$solarSystem = solarSystem;
    this.$scene.add(solarSystem);

    //sun
    const sunMaterial = new THREE.MeshStandardMaterial({
      map: sunMap,
    });

    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    sunMesh.scale.set(relativeSize.sun, relativeSize.sun, relativeSize.sun);
    solarSystem.add(sunMesh);
    this.$sunMesh = sunMesh;

    //earth
    const earthOrbit = new THREE.Object3D();
    earthOrbit.scale.set(
      relativeSize.earth,
      relativeSize.earth,
      relativeSize.earth
    );
    solarSystem.add(earthOrbit);

    const earthMaterial = new THREE.MeshStandardMaterial({
      map: earthMap,
    });

    const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
    earthOrbit.position.x = distance;
    earthOrbit.add(earthMesh);
    earthOrbit.rotateZ(0.4);

    //moon
    const moonOrbit = new THREE.Object3D();
    moonOrbit.position.x = 1.5;

    earthOrbit.add(moonOrbit);
    const moonMaterial = new THREE.MeshStandardMaterial({
      map: moonMap,
    });

    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
    moonMesh.scale.set(0.3, 0.3, 0.3);
    moonOrbit.add(moonMesh);

    //mercury
    const mercuryOrbit = new THREE.Object3D();
    mercuryOrbit.scale.set(
      relativeSize.mercury,
      relativeSize.mercury,
      relativeSize.mercury
    );
    mercuryOrbit.position.x = distance * relativeDistance.mercury;
    mercuryOrbit.scale.set(
      relativeSize.mercury,
      relativeSize.mercury,
      relativeSize.mercury
    );
    solarSystem.add(mercuryOrbit);

    const mercuryMaterial = new THREE.MeshStandardMaterial({
      map: mercuryMap,
    });
    const mercuryMesh = new THREE.Mesh(sphereGeometry, mercuryMaterial);
    mercuryOrbit.add(mercuryMesh);
    this.$mercuryOrbit = mercuryOrbit;

    //venus
    const venusOrbit = new THREE.Object3D();
    venusOrbit.position.x = distance * relativeDistance.venus;
    venusOrbit.scale.set(
      relativeSize.venus,
      relativeSize.venus,
      relativeSize.venus
    );
    solarSystem.add(venusOrbit);

    const venusMaterial = new THREE.MeshStandardMaterial({
      map: venusMap,
    });
    const venusMesh = new THREE.Mesh(sphereGeometry, venusMaterial);
    venusOrbit.add(venusMesh);
    this.$venusOrbit = venusOrbit;

    //mars
    const marsOrbit = new THREE.Object3D();
    marsOrbit.position.x = distance * relativeDistance.mars;
    marsOrbit.scale.set(
      relativeSize.mars,
      relativeSize.mars,
      relativeSize.mars
    );
    solarSystem.add(marsOrbit);

    const marseMaterial = new THREE.MeshStandardMaterial({
      map: marsMap,
    });
    const marseMesh = new THREE.Mesh(sphereGeometry, marseMaterial);
    marsOrbit.add(marseMesh);
    this.$marsOrbit = marsOrbit;

    //jupiter
    const jupiterOrbit = new THREE.Object3D();
    jupiterOrbit.position.x = distance * relativeDistance.jupiter;
    jupiterOrbit.scale.set(
      relativeSize.jupiter,
      relativeSize.jupiter,
      relativeSize.jupiter
    );
    solarSystem.add(jupiterOrbit);

    const jupiterMaterial = new THREE.MeshStandardMaterial({
      map: jupiterMap,
    });
    const jupiterMesh = new THREE.Mesh(sphereGeometry, jupiterMaterial);
    jupiterOrbit.add(jupiterMesh);
    this.$jupiterOrbit = jupiterOrbit;

    //saturn
    const saturnOrbit = new THREE.Object3D();
    saturnOrbit.position.x = distance * relativeDistance.saturn;
    saturnOrbit.scale.set(
      relativeSize.saturn,
      relativeSize.saturn,
      relativeSize.saturn
    );
    solarSystem.add(saturnOrbit);

    const saturnMaterial = new THREE.MeshStandardMaterial({
      map: saturnMap,
    });
    const saturnMesh = new THREE.Mesh(sphereGeometry, saturnMaterial);
    saturnOrbit.add(saturnMesh);
    this.$saturnOrbit = saturnOrbit;

    //uranus
    const uranusOrbit = new THREE.Object3D();
    uranusOrbit.position.x = distance * relativeDistance.uranus;
    solarSystem.add(uranusOrbit);

    const uranusMaterial = new THREE.MeshStandardMaterial({
      map: uranusMap,
    });
    const uranusMesh = new THREE.Mesh(sphereGeometry, uranusMaterial);
    uranusOrbit.add(uranusMesh);
    this.$uranusOrbit = uranusOrbit;

    //neptune
    const neptuneOrbit = new THREE.Object3D();
    neptuneOrbit.position.x = distance * relativeDistance.neptune;
    solarSystem.add(neptuneOrbit);

    const neptuneMaterial = new THREE.MeshStandardMaterial({
      map: neptuneMap,
    });
    const neptuneMesh = new THREE.Mesh(sphereGeometry, neptuneMaterial);
    neptuneOrbit.add(neptuneMesh);
    this.$neptuneOrbit = neptuneOrbit;

    this.$earthMesh = earthMesh;
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

  sunUpdate(time) {
    const rotation = time * 0.006;
    this.$sunMesh.rotation.y = rotation / 10;
  }

  earthUpdate(time) {
    const angle = time * 0.001;
    const rotation = time * 0.006;
    const radius = distance;

    // (radius X cos) , (radius X sin)의 좌표값은 빗변의 길이를 radius 만큼으로 한다. 여기서는 10으로 임의로 정했다.
    // angle 의 경우 무한히 증가하는 시간값 (time 파라미터) 이지만 Math.cos 함수가 이를 1~0까지의 값으로 순환시킬 수 있다.
    // 그리하여 시간값의 증가로 인하여 cos 와 sin 은 무한히 1과 0사이를 반복하고 이 값에 반지름을 곱하여 천체 공전의 궤적을 추적할 수 있다.
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    this.$earthOrbit.position.x = x;
    this.$earthOrbit.position.z = y;

    this.$earthMesh.rotation.y = -rotation;
    this.$moonOrbit.rotation.y = rotation;
  }

  moonUpdate(time) {
    const angle = time * 0.015;
    const radiust = 2;

    const x = Math.cos(angle) * radiust;
    const z = Math.sin(angle) * radiust;

    this.$moonOrbit.position.x = x;
    this.$moonOrbit.position.z = z;
  }

  mercuryUpdate(time) {
    const angle = time * 0.004;
    const radius = distance * relativeDistance.mercury;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    this.$mercuryOrbit.position.x = x;
    this.$mercuryOrbit.position.z = z;
  }

  venusUpdate(time) {
    const angle = time * 0.0022;
    const radius = distance * relativeDistance.venus;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    this.$venusOrbit.position.x = x;
    this.$venusOrbit.position.z = z;
  }

  marsUpdate(time) {
    const angle = time * 0.00055;
    const radius = distance * relativeDistance.mars;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    this.$marsOrbit.position.x = x;
    this.$marsOrbit.position.z = z;
  }

  jupiterUpdate(time) {
    const angle = (time * 0.001) / 12;
    const radius = distance * relativeDistance.jupiter;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    this.$jupiterOrbit.position.x = x;
    this.$jupiterOrbit.position.z = z;
    this.$jupiterOrbit.rotation.y = time * 0.001;
  }

  saturnUpdate(time) {
    const angle = (time * 0.001) / 30;
    const radius = distance * relativeDistance.saturn;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    this.$saturnOrbit.position.x = x;
    this.$saturnOrbit.position.z = z;
    this.$saturnOrbit.rotation.y = time * 0.001;
  }

  uranusUpdate(time) {
    const angle = (time * 0.001) / 40;
    const radius = distance * relativeDistance.uranus;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    this.$uranusOrbit.position.x = x;
    this.$uranusOrbit.position.z = z;
    this.$uranusOrbit.rotation.y = time * 0.001;
  }

  neptuneUpdate(time) {
    const angle = (time * 0.001) / 70;
    const radius = distance * relativeDistance.neptune;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    this.$neptuneOrbit.position.x = x;
    this.$neptuneOrbit.position.z = z;
    this.$neptuneOrbit.rotation.y = time * 0.001;
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
