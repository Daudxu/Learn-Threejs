

<template>
  <div class="content">
        <div class="domCanvas" ref="domCanvas"></div>
        <div class="page page0">
          <h1>three BufferGeometry</h1>
          <h3>应用打造酷炫三角形</h3>
        </div>
        <div class="page page1">
          <h1>three BufferGeometry</h1>
          <h3>应用打造酷炫三角形</h3>
        </div>
        <div class="page page2">
          <h1>three BufferGeometry</h1>
          <h3>应用打造酷炫三角形</h3>
        </div>
  </div>
</template>
<script setup>
import * as THREE from "three";
import { OrbitControls }  from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
// import * as dat from 'dat.gui'

import { onMounted, ref } from "vue";

// const gui = new dat.GUI({closed:true,width:500})
const domCanvas = ref(null)

let scene, camera, renderer, mesh, controls, clock;

const width = window.innerWidth
const height = window.innerHeight
let cubArr = [];
let cubeGroup = new THREE.Group()
let triangleGroup = new THREE.Group()
let sphereGroup = new THREE.Group()
const arrGroup = [cubeGroup,triangleGroup,sphereGroup]
let currentPage = 0;
const mouse = new THREE.Vector2()

onMounted(()=>{
  // 场景
  scene = new THREE.Scene();
  // 相机
  camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 300);
  camera.position.set(0, 0, 20);
  scene.add(camera)
  // 坐标轴
  const axesHelper = new THREE.AxesHelper( 5 );
  scene.add( axesHelper );

  const cubeGeometry = new THREE.BoxBufferGeometry(2,2,2)
  const material = new THREE.MeshBasicMaterial({
    wireframe: true
  });
  const redMaterial = new THREE.MeshBasicMaterial({
    color: "#ff0000",
  })
  // 1000个立方体

  for(let i = 0; i < 5; i++){
    for(let j = 0; j < 5; j++){
      for(let z = 0; z < 5; z++){
          const cube = new THREE.Mesh(cubeGeometry, material);
          cube.position.set(i * 2 - 4, j * 2 - 4 , z * 2 - 4)
          cubeGroup.add(cube);
          cubArr.push(cube)
      }
    }
  }

  scene.add(cubeGroup)
  
  // 创建三角形
  for(let i=0;i<50;i++) {
      // 每个三角形需要三个顶点，每个顶点需要三个值
      const geometry = new THREE.BufferGeometry();
      const positionArray = new Float32Array(9) ;
      for(let j=0; j<9; j++) {
        if( j % 3 == 1 ){
          positionArray[j] = Math.random() * 10 - 5;
        }else{
          positionArray[j] = Math.random() * 10 - 5;
        }

      }
      geometry.setAttribute( 'position', new THREE.BufferAttribute( positionArray, 3 ) );
      let color = new THREE.Color(Math.random(),Math.random(),Math.random())
      const material = new THREE.MeshBasicMaterial( { color: color,transparent: true,opacity:0.7, side: THREE.DoubleSide } );

      let triangle = new THREE.Mesh( geometry, material );
      triangleGroup.add(triangle)
  }
  triangleGroup.position.set(0, -30, 0)
  scene.add(triangleGroup)




const sphereGeometry = new THREE.SphereBufferGeometry( 1, 20, 20 );
const materiala = new THREE.MeshStandardMaterial();
const sphere = new THREE.Mesh( sphereGeometry, materiala );
sphere.castShadow = true
sphereGroup.add( sphere );

// 创建平面
const planeBufferGeometry = new THREE.PlaneBufferGeometry(20, 20 );
const plane = new THREE.Mesh( planeBufferGeometry, material );
plane.position.set(0, -1, 0);
plane.rotation.x = - Math.PI / 2;
plane.receiveShadow = true
sphereGroup.add( plane );


// 环境光
const light = new THREE.AmbientLight( 0xffffff, 0.5 ); 
sphereGroup.add( light );
// 直线光源
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.set(5, 5, 5)
directionalLight.castShadow = true

// 阴影模糊度
directionalLight.shadow.radius = 20;

// 设置阴影贴图的分辨率
directionalLight.shadow.mapSize.set(4096, 4096)

sphereGroup.add( directionalLight );
sphereGroup.position.set(0, -60, 0)
scene.add(sphereGroup)

window.addEventListener("scroll",()=>{
      console.log(window.scrollY);
      const newPage = Math.round(window.scrollY / window.innerHeight)
      if(newPage != currentPage) {
          currentPage = newPage;
          gsap.to(arrGroup[currentPage].rotation, {
            z : "+=" + Math.PI * 2,
            x : "+=" + Math.PI * 2,
            duration: 2,
            onComplete: () =>{
               console.log("done")
            }
          })

          gsap.to(`.page${currentPage} h1`,  { x: 0, rotate: "+=360", duration: 1 })
      }
})

// 鼠标位置对象


window.addEventListener("mousemove", (event)=> {
  mouse.x = event.clientX / window.innerWidth - 0.5;
  mouse.y = event.clientY / window.innerHeight - 0.5;
})


gsap.to(cubeGroup.rotation, {
  x:"+=" + Math.PI,
  Z:"+=" + Math.PI,
  duration: 5,
  ease: "power2.inOut",
  repeat: -1,
})

gsap.to(triangleGroup.rotation, {
  x:"-=" + Math.PI,
  Z:"+=" + Math.PI,
  duration: 6,
  ease: "power2.inOut",
  repeat: -1,
})
  // 渲染
  renderer = new THREE.WebGL1Renderer({
    // antialias: true
    alpha: true
  });
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  renderer.physicallyCorrectLights - true;
  domCanvas.value.appendChild(renderer.domElement);

  // 轨道控制
  // controls = new OrbitControls(camera, renderer.domElement);
  // controls.update();
  clock = new THREE.Clock()
  animat();
})
const animat = () => {
  let deltaime = clock.getDelta();
  let time = clock.getElapsedTime();
  // cubeGroup.rotation.x = time * 0.5
  // cubeGroup.rotation.y = time * 0.5
  // cubeGroup.rotation.z = time * 0.5

  // triangleGroup.rotation.x = time * 0.5
  // triangleGroup.rotation.y = time * 0.5
  // 根据当前的scrollY 去设置相机位置

  camera.position.y = (window.scrollY / window.innerHeight) * -30;

  camera.position.x = (mouse.x * 100 - camera.position.x) * deltaime;
  // console.log(mouse )
  // camera.position.x = mouse - camera.position.x ;
  renderer.render(scene, camera);
  requestAnimationFrame(animat);

}
</script>

<style scoped>



</style>