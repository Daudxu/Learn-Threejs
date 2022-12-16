import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
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

//Create a closed wavey loop
const curve = new THREE.CatmullRomCurve3( [
	new THREE.Vector3( -10, 0, 0 ),
	new THREE.Vector3( -5, 0, 0 ),
	new THREE.Vector3( 0, 2, 0 ),
	new THREE.Vector3( 5, 0, 0 ),
	new THREE.Vector3( 10, 0, 0 )
] );

const points = curve.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );

const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

// Create the final object to add to the scene
const curveObject = new THREE.Line( geometry, material );
scene.add(curveObject)
// 坐标轴的对象
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );
// 渲染
const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
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

