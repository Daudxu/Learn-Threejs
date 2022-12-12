

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
let scene, camera, renderer, geometry, material, mesh, controls, clock, points, points1, points2;

const width = window.innerWidth
const height = window.innerHeight

function createPoints(url, size = 0.5) {

  const particlesGeometry = new THREE.BufferGeometry();
  const count = 5000;
  // 设置缓冲区数组
  const positions = new Float32Array(count * 3);
  // 设置顶点颜色
  const colors = new Float32Array(count * 3)
  // 设置顶点
  for(let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 100;
      colors[i] = Math.random();
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  )
  particlesGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(colors, 3)
  )
  // 设置材质
  const pointsMaterial = new THREE.PointsMaterial();
  pointsMaterial.size = size;
  pointsMaterial.color.set(0xfff000)
  // 相机深度不衰减
  pointsMaterial.sizeAttenuation = true
  
  // 载入纹理
  const textureLoader = new THREE.TextureLoader();
  const textures = textureLoader.load(`./textures/particles/${url}.png`);
  // 设置点材质和纹理
  pointsMaterial.map = textures;
  pointsMaterial.alphaMap = textures;
  pointsMaterial.transparent = true;
  pointsMaterial.depthWrite = false;
  pointsMaterial.blending = THREE.AdditiveBlending;
  pointsMaterial.vertexColors = true

  var points = new THREE.Points(particlesGeometry, pointsMaterial);
  scene.add(points)
  return points
}

onMounted(()=>{
  // 场景
  scene = new THREE.Scene();
  // 相机
  camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
  camera.position.set(0, 0, 40);
  scene.add(camera)
  
  points = createPoints("xh", 0.5)
  points1 = createPoints("1", 0.5)
  points2 = createPoints("2", 0.5)
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
  // console.log("===")
  clock = new THREE.Clock()
  animat();
})
// const clock = new THREE.Clock()
const animat = () => {
  let time = clock.getElapsedTime();
  points.rotation.x = time * 0.3;
  points1.rotation.x = time * 0.5;
  points1.rotation.y = time * 0.4;
  points2.rotation.x = time * 0.2;
  points2.rotation.y = time * 0.1;
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
