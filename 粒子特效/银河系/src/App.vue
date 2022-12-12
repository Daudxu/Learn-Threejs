

<template>
  <div class="content">
        <div class="domCanvas" ref="domCanvas"></div>
  </div>
</template>
<script setup>
import * as THREE from "three";
import { OrbitControls }  from "three/examples/jsm/controls/OrbitControls";
// import gsap from "gsap";
// import * as dat from 'dat.gui'

import { onMounted, ref } from "vue";

// const gui = new dat.GUI({closed:true,width:500})
const domCanvas = ref(null)
let scene, camera, renderer, mesh, controls, clock;

const width = window.innerWidth
const height = window.innerHeight

const params = {
  count: 100,
  size: 0.1,
  radius: 5,
  branch: 3,
  color: "#ffffff"
}
  // 载入纹理
const textureLoader = new THREE.TextureLoader();
const textures = textureLoader.load(`./textures/particles/1.png`);

let geometry = null 
let material = null 
let points = null 

const generateGalaxy = () => {
   // 生成顶点
   geometry = new THREE.BufferGeometry();
   // 随机生成位置和
   const positions = new Float32Array(params.count * 3)
   // 设置顶点颜色
   const colors = new Float32Array(params.count * 3)
   // 循环生成点
   for(let i = 0; i < params.count; i++){
       const current = i * 3;
       positions[current] = Math.random() * params.radius;
       positions[current + 1] = 0;
       positions[current + 2] = 0;
   }

   geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

   // 设置点材质
   material = new THREE.PointsMaterial({
    color: new THREE.Color(params.color),
    size: params.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    map: textures,
    alphaMap: textures,
    transparent: true,
    // vertexColors: true
   })
   points = new THREE.Points(geometry, material);
   scene.add(points)
}

onMounted(()=>{
  // 场景
  scene = new THREE.Scene();
  // 相机
  camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
  camera.position.set(0, 0, 40);
  scene.add(camera)
  const axesHelper = new THREE.AxesHelper( 5 );
  scene.add( axesHelper );
  generateGalaxy()
  // 渲染
  renderer = new THREE.WebGL1Renderer({
    // antialias: true
  });
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  renderer.physicallyCorrectLights - true;
  domCanvas.value.appendChild(renderer.domElement);

  // 轨道控制
  controls = new OrbitControls(camera, renderer.domElement);
  controls.update();
  clock = new THREE.Clock()
  animat();
})
// const clock = new THREE.Clock()
const animat = () => {
  let time = clock.getElapsedTime();
  renderer.render(scene, camera);
  requestAnimationFrame(animat);
}
</script>
<style scoped>
.home-content {
   position: fixed;
   top:0;
   right: 20px;
   padding: 20px;
}
.home-content .home-content-title {
   text-align: center;
}

.select-item-color {
  width: 50px;
  height: 50px;
  border: 1px solid #fff;
  margin: 10px;
  display: inline-block;
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.select {
   display: flex;
}
</style>
