import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import  *  as dat from "dat.gui"

const gui = new dat.GUI();
// 顶点着色器
import vertexShader from "../shaders/water/vertex.glsl";
// 片元着色器
import fragmentShader from "../shaders/water/fragment.glsl";
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

// 设置相机位置
camera.position.set(0, 0, 2);
scene.add(camera)

// const textureLoader = new THREE.TextureLoader()
// const texture = textureLoader.load("1.png")
const params = {
    uWaresFrequency: 14,
    uScale: 0.03,
    uXzScale: 1.5,
    uNoiseFrequency: 10,
    uNoiseScale: 1.5,
    uLowColor: "#ff0000",
    uHightColor: "#ffff00",
    uXspeed: 1,
    uZspeed: 1,
    uNoiseSpeed: 1,
    uOpacity: 1,
}

const shaderMaterial = new THREE.RawShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader, 
    side: THREE.DoubleSide,
    transparent: true,
    uniforms: {
        uWaresFrequency: {
            value: params.uWaresFrequency,
        },
        uScale: {
            value: params.uScale,
        },
        uNoiseFrequency: {
            value: params.uNoiseFrequency
        },
        uNoiseScale: {
            value: params.uNoiseScale
        },
        uXzScale: {
            value: params.uXzScale
        },
        uTime: {
            value: 0
        },
        uLowColor: {
            value: new THREE.Color(params.uLowColor)
        },
        uHightColor: {
            value: new THREE.Color(params.uHightColor)
        },
        uXspeed: {
            value: params.uXspeed
        },
        uZspeed: {
            value: params.uZspeed
        },
        uNoiseSpeed: {
            value: params.uNoiseSpeed
        },
        uOpacity: {
            value: params.uOpacity
        },
    }
})

gui.add(params,"uWaresFrequency").min(1).max(100).step(0.1).onChange(value => {
    shaderMaterial.uniforms.uWaresFrequency.value = value
})

gui.add(params,"uScale").min(0).max(0.2).step(0.001).onChange(value => {
    shaderMaterial.uniforms.uScale.value = value
})

gui.add(params,"uNoiseFrequency").min(1).max(100).step(0.1).onChange(value => {
    shaderMaterial.uniforms.uNoiseFrequency.value = value
})

gui.add(params,"uNoiseScale").min(0).max(5).step(0.001).onChange(value => {
    shaderMaterial.uniforms.uNoiseScale.value = value
})

gui.add(params,"uXzScale").min(0).max(5).step(0.1).onChange(value => {
    shaderMaterial.uniforms.uXzScale.value = value
})

gui.addColor(params,"uLowColor").onFinishChange(value => {
    shaderMaterial.uniforms.uLowColor.value = new THREE.Color(value)
})

gui.addColor(params,"uHightColor").onFinishChange(value => {
    shaderMaterial.uniforms.uHightColor.value = new THREE.Color(value)
})

gui.add(params,"uXspeed").min(0).max(5).step(0.1).onChange(value => {
    shaderMaterial.uniforms.uXspeed.value = value
})

gui.add(params,"uZspeed").min(0).max(5).step(0.1).onChange(value => {
    shaderMaterial.uniforms.uZspeed.value = value
})

gui.add(params,"uNoiseSpeed").min(0).max(5).step(0.1).onChange(value => {
    shaderMaterial.uniforms.uNoiseSpeed.value = value
})

gui.add(params,"uOpacity").min(0).max(2).step(0.01).onChange(value => {
    shaderMaterial.uniforms.uOpacity.value = value
})

// // 平面
const geometry = new THREE.PlaneGeometry( 1, 1, 1024, 1024 );
// const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, shaderMaterial );
plane.rotation.x = -Math.PI / 2;
scene.add( plane );


// 坐标轴的对象
const axesHelper = new THREE.AxesHelper( 6 );
scene.add( axesHelper );



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
// controls.autoRotate = true;
// controls.autoRotateSpeed = 0.1;
// controls.maxPolarAngle = (Math.PI / 3) * 2;
// controls.minPolarAngle = (Math.PI / 3) * 2;
const clock = new THREE.Clock(); 
function render() {
    controls.update();
    renderer.render(scene, camera);
    const elapsedTime = clock.getElapsedTime();
    shaderMaterial.uniforms.uTime.value = elapsedTime;
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