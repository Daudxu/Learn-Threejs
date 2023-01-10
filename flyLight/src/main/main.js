import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import  *  as dat from "dat.gui"

const gui = new dat.GUI();
// 顶点着色器
import vertexShader from "../shaders/flylight/vertex.glsl";
// 片元着色器
import fragmentShader from "../shaders/flylight/fragment.glsl";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
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

// 设置相机位置
camera.position.set(0, 0, 2);
scene.add(camera)

// const textureLoader = new THREE.TextureLoader()
// const texture = textureLoader.load("1.png")

const shaderMaterial = new THREE.RawShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {},
    side: THREE.DoubleSide,
    // transparent: true,
})


const gltfLoader = new GLTFLoader();
let LightBox = null;
gltfLoader.load("./assets/model/flyLight.glb", (gltf) => {
//   scene.add(gltf.scene);
  LightBox = gltf.scene.children[1];
  LightBox.material = shaderMaterial;
  for (let i = 0; i < 150; i++) {
    let flyLight = gltf.scene.clone(true);
    let x = (Math.random() - 0.5) * 300;
    let z = (Math.random() - 0.5) * 300;
    let y = Math.random() * 60 + 25;
    flyLight.position.set(x, y, z);
    gsap.to(flyLight.rotation, {
        y: 2 * Math.PI,
        duration: 10 + Math.random() * 30,
        repeat: -1,
    });
    gsap.to(flyLight.position, {
        x: "+=" + Math.random() * 5,
        y: "+=" + Math.random() * 10,
        yoyo: true,
        duration: 5 + Math.random() * 10,
        repeat: -1,
    });
    scene.add(flyLight);
  }
});


// // 平面
// const geometry = new THREE.PlaneGeometry( 1, 1, 64, 64 );
// // const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
// const plane = new THREE.Mesh( geometry, rawShaderMaterial );
// scene.add( plane );

// 坐标轴的对象
// const axesHelper = new THREE.AxesHelper( 6 );
// scene.add( axesHelper );

// 渲染
const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.BasicShadowMap;
// renderer.shadowMap.type = THREE.VSMShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
// renderer.toneMapping = THREE.LinearToneMapping;
// renderer.toneMapping = THREE.ReinhardToneMapping;
// renderer.toneMapping = THREE.CineonToneMapping;
renderer.toneMappingExposure = 0.2;
document.body.appendChild(renderer.domElement)



// 控制器
const controls =  new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
// 设置自动旋转
controls.autoRotate = true;
controls.autoRotateSpeed = 0.1;
controls.maxPolarAngle = (Math.PI / 3) * 2;
controls.minPolarAngle = (Math.PI / 3) * 2;
// const clock = new THREE.Clock();

function render() {
    // const elapsedTime = clock.getElapsedTime();
    // rawShaderMaterial.uniforms.uTime.value = elapsedTime;
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