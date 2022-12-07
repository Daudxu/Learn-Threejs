import * as THREE from 'three'
// import { Color, DirectionalLight, Plane, Texture } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

let camera, scene, renderer, labelRenderer;

let moon, earth;

const clock = new THREE.Clock();
// 材质加载器
const textTrueLoader = new THREE.TextureLoader();

function init() {
    // 地球半径大小
    const EARTH_RADIUS = 2.5;
    const MOON_RADIUS = 0.7;
    // 实例化场景
    scene = new THREE.Scene()
    // 实例化相机
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 200)
    camera.position.set(10, 5, 20)
    // 坐标轴的对象
    // const axesHelper = new THREE.AxesHelper( 5 );
    // scene.add( axesHelper );
    // 宇宙环境
    // 加载HDR环境图
    const rgbLoaderssa = new RGBELoader();
    rgbLoaderssa.loadAsync("galaxy.hdr").then((texture)=>{
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = texture
        scene.environment = texture
    })
    // 环境光
    const light = new THREE.AmbientLight( 0xffffff, 0.5 ); 
    light.intensity = 0.3
    scene.add( light );
    // 创建聚光灯
    const spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set(0, 0, 10)
    spotLight.intensity = 2
    spotLight.castShadow = true;
    scene.add(spotLight)
    // 创建一个月球
    const moonGeometry = new THREE.SphereGeometry( MOON_RADIUS, 16, 16 );
    const moonMaterial = new THREE.MeshPhongMaterial( { 
        map: textTrueLoader.load('planets/moon_1024.jpg'),
    } );
    moon = new THREE.Mesh(moonGeometry, moonMaterial)
    moon.castShadow = true
    scene.add(moon)

    const moonDiv = document.createElement("div")
    moonDiv.className = "label"
    moonDiv.textContent = "Earch"
    const moonLabel = new CSS2DObject(moonDiv)
    moonLabel.position.set(0, MOON_RADIUS + 0.5, 0)
    moon.add(moonLabel)
    // 创建一个地球
    const earthGeometry = new THREE.SphereGeometry( EARTH_RADIUS, 16, 16 );
    const earthMaterial = new THREE.MeshPhongMaterial( { 
        shininess: 5,
        map: textTrueLoader.load('planets/earth_atmos_2048.jpg'),
        specularMap: textTrueLoader.load("planets/earth_specular_2048.jpg"),
        normalMap:textTrueLoader.load("planets/earth_normal_2048.jpg"),
    } );
    earth = new THREE.Mesh(earthGeometry, earthMaterial)
    earth.receiveShadow = true
    scene.add(earth)

    const earthDiv = document.createElement("div")
    earthDiv.className = "label"
    earthDiv.textContent = "Earch"
    const eartchLabel = new CSS2DObject(earthDiv)
    eartchLabel.position.set(0, EARTH_RADIUS + 0.5, 0)
    earth.add(eartchLabel)
    // 渲染器
    renderer = new THREE.WebGL1Renderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    // 标签渲染器
    labelRenderer = new CSS2DRenderer()
    labelRenderer.setSize(window.innerWidth, window.innerHeight)
    labelRenderer.domElement.style.position = "absolute"
    labelRenderer.domElement.style.top = "0px"
    document.body.appendChild(labelRenderer.domElement)
    // 开启渲染阴影
    renderer.shadowMap.enabled = true
    // 挂载画布对象
    document.body.appendChild(renderer.domElement)

    // 绑定控制和摄像头
    const controls =  new OrbitControls( camera, renderer.domElement );
    const controls1 =  new OrbitControls( camera, labelRenderer.domElement );
    controls.enableDamping = true;
} 
var oldTime = 0;
function animate() {
    const elapsed = clock.getElapsedTime();
    moon.position.set(Math.sin(elapsed) * 5, 0, Math.cos(elapsed) * 5)
    // 地球自转
    var axis = new THREE.Vector3(0, 1, 0);
    earth.rotateOnAxis(axis, (elapsed - oldTime) * Math.PI / 10)
    // moon.rotateOnAxis(axis, elapsed * Math.PI / 2000)
    renderer.render(scene, camera)
    labelRenderer.render(scene, camera)
    oldTime = elapsed
    requestAnimationFrame(animate)
}
init()
animate()
