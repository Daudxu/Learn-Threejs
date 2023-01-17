import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import  *  as dat from "dat.gui"

const gui = new dat.GUI();
// 顶点着色器
// import vertexShader from "../shaders/water/vertex.glsl";
// 片元着色器
// import fragmentShader from "../shaders/water/fragment.glsl";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
// 创建场景
const scene = new THREE.Scene();
// 创建相机
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(
    90,
    window.innerHeight / window.innerHeight,
    0.1,
    1000
);
// 创建纹理加载器对象
const rgbeLoader = new RGBELoader();
rgbeLoader.loadAsync("./assets/2k.hdr").then((texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture;
});

let basicMaterial = new THREE.MeshBasicMaterial({
    color: "#00ff00",
    side: THREE.DoubleSide
})

const basicUniform = {
    uTime: {
        value: 0
    }
}

basicMaterial.onBeforeCompile = (shader, renderer) => {
    // console.log(shader);
    console.log(shader.vertexShader);
    // console.log(shader.fragmentShader);
    // console.log(renderer);
    shader.uniforms.uTime = basicUniform.uTime;
    shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `
         #include <common>
         uniform float uTime;
        `
    )
    shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        transformed.x += sin(uTime) * 2.0;
        transformed.z += cos(uTime) * 2.0;
        `
    )
}

// 创建平面
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 64, 64),
    basicMaterial
)

scene.add(floor);


// 设置相机位置
camera.position.set(0, 0, 2);
scene.add(camera)

// 坐标轴的对象
const axesHelper = new THREE.AxesHelper( 6 );
scene.add( axesHelper );

const light = new THREE.DirectionalLight(0XFFFFFF, 1);
light.position.set(5,5,5);
scene.add(light)

// 渲染
const renderer = new THREE.WebGLRenderer({ alpha: true})
renderer.setSize(width, height)
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.2;
document.body.appendChild(renderer.domElement)

// 控制器
const controls =  new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
const clock = new THREE.Clock()
function render() {
    controls.update();
    renderer.render(scene, camera);
    const elapsedTime = clock.getElapsedTime();
    basicUniform.uTime.value = elapsedTime;
    requestAnimationFrame(render);
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