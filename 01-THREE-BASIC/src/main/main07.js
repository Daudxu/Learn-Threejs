import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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
// cube.rotation.set(Math.PI/4, 0, 0, "XYZ")


// 3个坐标轴的对象
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );
// 渲染
const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
// renderer.render(scene, camera)
scene.add(cube)

new OrbitControls( camera, renderer.domElement );
document.body.appendChild(renderer.domElement)

const clock = new THREE.Clock();
function render() {
    let time = clock.getElapsedTime();
    let deltaTime = clock.getDelta();
    console.log("两次获取时间的间隔时间:", deltaTime )
    let t = time % 5
    cube.position.x = t * 1;
    // if(cube.position.x > 5) {
    //     cube.position.x = 0;
    // }
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}
render ()

