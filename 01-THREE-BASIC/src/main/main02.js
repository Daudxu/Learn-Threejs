import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000)
// 设置相机位置
camera.position.set(0, 0, 10)
scene.add(camera)
// 创建物体
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const meshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00});
const cube = new THREE.Mesh(boxGeometry, meshBasicMaterial)
scene.add(cube)
// 渲染
const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
renderer.render(scene, camera)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls( camera, renderer.domElement );

// 方法一
// controls.addEventListener('change', function(){
//     renderer.render(scene, camera)
//     console.log("===")
// })
// 方法二
const clock = new THREE.Clock();
!(function animate(){
    const spt = clock.getDelta()*1000;
    console.log("渲染时间间隔 单位毫秒", spt)
    console.log("渲染帧率FPS", 1000/spt)
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
})()
