import './style.css'
import * as dat from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { AnimationClip, AnimationMixer, LoopOnce, Vector3, VectorKeyframeTrack } from 'three'



// let btn1 = document.getElementById('btn1')
// let btn2 = document.getElementById('btn2')
// let btn3 = document.getElementById('btn3')
// let btn4 = document.getElementById('btn4')
// let btn5 = document.getElementById('btn5')



let contentGraphicDesign = document.getElementById('contentGraphicDesign')
let contentAnimation = document.getElementById("contentAnimation")
let content3D = document.getElementById("content3D")
let contentInteraction = document.getElementById("contentInteraction")
let contentDrawing = document.getElementById("contentDrawing")

const v1 = new THREE.Vector3(-2.5,-1.6,0)
const v2 = new THREE.Vector3(2.5,-1.6,0)
const v3 = new THREE.Vector3(-2.5,-1.6,0)
const v4 = new THREE.Vector3(2.5,-1.6,0)
const v5 = new THREE.Vector3(-1.8,-3,3)




let angle1 = Math.PI * 1.75
let angle2 = Math.PI * 2.75


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Axis Helper
// const axisHelper = new THREE.AxisHelper(5)
// scene.add(axisHelper)

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)


/**
 * Models
 */

var stores
 gltfLoader.load(
    'stores.glb',
    (gltf) => 
    {
        stores = gltf.scene
        gltf.scene.traverse((child) =>  
        {
            child.material = bakedMaterial
        })

        //初始状态1
        stores.rotation.y = angle1
        stores.position.set(v1.x, v1.y, v1.z)
        console.log(stores.position)

        scene.add(gltf.scene)        
    }
)



// Textures
const bakedTexture = textureLoader.load('newBaked.jpg')
bakedTexture.flipY = false
bakedTexture.encoding = THREE.sRGBEncoding


//Materials
const bakedMaterial = new THREE.MeshBasicMaterial({ map : bakedTexture })


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(30, sizes.width / sizes.height, 0.1, 100)
scene.add(camera)



// // Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = true
controls.enableRotate = true

/**Rotation */
controls.maxAzimuthAngle = 0.2
controls.minAzimuthAngle = -0.1


controls.maxDistance = 13
controls.minDistance = 10
controls.rotateSpeed = 0.1
controls.zoomSpeed = 0.2
controls.maxPolarAngle = Math.PI * 0.5
controls.minPolarAngle = Math.PI * 0.4

camera.position.set(0,0,10)
controls.update()



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setClearColor( 0xd2b48e, 1)
// renderer.setClearColor( 0x9de8e7, 1)


/**
 * Animate
 */

 
let moveValue = 0
let angle = 0.01
let rotatedAngle = 0

/**
 * 平移
 */

function moveToSectionOne(){
    if(stores){
        stores.position.lerp(v1, 0.01)

        if (lastStatus == "sectionThree" || lastStatus == "sectionFour" || lastStatus == "sectionFive"){

            if(rotatedAngle < Math.PI){
    
                stores.rotation.y += angle
                rotatedAngle += angle
            }
        }    
        
    }


}


 function moveToSectionTwo(){
    if(stores){

        stores.position.lerp(v2, 0.01)

        
        if (lastStatus == "sectionThree" || lastStatus == "sectionFour" || lastStatus == "sectionFive"){

            if(rotatedAngle < Math.PI){
    
                stores.rotation.y += angle
                rotatedAngle += angle
            }
        }    
        

    }


}

function moveToSectionThree(){
    if(stores){

        stores.position.lerp(v3, 0.01)
        
        if (lastStatus == "sectionOne" || lastStatus == "sectionTwo"){

            if(rotatedAngle < Math.PI){

                stores.rotation.y += angle
                rotatedAngle += angle
            }
        }


    }
    
    
}


function moveToSectionFour(){
    if(stores){

        stores.position.lerp(v4, 0.01)

        if (lastStatus == "sectionOne" || lastStatus == "sectionTwo"){

            if(rotatedAngle < Math.PI){

                stores.rotation.y += angle
                rotatedAngle += angle
            }
        }
    
    }
}


function moveToSectionFive(){
    if(stores){

        stores.position.lerp(v5, 0.01)

        if (lastStatus == "sectionOne" || lastStatus == "sectionTwo"){

            if(rotatedAngle < Math.PI){

                stores.rotation.y += angle
                rotatedAngle += angle
            }
        }
    
    }
}


const clock = new THREE.Clock()
let time = Date.now()

const tick = () =>
{
  
    const elapsedTime = clock.getElapsedTime()
    const currentTime = Date.now()
    const deltaTime = currentTime - time
    time = currentTime

    // // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)


    // 检查status状态并移动
    if (status == "sectionOne"){
        if (moveValue < 1){
            window.requestAnimationFrame(moveToSectionOne)
        }
        else {
            moveValue = 0
        }
    }


    if (status == "sectionTwo"){
        if (moveValue < 1){
            window.requestAnimationFrame(moveToSectionTwo)
        }
        else {
            moveValue = 0
        }
    }

    if (status == "sectionThree"){
        if (moveValue < 1 ){
            window.requestAnimationFrame(moveToSectionThree)
        }
        else {
            moveValue = 0
        }
    }

    if (status == "sectionFour"){
        if (moveValue < 1){
            window.requestAnimationFrame(moveToSectionFour)
        }
        else {
            moveValue = 0
        }
    }

    if (status == "sectionFive"){
        if (moveValue < 1){
            window.requestAnimationFrame(moveToSectionFive)
        }
        else {
            moveValue = 0
        }
    }


   
}



tick()

var status = "sectionOne"
var lastStatus = " "


 /*
点击按钮事件
 */



contentGraphicDesign.style.display = "none"
content3D.style.display = "none"
contentInteraction.style.display = "none"
contentDrawing.style.display = "none"




function EnterStatus1(){

    lastStatus = status
    status = "sectionOne"
    rotatedAngle = 0
    moveToSectionOne()
    console.log(lastStatus)
    console.log(status)

    if (lastStatus !== "sectionOne"){
        rotatedAngle = 0
    }

    contentAnimation.style.display = "block"
    contentGraphicDesign.style.display = "none"
    content3D.style.display = "none"
    contentInteraction.style.display = "none"
    contentDrawing.style.display = "none"





}

 function EnterStatus2() {

    lastStatus = status
    rotatedAngle = 0
    status = "sectionTwo"
    moveToSectionTwo()
    console.log(lastStatus)
    console.log(status)

    if (lastStatus !== "sectionTwo"){
        rotatedAngle = 0
    }

    contentAnimation.style.display = "none"
    contentGraphicDesign.style.display = "block"
    content3D.style.display = "none"
    contentInteraction.style.display = "none"
    contentDrawing.style.display = "none"





}

function EnterStatus3() {

    lastStatus = status
    status = "sectionThree"
    moveToSectionThree()
    console.log(lastStatus)
    console.log(status)

    
    if (lastStatus !== "sectionThree"){
        rotatedAngle = 0
    }

    contentAnimation.style.display = "none"
    contentGraphicDesign.style.display = "none"
    content3D.style.display = "block"
    contentInteraction.style.display = "none"
    contentDrawing.style.display = "none"




}

function EnterStatus4() {

    lastStatus = status
    status = "sectionFour"

    if (lastStatus !== "sectionFour"){
        rotatedAngle = 0
        moveToSectionFour()
    }

    contentAnimation.style.display = "none"
    contentGraphicDesign.style.display = "none"
    content3D.style.display = "none"
    contentInteraction.style.display = "block"
    contentDrawing.style.display = "none"


}

function EnterStatus5() {

    lastStatus = status
    status = "sectionFive"
    rotatedAngle = 0
    moveToSectionFive()
    console.log(lastStatus)
    console.log(status)

    if (lastStatus !== "sectionFive"){
        rotatedAngle = 0
    }

    contentAnimation.style.display = "none"
    contentGraphicDesign.style.display = "none"
    content3D.style.display = "none"
    contentInteraction.style.display = "none"
    contentDrawing.style.display = "block"

}



 btn1.addEventListener("click", EnterStatus1)
 btn2.addEventListener("click", EnterStatus2)
 btn3.addEventListener("click", EnterStatus3)
 btn4.addEventListener("click", EnterStatus4)
 btn5.addEventListener("click", EnterStatus5)


 
