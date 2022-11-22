import * as THREE from 'three'
import { DirectionalLight, Plane } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
// import gsap from 'gsap'
// import  *  as dat from "dat.gui"
// 创建场景
const scene = new THREE.Scene();
// 创建相机
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000)
// 设置相机位置
camera.position.set(0, 0, 10)
scene.add(camera)

// // 加载HDR环境图
// const rgbLoaderssa = new RGBELoader();
// rgbLoaderssa.loadAsync("test.hdr").then((texture)=>{
//     texture.mapping = THREE.EquirectangularReflectionMapping;
//     scene.background = texture
//     scene.environment = texture
// })

// 创建球形
const sphereGeometry = new THREE.SphereBufferGeometry( 1, 20, 20 );
const material = new THREE.MeshStandardMaterial();
const sphere = new THREE.Mesh( sphereGeometry, material );
sphere.castShadow = true
scene.add( sphere );

// 创建平面
const planeBufferGeometry = new THREE.PlaneBufferGeometry(20, 20 );
const plane = new THREE.Mesh( planeBufferGeometry, material );
plane.position.set(0, -1, 0);
plane.rotation.x = - Math.PI / 2;
plane.receiveShadow = true
scene.add( plane );


// 环境光
const light = new THREE.AmbientLight( 0xffffff, 0.5 ); 
scene.add( light );
// 点光源
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.set(10, 10, 10)
directionalLight.castShadow = true
scene.add( directionalLight );

// 坐标轴的对象
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );
// 渲染
const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
renderer.shadowMap.enabled = true
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

