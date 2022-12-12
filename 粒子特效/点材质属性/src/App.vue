

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
let scene, camera, renderer, geometry, material, mesh, controls, clock;

const width = window.innerWidth
const height = window.innerHeight


onMounted(()=>{
  // 场景
  scene = new THREE.Scene();
  // 相机
  camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
  camera.position.set(0, 0, 10);
  scene.add(camera)
  // 坐标轴
  const axesHelper = new THREE.AxesHelper( 7 );
  scene.add( axesHelper );
  // 创建球形几何体
  const sphereGeometry = new THREE.SphereBufferGeometry(3, 20, 20);
  // const material = new THREE.MeshBasicMaterial({
  //   color: 0xff0000,
  //   wireframe: true
  // });

  // const mesh = new THREE.Mesh(sphereGeometry, material);
  // scene.add(mesh)
  // 设置材质
  const pointsMaterial = new THREE.PointsMaterial();
  pointsMaterial.size = 0.1;
  pointsMaterial.color.set(0xfff000)
  // 相机深度不衰减
  pointsMaterial.sizeAttenuation = true
  
  // 载入纹理
  const textureLoader = new THREE.TextureLoader();
  const textures = textureLoader.load("./textures/particles/2.png");
  // 设置点材质和纹理
  pointsMaterial.map = textures;
  pointsMaterial.alphaMap = textures;
  pointsMaterial.transparent = true;
  pointsMaterial.depthWrite = false;
  pointsMaterial.blending = THREE.AdditiveBlending;

  const points = new THREE.Points(sphereGeometry, pointsMaterial);
  scene.add(points)
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

const animat = () => {

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
