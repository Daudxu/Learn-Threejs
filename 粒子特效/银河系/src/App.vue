

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
  count: 10000,
  size: 0.1,
  radius: 5,
  branch: 6,
  color: "#ff6030",
  endColor: "#1b3984",
  rotateScale: 0.3
}
  // 载入纹理
const textureLoader = new THREE.TextureLoader();
const textures = textureLoader.load(`./textures/particles/1.png`);

let geometry = null 
let material = null 
let points = null 
// 混合颜色 形成渐变色
const centerColor = new THREE.Color(params.color);
const endColor = new THREE.Color(params.endColor)
const generateGalaxy = () => {
   // 生成顶点
   geometry = new THREE.BufferGeometry();
   // 随机生成位置和
   const positions = new Float32Array(params.count * 3)
   // 设置顶点颜色
   const colors = new Float32Array(params.count * 3)

   // 循环生成点
   for(let i = 0; i < params.count; i++){

       // 当前点在哪个分支角度上
       const branchAngel = (i % params.branch) * ((2 * Math.PI) / params.branch)
      
       // 当前点距离圆心位置
       const distance = Math.random() * params.radius * Math.pow(Math.random() , 3);
       const current = i * 3;
       
       const randomX = Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance) / 5
       const randomY = Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance) / 5
       const randomZ = Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance) / 5

       positions[current] = Math.cos(branchAngel + distance * params.rotateScale) * distance + randomX;
       positions[current + 1] = 0 + randomY;
       positions[current + 2] = Math.sin(branchAngel + distance * params.rotateScale) * distance + randomZ;

       // 混合颜色 形成渐变色
       const mixColor = centerColor.clone();
       mixColor.lerp(endColor, distance / params.radius);

       colors[current] = mixColor.r
       colors[current+1] = mixColor.g
       colors[current+2] = mixColor.b

   }

   geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
   geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
   // 设置点材质
   material = new THREE.PointsMaterial({
    // color: new THREE.Color(params.color),
    size: params.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    map: textures,
    alphaMap: textures,
    transparent: true,
    vertexColors: true
   })
   points = new THREE.Points(geometry, material);
   scene.add(points)
}

onMounted(()=>{
  // 场景
  scene = new THREE.Scene();
  // 相机
  camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
  camera.position.set(0, 0, 10);
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
