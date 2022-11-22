import * as THREE from 'three'
import { DirectionalLight, Plane } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
// import gsap from 'gsap'

import  *  as dat from "dat.gui"
// 创建场景
const scene = new THREE.Scene();
const gui = new dat.GUI()
// 创建相机
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000)
// 设置相机位置
camera.position.set(0, 0, 10)
scene.add(camera)

// 创建球形
const sphereGeometry = new THREE.SphereBufferGeometry( 1, 20, 20 );
const material = new THREE.MeshStandardMaterial();
const sphere = new THREE.Mesh( sphereGeometry, material );
sphere.castShadow = true
scene.add( sphere );

// 创建平面
const planeBufferGeometry = new THREE.PlaneBufferGeometry(50, 50 );
const plane = new THREE.Mesh( planeBufferGeometry, material );
plane.position.set(0, -1, 0);
plane.rotation.x = - Math.PI / 2;
plane.receiveShadow = true
scene.add( plane );


// 环境光
const light = new THREE.AmbientLight( 0xffffff, 0.5 ); 
scene.add( light );
// 聚光灯
const spotLight = new THREE.SpotLight( 0xffffff, 0.5 );
spotLight.position.set(5, 5, 5)
spotLight.castShadow = true
spotLight.angle = Math.PI / 6
// 阴影模糊度
spotLight.shadow.radius = 20;

// 设置阴影贴图的分辨率
spotLight.shadow.mapSize.set(4096, 4096)
spotLight.target = sphere
spotLight.distance = 0
spotLight.penumbra = 0
spotLight.decay = 0
spotLight.intensity = 2
// 设置透视相机的属性
// directionalLight.shadow.camera.near = 9.5;
// directionalLight.shadow.camera.far = 500;
// directionalLight.shadow.camera.top = 5;
// directionalLight.shadow.camera.bottom = -5;
// directionalLight.shadow.camera.left = -5;
// directionalLight.shadow.camera.right = 5;

// spotLight.shadow.camera.near = 500;
// spotLight.shadow.camera.far = 4000;
// spotLight.shadow.camera.fov = 30;


scene.add( spotLight );

gui
.add(sphere.position, "x")
.min(-5)
.max(5)
.step(0.1)
gui
.add(spotLight, "angle")
.min(0)
.max(Math.PI / 2)
.step(0.01)
gui
.add(spotLight, "distance")
.min(0)
.max(10)
.step(0.01)
gui
.add(spotLight, "penumbra")
.min(0)
.max(10)
.step(0.01)
gui
.add(spotLight, "decay")
.min(0)
.max(5)
.step(0.01)

// 坐标轴的对象
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );
// 渲染
const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
renderer.shadowMap.enabled = true
renderer.physicallyCorrectLights = true
document.body.appendChild(renderer.domElement)
// 控制
const controls =  new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;

function render() {
    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}

render ()
// 双击全屏
window.addEventListener("dblclick", ()=>{
    const fullScreenElement = document.fullscreenElement;
    if(!fullScreenElement) {
        renderer.domElement.requestFullscreen()
    }else{
        document.exitFullscreen()
    }
})
// 屏幕自适应
window.addEventListener("resize",()=>{
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    // 更新摄像机的投影矩阵 
    camera.updateProjectionMatrix();
    // 更新渲染器的像素比
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 设置渲染器像素比例
    renderer.setPixelRatio(window.devicePixelRatio)
})

