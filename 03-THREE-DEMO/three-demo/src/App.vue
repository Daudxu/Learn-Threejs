

<template>
  <div class="content">
        <div class="domCanvas" ref="domCanvas"></div>
  </div>
</template>
<script setup>
import * as THREE from "three";
import { OrbitControls }  from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader }  from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader }  from "three/examples/jsm/loaders/DRACOLoader"; 
// import gsap from "gsap";
// import * as dat from 'dat.gui'

import { onMounted, ref } from "vue";

// const gui = new dat.GUI({closed:true,width:500})
const domCanvas = ref(null)
let scene, camera, renderer, geometry, material, mesh, controls, clock;

const width = window.innerWidth
const height = window.innerHeight

let wheels = []
let carBody, frontCar, hoodCar, glassCar

const bodyMaterial = new THREE.MeshPhysicalMaterial({
   color: 0xff0000,
   metalness: 1,
   roughness: 0.5,
   clearcoat: 1,
   clearcoatRoughness: 0
})

onMounted(()=>{
  // 场景
  scene = new THREE.Scene();
  // 相机
  camera = new THREE.PerspectiveCamera(60, width/height, 0.1, 1000);
  camera.position.set(0, 2, 6);
  // 渲染
  renderer = new THREE.WebGL1Renderer({
    antialias: true
  });
  renderer.setSize(width, height);
  renderer.setClearColor("#000")
  scene.background = new THREE.Color("#ccc")
  scene.environment = new THREE.Color("#ccc")
  domCanvas.value.appendChild(renderer.domElement );
  // 几何体
  // geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
  // material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
  // mesh = new THREE.Mesh( geometry, material );
  // scene.add( mesh );

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
  loader.load("./car.gltf", (glft)=> {
    const m = glft.scene;
    m.position.set(0,0,0);
    m.traverse((child) => {
       if(child.isMesh) {
          console.log("m", child.name)
       }

       if(child.isMesh && child.name.includes("1003_14")) {
          wheels.push(child)
       }
       // 车身
       if(child.isMesh && child.name.includes("1003_8")) {
          carBody = child
          carBody.material = bodyMaterial;
       }
       if(child.isMesh && child.name.includes("1003_7")) {
          carBody = child
          carBody.material = bodyMaterial;
       }
       if(child.isMesh && child.name.includes("1003_6")) {
          carBody = child
          carBody.material = bodyMaterial;
       }
       if(child.isMesh && child.name.includes("1003_5")) {
          carBody = child
          carBody.material = bodyMaterial;
       }
       if(child.isMesh && child.name.includes("1003_4")) {
          carBody = child
          carBody.material = bodyMaterial;
       }
       if(child.isMesh && child.name.includes("1003_3")) {
          carBody = child
          carBody.material = bodyMaterial;
       }
       // 
      //  if(child.isMesh && child.name.includes("1003_1")) {
      //     frontCar = child
      //  }
       // 引擎盖
       if(child.isMesh && child.name.includes("1003_2")) {
          hoodCar = child
       }
       // 挡风玻璃
       if(child.isMesh && child.name.includes("1003_10")) {
          glassCar = child
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
  const light4 = new THREE.DirectionalLight(0xffffff, 0.3);
  light4.position.set(-10,0,0);
  scene.add(light4)
  const light5 = new THREE.DirectionalLight(0xffffff, 0.3);
  light5.position.set(0,10,0);
  scene.add(light5)
  // const light6 = new THREE.DirectionalLight(0xffffff, 0.3);
  // light6.position.set(5,10,0);
  // scene.add(light6)
  // const light7 = new THREE.DirectionalLight(0xffffff, 0.3);
  // light7.position.set(0,10,5);
  // scene.add(light7)
  // const light8 = new THREE.DirectionalLight(0xffffff, 0.3);
  // light8.position.set(0,10,-5);
  // scene.add(light8)
  // const light9 = new THREE.DirectionalLight(0xffffff, 0.3);
  // light9.position.set(-5,10,0);
  // scene.add(light9)

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
})

const animat = () => {
  requestAnimationFrame(animat);
  renderer.render(scene, camera);
}
</script>
<style scoped>

</style>
