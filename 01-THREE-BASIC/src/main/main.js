import * as THREE from 'three'
import { Color, DirectionalLight, Plane } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
// import gsap from 'gsap'

import  *  as dat from "dat.gui"
// 创建场景
const scene = new THREE.Scene();
const gui = new dat.GUI()
// 创建相机
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 2000)
// 设置相机位置
camera.position.set(0, 0, 10)
scene.add(camera)

