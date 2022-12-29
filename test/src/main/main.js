import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import gsap from 'gsap'
// import  *  as dat from "dat.gui"
// 顶点着色器
import basicVertexShader from "../shader/raw/vertex.glsl";
// 片元着色器
import basicFragmentShader from "../shader/raw/fragment.glsl";
// 创建场景
const scene = new THREE.Scene();
// 创建相机
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000)
// 设置相机位置
camera.position.set(0, 0 , 10)
scene.add(camera)

const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load("1.png")

const rawShaderMaterial = new THREE.RawShaderMaterial({
    // 顶点着色器
    vertexShader: basicVertexShader,
    // 片元着色器
    fragmentShader:basicFragmentShader,
    side: THREE.DoubleSide,
    // wireframe: true,
    uniforms: {
        uTime: {
            value: 0,
        },
        uTexture: {
            value: texture
        }
    }
})

// 平面
const geometry = new THREE.PlaneGeometry( 1, 1, 64, 64 );
// const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, rawShaderMaterial );
scene.add( plane );

// 坐标轴的对象
// const axesHelper = new THREE.AxesHelper( 6 );
// scene.add( axesHelper );

// 渲染
const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)

// 控制器
const controls =  new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;

const clock = new THREE.Clock();

function render() {
    const elapsedTime = clock.getElapsedTime();
    rawShaderMaterial.uniforms.uTime.value = elapsedTime;
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
window.addEventListener("resize",() => {
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    // 更新摄像机的投影矩阵 
    camera.updateProjectionMatrix();
    // 更新渲染器的像素比
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 设置渲染器像素比例
    renderer.setPixelRatio(window.devicePixelRatio)
})