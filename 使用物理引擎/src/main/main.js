import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Body, Box, ContactMaterial, Material, Plane, Sphere, Vec3, World } from 'cannon-es'

const cubeArr = [];
// import gsap from 'gsap'
// import  *  as dat from "dat.gui"
const hitSound = new Audio("./assets/1.mp3")
// const hitSound = new Audio("https://audio.bfmtv.com/bfmbusiness_128.mp3?aw_0_1st.playerId=AudioPlayer_Web_Next")
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
// const sphereGeometry = new THREE.SphereGeometry( 1, 20, 20 );
// const spherematerial = new THREE.MeshStandardMaterial( { color: 0xffffff } );
// const sphere = new THREE.Mesh( sphereGeometry, spherematerial );
// sphere.castShadow = true;
// scene.add( sphere );
const cubeWorldMaterial = new Material("cube")
function createCube(){
    const cubeGeometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
    const cubematerial = new THREE.MeshStandardMaterial( { color: 0xffffff } );
    const cube = new THREE.Mesh( cubeGeometry, cubematerial );
    cube.castShadow = true;
    scene.add( cube );
    // 创建小球
    const cubeShape = new Box(new Vec3(0.5, 0.5, 0.5))
    // 设置物体材质


    // 创建物理世界物体
    const cubeBody = new Body({
        shape: cubeShape,
        position: new Vec3(0,0,0),
        mass: 1,  // 小球质量
        material: cubeWorldMaterial // 材质
    })
    cubeBody.applyLocalForce(
        new Vec3(10,0,0),     // 添加的力的大小和方向
        new Vec3(0,0,0)       // 施加力所在的位置
    )
    // 物体添加到物理世界
    world.addBody(cubeBody) 

    // 添加碰撞事件
    function HitEvent(e) {
        const impactStrength = e.contact.getImpactVelocityAlongNormal()
        console.log(impactStrength)
        // 重新从0开始
        if(impactStrength > 2){
            hitSound.currentTime = 0;
            // hitSound.volume = impactStrength / 12;
        }
        hitSound.play();
    }
    cubeBody.addEventListener("collide", HitEvent)
    cubeArr.push({
        mesh: cube,
        body: cubeBody,
    })
}
// 创建立方体
// const cubeGeometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
// const cubematerial = new THREE.MeshStandardMaterial( { color: 0xffffff } );
// const cube = new THREE.Mesh( cubeGeometry, cubematerial );
// cube.castShadow = true;
// scene.add( cube );

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




// // 创建物理世界
// const world = new World()
// world.gravity.set(0, -9.8, 0)
// // 创建小球
// const sphereShape = new Sphere(1)
// // 设置物体材质
// const sphereWorldMaterial = new Material("sphere")

// // 创建物理世界物体
// const sphereBody = new Body({
//     shape: sphereShape,
//     position: new Vec3(0,0,0),
//     mass: 1,  // 小球质量
//     material: sphereWorldMaterial // 材质
// })

// // 物体添加到物理世界
// world.addBody(sphereBody)




// sphereBody.addEventListener("collide", HitEvent)

// 创建物理世界地面
const floorShape = new Plane();
const floorBody = new Body();
const floorMaterial = new Material("floor");
floorBody.material = floorMaterial;
// 当质量为0的时候，可以使得物体保持不动
floorBody.mass = 0,
floorBody.addShape(floorShape),

floorBody.position.set(0, -5, 0);
// 旋转地面位置
floorBody.quaternion.setFromAxisAngle(new Vec3(1.0,0), -Math.PI / 2);
world.addBody(floorBody);

const defaultContactactMaterial = new ContactMaterial(
    cubeWorldMaterial,
    floorMaterial,
    {
        friction: 0.1, // 摩擦力
        restitution: 0.7, // 弹性
    }
)

// 材质添加到世界
world.addContactMaterial(defaultContactactMaterial) 
// 设置世界碰撞的默认材料,如果材料没设置使用这个
world.defaultContactMaterial = defaultContactactMaterial

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
    // sphere.position.copy(sphereBody.position)
    // cube.position.copy(cubeBody.position)
    cubeArr.forEach((item)=>{
        item.mesh.position.copy(item.body.position)
        item.mesh.quaternion.copy(item.body.quaternion)
    })
    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}

render ()
window.addEventListener("click", ()=>{
    createCube()
    // console.log("====")
})
// 双击全屏
// window.addEventListener("dblclick", ()=>{  
//     const fullScreenElement = document.fullscreenElement;
//     if(!fullScreenElement) {
//         renderer.domElement.requestFullscreen()
//     }else{
//         document.exitFullscreen()
//     }
// })
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

