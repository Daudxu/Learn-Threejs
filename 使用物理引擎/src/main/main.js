import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Body, Material, Sphere, Vec3, World } from 'cannon-es'


// import gsap from 'gsap'
// import  *  as dat from "dat.gui"

// 创建场景
const scene = new THREE.Scene();
// const gui = new dat.GUI()

// 创建相机
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 2000)
camera.position.set(0, 0, 18)

scene.add(camera)

// 创建球
const sphereGeometry = new THREE.SphereGeometry( 1, 20, 20 );
const spherematerial = new THREE.MeshStandardMaterial( { color: 0xffffff } );
const sphere = new THREE.Mesh( sphereGeometry, spherematerial );
sphere.castShadow = true;
scene.add( sphere );

// 创建平面
const planegeometry = new THREE.PlaneGeometry( 20, 20 );
const planematerial = new THREE.MeshStandardMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( planegeometry, planematerial );
plane.position.set(0, -5, 0);
plane.rotation.x = Math.PI / 2;
plane.receiveShadow = true;
scene.add( plane );

// 创建物理世界
const world = new World()
world.gravity.set(0, -9.8, 0)
// 创建小球
const sphereShape = new Sphere(1)
// 设置物体材质
const sphereWorldMaterial = new Material()
// 创建物理世界物体
const sphereBody = new Body({
    shape: sphereShape,
    position: new Vec3(0,0,0),
    mass: 1,  // 小球质量
    material: sphereWorldMaterial // 材质
})

// 物体添加到物理世界
world.addBody(sphereBody)

// 添加环境光和平行光
const ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 ); 
scene.add( ambientLight );
// 直线光
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.castShadow = true;
scene.add( directionalLight );

// 坐标轴的对象
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper ); 

// 渲染
const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement)

// 控制
const controls =  new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;

const clock = new THREE.Clock()

function render() {
    let deltaTime = clock.getDelta();
    world.step(1 / 120, deltaTime)
    sphere.position.copy(sphereBody.position)
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

