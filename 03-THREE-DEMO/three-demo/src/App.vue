

<template>
  <div class="content">
        <div class="domCanvas" ref="domCanvas"></div>
  </div>
</template>
<script setup>
import * as THREE from "three";
import gsap from "gsap";

import { onMounted, ref } from "vue";

const domCanvas = ref(null)
let scene, camera, renderer;

const width = window.innerWidth
const height = window.innerHeight
onMounted(()=>{
  // 场景
  scene = new THREE.Scene()
  // 相机
  camera = new THREE.PerspectiveCamera(60, width/height, 0.1, 1000)
  camera.position.z = 5
  // 渲染
  renderer = new THREE.WebGL1Renderer()
  renderer.setSize(width, height)
  domCanvas.value.appendChild(renderer.domElement )
  // 环境模型加载


  console.log("===", domCanvas.value)

  animat()
})

const animat = () => {
  requestAnimationFrame(animat)
  renderer.render(scene, camera)
} 
</script>
<style scoped>

</style>
