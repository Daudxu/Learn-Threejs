

<template>
  <div class="content">
        <div class="domCanvas" ref="domCanvas"></div>
  </div>
</template>
<script setup>
import * as THREE from "three";
import { OrbitControls }  from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import * as dat from 'dat.gui'

import { onMounted, ref } from "vue";

const gui = new dat.GUI({closed:true,width:500})
const domCanvas = ref(null)
let scene, camera, renderer, geometry, material, mesh, controls, clock;

const width = window.innerWidth
const height = window.innerHeight
onMounted(()=>{
  // 场景
  scene = new THREE.Scene();
  // 相机
  camera = new THREE.PerspectiveCamera(60, width/height, 0.1, 1000);
  camera.position.z = 5;
  // 渲染
  renderer = new THREE.WebGL1Renderer();
  renderer.setSize(width, height);
  domCanvas.value.appendChild(renderer.domElement );
  // 几何体
  geometry = new THREE.BoxGeometry( 1, 1, 1 );
  // material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
  material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );
  // 轨道控制
  controls = new OrbitControls(camera, renderer.domElement);
  controls.update();
  controls.keys = {
    LEFT: 'ArrowLeft', //left arrow
    UP: 'ArrowUp', // up arrow
    RIGHT: 'ArrowRight', // right arrow
    BOTTOM: 'ArrowDown' // down arrow
  }
  // let v = new THREE.Vector3(100, 0, 100)
  // dragControls.target = v
  // trackballControls.target = v
  // camera.lookAt(v)


  clock = new THREE.Clock()
  // gsap.to(mesh.position, {
  //   y: -2, 
  //   duration: 5, 
  //   ease: "bounce.out",
  //   repeat: -1, 
  //   delay: 2,
  //   yoyo: true,
  // })


  // gsap.to(mesh.position, {
  //   x: 5, 
  //   duration: 5, 
  //   ease: "powerl.inOut", 
  //   repeat: -1, 
  //   delay: 2,
  //   yoyo: true,
  //   onComplete: () => {console.log(1)},
  //   onStart: () => {console.log(2)}
  // })
  animat();
})
var theta=0;
const animat = () => {
  // const time = clock.getDelta()
  // console.log("time", time)
  // let timea = clock.getElapsedTime();

  // console.log("时钟运行总时长：", timea);
  // let t = timea % 5
  // theta+=0.02;
  // camera.rotation.y=theta;
  // camera.position.set(5*Math.sin(theta),0,5*Math.cos(theta));
        
  // console.log("t", 25 % 5);
  // mesh.position.x = t * 1;
// let vect = camera.getWorldDirection(new THREE.Vector3());
// if (front) {
  // camera.position.z += vect.dot(new THREE.Vector3(0, 0, 1)) * (t *0.01);
  // camera.position.x += vect.dot(new THREE.Vector3(15, 0, 0)) * 0.01;
// }
  requestAnimationFrame(animat);
  renderer.render(scene, camera);
}
</script>
<style scoped>

</style>
