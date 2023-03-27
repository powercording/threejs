//  setupModel() {
//     class CustomSinCurve extends THREE.Curve {
//       constructor(scale) {
//         super();
//         this.scale = scale;
//       }
//       getPoint(t) {
//         const tx = t * 3 - 1.5;
//         const ty = Math.sin(2 * Math.PI * t);
//         const tz = 0;
//         return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
//       }
//     }

//     const path = new CustomSinCurve(4);
//     const geometry = new THREE.TubeGeometry(path);

//     const fillMaterial = new THREE.MeshPhongMaterial({ color: 0x515151 });
//     const cube = new THREE.Mesh(geometry, fillMaterial);

//     const material = new THREE.LineBasicMaterial({ color: 0xffff00 });
//     const line = new THREE.LineSegments(
//       new THREE.WireframeGeometry(geometry),
//       material
//     );

//     const group = new THREE.Group();
//     group.add(cube);
//     group.add(line);

//     this.$scene.add(group);
//     this.$cube = group;
//   }
