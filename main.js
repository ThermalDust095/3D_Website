import * as THREE from "three" 
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const canvas = document.querySelector("canvas.webgl")
console.log(canvas)
//Scene
const scene = new THREE.Scene()

//Object
const myGeometry = new THREE.SphereGeometry(3, 64, 64); 

const material = new THREE.MeshStandardMaterial({ color: 0xff0000, roughness: 0.2})

const mesh = new THREE.Mesh(myGeometry, material)
scene.add(mesh)

//Camera 
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const light = new THREE.PointLight(0xffffff , 20, 100)
light.position.set(0, 5, 5)
scene.add(light)

// const Ambientlight = new THREE.AmbientLight( 0x404040 ); // soft white light
// scene.add( Ambientlight );

const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 0.1, 100)
camera.position.z = 15
// camera.position.y = -0.5 
// camera.position.x = -0.5
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = true
controls.autoRotate = true
controls.autoRotate = 5

window.addEventListener("resize", ()=> {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})

const loop = () =>{
    controls.update()
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop)
}

loop()