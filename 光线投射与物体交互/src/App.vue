

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
let cubArr = [];

onMounted(()=>{
  // 场景
  scene = new THREE.Scene();
  // 相机
  camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 30);
  camera.position.set(0, 0, 10);
  scene.add(camera)
  // 坐标轴
  const axesHelper = new THREE.AxesHelper( 5 );
  scene.add( axesHelper );

  const cubeGeometry = new THREE.BoxBufferGeometry(1,1,1)
  const material = new THREE.MeshBasicMaterial({
    wireframe: true
  });
  const redMaterial = new THREE.MeshBasicMaterial({
    color: "#ff0000",
  })
  // 1000个立方体

  for(let i = -5; i < 5; i++){
    for(let j = -5; j < 5; j++){
      for(let z = -5; z < 5; z++){
          const cube = new THREE.Mesh(cubeGeometry, material);
          cube.position.set(i,j,z)
          scene.add(cube);
          cubArr.push(cube)
      }
    }
  }
  // 创建光线投射对象
  const raycaster = new THREE.Raycaster();
  // 鼠标位置对象
  const mouse = new THREE.Vector2()
  // 监听鼠标的位置
  window.addEventListener("mousemove",(event) => {
       mouse.x = event.clientX/window.innerWidth * 2 - 1
       mouse.y = event.clientY/window.innerHeight * 2 - 1
       raycaster.setFromCamera(mouse, camera)
       let result = raycaster.intersectObjects(cubArr)
        result.forEach((item)=> {
          item.object.material = redMaterial
        })
  })
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
const animat = () => {
  let time = clock.getElapsedTime();
  renderer.render(scene, camera);
  requestAnimationFrame(animat);
}
</script>
