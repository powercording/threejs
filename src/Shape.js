//  setupModel() {
//     const shape = new THREE.Shape();
//     const x = -2.5;
//     const y = -5;

//     shape.moveTo(x + 2.5, y + 2.5);
//     shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
//     shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3, 5);
//     shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
//     shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
//     shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
//     shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

//     const geometry = new THREE.ShapeGeometry(shape);

//     const fillMaterial = new THREE.MeshPhongMaterial({ color: 0x515151 });
//     const cube = new THREE.Mesh(geometry, fillMaterial);

//     const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff0 });
//     const line = new THREE.LineSegments(
//       new THREE.WireframeGeometry(geometry),
//       lineMaterial
//     );

//     const group = new THREE.Group();
//     group.add(cube);
//     group.add(line);

//     this.$scene.add(group);
//     this.$cube = group;
//   }
