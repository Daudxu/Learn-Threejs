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
// 导入纹理
const textureLoader = new THREE.TextureLoader()
const doorclorTexture = textureLoader.load("./case.png")
doorclorTexture.minFilter = THREE.LinearFilter;
doorclorTexture.magFilter = THREE.LinearFilter;

// 创建物体
const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({
    // color: "#ffff00" ,
    map: doorclorTexture,
    metalness: 1, // 材质像金属的程度。 0接近于木质或石头，1接近于金属
    roughness: 0, // 粗糙度。 0.0表示镜面反射，1.0表示漫反射
    side:THREE.DoubleSide
})
// 环境光
const light = new THREE.AmbientLight( 0xffffff, 0.5 ); 
scene.add( light );
// 点光源
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );
const directionalLight1 = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight1.position.set(0,0,1)
scene.add( directionalLight1 );
const directionalLight2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight2.position.set(1,0,0)
scene.add( directionalLight2 );


// plane.position.set(3,0,0)
// scene.add(plane)

const mesh = new THREE.Mesh( cubeGeometry, material );
scene.add(mesh)


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

