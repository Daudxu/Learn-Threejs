

<template>
  <div class="content">
        <div class="domCanvas" ref="domCanvas"></div>
        <div class="home-content">
          <div class="home-content-title">
              <h1>车辆可定制选择</h1>
          </div>
          <h2>车身颜色</h2>
          <div class="select">
              <div class="select-item" v-for="(item, index) in colors" :key="index" @click="selectColor(index)">
                <div class="select-item-color" :style="{backgroundColor: item}"></div>
              </div>
          </div>
          <h2>轮毂地盘颜色</h2>
          <div class="select">
              <div class="select-item" v-for="(item, index) in colors" :key="index" @click="selectFootColor(index)">
                <div class="select-item-color" :style="{backgroundColor: item}"></div>
              </div>
          </div>
          <h2>车身材质</h2>
          <div class="select">
              <div class="select-item" v-for="(item, index) in roughness" :key="index" @click="selectRoughness(item.value)">
                <div class="select-item-color" >{{item.name}}</div>
              </div>
          </div>
        </div>
  </div>
</template>
<script setup>
import * as THREE from "three";
import { OrbitControls }  from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader }  from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader }  from "three/examples/jsm/loaders/DRACOLoader"; 
import gsap from "gsap";
// import * as dat from 'dat.gui'

import { onMounted, ref } from "vue";

// const gui = new dat.GUI({closed:true,width:500})
const domCanvas = ref(null)
let scene, camera, renderer, geometry, material, mesh, controls, clock;

const width = window.innerWidth
const height = window.innerHeight

const colors = [
  "red",
  "blue",
  "green",
  "gray",
  "orange",
  "purple",
]
const roughness = [
   {'name': "光滑", 'value': 0.5},
   {'name': "磨砂", 'value': 1}
]

const selectColor = (index)=>{
  bodyMaterial.color.set(colors[index])
}

const selectFootColor = (index)=>{
  wheelsMaterial.color.set(colors[index])
}

const selectRoughness = (value)=>{
  bodyMaterial.roughness = value
}

let wheels = []
let carBody, frontCar, hoodCar, glassCar

const bodyMaterial = new THREE.MeshPhysicalMaterial({
   color: 0x008000,
   metalness: 1,
   roughness: 0.5,
   clearcoat: 1,
   clearcoatRoughness: 0
})

const wheelsMaterial = new THREE.MeshPhysicalMaterial({
   color: 0x008000,
   metalness: 1,
   roughness: 0.1,
})

const glassMaterial = new THREE.MeshPhysicalMaterial({
   color: 0xffffff,
   metalness: 0,
   roughness: 0,
   transmission: 1,
   transparent: true
})

onMounted(()=>{
  // 场景
  scene = new THREE.Scene();
  // 相机
  camera = new THREE.PerspectiveCamera(60, width/height, 0.1, 1000);
  camera.position.set(0, 5, 6);
  // 渲染
  renderer = new THREE.WebGL1Renderer({
    antialias: true
  });
  renderer.setSize(width, height);
  renderer.setClearColor("#000")
  scene.background = new THREE.Color("#ccc")
  scene.environment = new THREE.Color("#ccc")
  domCanvas.value.appendChild(renderer.domElement );

  // 添加网格
  const gridHelper = new THREE.GridHelper(20, 20)
  gridHelper.material.opacity = 0.2;
  gridHelper.material.transparent = true;
  scene.add(gridHelper)
  
  // 添加模型
  const loader = new GLTFLoader();
  const dracoloder = new DRACOLoader();
  dracoloder.setDecoderPath("./draco/glft")
  loader.setDRACOLoader(dracoloder);
  loader.load("./free_koenigsegg_gemera.glb", (glft)=> {
    const m = glft.scene;
    m.position.set(0,0,0);
    m.rotation.y = Math.PI / 1.6
    gsap.to(m.rotation, {
      y: 10, 
      duration: 10, // 需要的时间，5秒
      ease: 'power1.inOut', // 动画执行方式
      repeat:-1,
      yoyo: true, 
    })

    m.traverse((child) => {
       if(child.isMesh) {
          console.log("m", child.name)
       }
       // 车身
       if(child.isMesh && child.name.includes("Object_4")) {
           carBody = child
       }
       // 轮毂
       if(child.isMesh && child.name.includes("Object_49")) {
           frontCar = child
           frontCar.material = wheelsMaterial;
       }
       // 挡风玻璃
       if(child.isMesh && child.name.includes("Object_28")) {
           glassCar = child
           carBody.material = bodyMaterial;
           glassCar.material = glassMaterial;
       }
    })

    scene.add(m)
  })

  // 添加灯光
  const light1 = new THREE.DirectionalLight(0xffffff, 1);
  light1.position.set(0,0,10);
  scene.add(light1)
  const light2 = new THREE.DirectionalLight(0xffffff, 1);
  light2.position.set(0,0,-10);
  scene.add(light2)
  const light3 = new THREE.DirectionalLight(0xffffff, 1);
  light3.position.set(10,0,0);
  scene.add(light3)
  const light4 = new THREE.DirectionalLight(0xffffff, 1);
  light4.position.set(-10,0,0);
  scene.add(light4)
  const light5 = new THREE.DirectionalLight(0xffffff, 1);
  light5.position.set(0,10,0);
  scene.add(light5)
  const light6 = new THREE.DirectionalLight(0xffffff, 0.3);
  light6.position.set(5,10,0);
  scene.add(light6)
  const light7 = new THREE.DirectionalLight(0xffffff, 0.3);
  light7.position.set(0,10,5);
  scene.add(light7)
  const light8 = new THREE.DirectionalLight(0xffffff, 0.3);
  light8.position.set(0,10,-5);
  scene.add(light8)
  const light9 = new THREE.DirectionalLight(0xffffff, 0.3);
  light9.position.set(-5,10,0);
  scene.add(light9)

  // 轨道控制
  controls = new OrbitControls(camera, renderer.domElement);
  controls.update();
  controls.keys = {
    LEFT: 'ArrowLeft', //left arrow
    UP: 'ArrowUp', // up arrow
    RIGHT: 'ArrowRight', // right arrow
    BOTTOM: 'ArrowDown' // down arrow
  }

  console.log("===")


  clock = new THREE.Clock()
  // gsap.to(mesh.position, {
  //   y: -2, 
  //   duration: 5, 
  //   ease: "bounce.out",
  //   repeat: -1, 
  //   delay: 2,
  //   yoyo: true,
  // })

  animat();
  return {
    colors,
    roughness,
    selectColor,
    selectFootColor,
    selectRoughness
  }
})

const animat = () => {
  requestAnimationFrame(animat);
  renderer.render(scene, camera);
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
