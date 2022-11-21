import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import  *  as dat from "dat.gui"
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

// 修改位置
// cube.position.set(0.5, 0.5, 0.5)
// 缩放
// cube.scale.set(3,2,1)
// cube.scale.x = 5
// 旋转
// cube.rotateX(0.01)
cube.rotation.set(Math.PI/4, 0, 0, "XYZ")


// 3个坐标轴的对象
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );
// 渲染
const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
// renderer.render(scene, camera)
scene.add(cube)
const gui = new dat.GUI()
gui
.add(cube.position,"x")
.min(0)
.max(5)
.step(0.01)
.name("移动X轴")
.onChange((value)=>{
    console.log("修改值是：", value)
}).onFinishChange((value)=>{
    console.log("修改完成值是：", value)
});

const params = {
    color: "#ffff00",
    fn:()=>{
        // 立方体运动
        gsap.to(cube.position,{x:5, duration: 2, yoyo: true, repeat: -1})
    }
}

gui.addColor(params, "color").onChange((value)=>{
    console.log("值被修改：", value);
    cube.material.color.set(value)
})
// 设置选项框
gui.add(cube,"visible").name("是否显示");
// // 点击触发某个某个事件
// gui.add(params, "fn").name("立方体运动")

var Folder = gui.addFolder("设置立方体")
Folder.add(cube.material,"wireframe")
// 点击触发某个某个事件
Folder.add(params, "fn").name("立方体运动")

const controls =  new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;

document.body.appendChild(renderer.domElement)

// const clock = new THREE.Clock();
// const animate1 = gsap.to(cube.position, {x:  5, duration: 5, ease: "power1.inOut", onComplete: ()=>{
//     console.log("动画完成")
// }, onStart: ()=>{
//     console.log("动画开始")
// },repeat: -1, yoyo: true})
// window.addEventListener("dblclick",()=>{
//     console.log("animate1", animate1)
//     if(animate1.isActive()){
//         animate1.pause()
//     }else{
//         animate1.resume()
//     }
// })
// gsap.to(cube.rotation, {x:  2 * Math.PI, duration: 5, ease: "power1.inOut",repeat: -1, yoyo: true})
function render() {
    // let time = clock.getElapsedTime();
    // let deltaTime = clock.getDelta();
    // console.log("两次获取时间的间隔时间:", deltaTime )
    // let t = time % 5
    // cube.position.x = t * 1;
    // if(cube.position.x > 5) {
    //     cube.position.x = 0;
    // }
    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}

render ()
window.addEventListener("dblclick", ()=>{
    const fullScreenElement = document.fullscreenElement;
    if(!fullScreenElement) {
        renderer.domElement.requestFullscreen()
    }else{
        document.exitFullscreen()
    }
})

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

