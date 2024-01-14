import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import nebulas from "../img/nebula.jpg";
import stars from "../img/stars.jpg";

const monkeyUrl = new URL("../assets/monkey.glb", import.meta.url);

// WEBGL 렌더러 인스턴스 생성
// Three.js가 웹페이지에 공간을 할당하는데 사용하는 도구로 생각하면 됨
const renderer = new THREE.WebGLRenderer();

// 렌더러에 그림자 효과를 추가
renderer.shadowMap.enabled = true;

// 렌더러의 크기 설정
renderer.setSize(window.innerWidth, window.innerHeight);

// 렌더러를 웹페이지에 추가
document.body.appendChild(renderer.domElement);

// 장소 생성
const scene = new THREE.Scene();

// 카메라 생성
const camera = new THREE.PerspectiveCamera(
    75, // 시야각
    window.innerWidth / window.innerHeight, // 종횡비
    0.1, // 렌더링 시작 거리
    1000 // 렌더링 끝 거리
);

// 카메라 컨트롤러 생성
const orbit = new OrbitControls(camera, renderer.domElement);

// 축 도우미 생성
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 그리드 도우미 생성
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

// 카메라의 x, y, z 좌표 설정
camera.position.set(-10, 30, 30);
// 카메라가 마우스 움직임에 반응하도록 설정
orbit.update();

// 박스 추가
const boxGeometry = new THREE.BoxGeometry(); // 상자를 만듬
const boxMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
}); // 상자의 스킨을 만듬
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial); // 상자에 스킨을 입힘
scene.add(boxMesh);

// 평면 추가
const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(planeMesh);
planeMesh.rotation.x = -0.5 * Math.PI;
planeMesh.receiveShadow = true; // 그림자 효과를 받도록 설정

// 구 추가
const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x0000ff,
    wireframe: false,
});
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphereMesh);
sphereMesh.position.set(-10, 10, 0);
sphereMesh.castShadow = true; // 그림자 효과를 만들도록 설정

let step = 0;

// 모든 객체에 동일하게 빛을 적용하여 주변 광을 시뮬레이트합니다.
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// // 태양과 같은 빛을 시뮬레이트하며, 빛이 특정 방향에서 오는 것처럼 보입니다.
// const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
// scene.add(directionalLight);
// directionalLight.position.set(-30, 50, 0);
// directionalLight.castShadow = true; // 그림자 효과를 만들도록 설정
// directionalLight.shadow.camera.bottom = -12;

// // 빛의 도우미를 만들어서 장면에 추가합니다.
// const directionalLightHelper = new THREE.DirectionalLightHelper(
//     directionalLight,
//     5
// );
// scene.add(directionalLightHelper);

// // 카메라의 도우미를 만들어서 장면에 추가합니다.
// const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(cameraHelper);

// 스포트라이트를 만들어서 장면에 추가합니다.
const spotLight = new THREE.SpotLight(0xffffff);
scene.add(spotLight);
spotLight.position.set(-100, 100, 0);
spotLight.castShadow = true; // 그림자 효과를 만들도록 설정
spotLight.angle = 0.2;

// 스포트라이트의 도우미를 만들어서 장면에 추가합니다.
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

// scene.fog = new THREE.Fog(0xffffff, 1, 200);
scene.fog = new THREE.FogExp2(0xffffff, 0.01);
// renderer.setClearColor(0xffea00);

const textureLoader = new THREE.TextureLoader();
// scene.background = textureLoader.load(stars);

// 배경을 큐브 텍스처로 만듭니다.
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    nebulas,
    nebulas,
    stars,
    stars,
    stars,
    stars,
]);

const box2Geometry = new THREE.BoxGeometry(4, 4, 4);
const box2Material = new THREE.MeshStandardMaterial({
    // color: 0x00ff00,
    // map: textureLoader.load(nebulas),
});
const box2MultiMaterial = [
    new THREE.MeshBasicMaterial({ map: textureLoader.load(stars) }),
    new THREE.MeshBasicMaterial({ map: textureLoader.load(stars) }),
    new THREE.MeshBasicMaterial({ map: textureLoader.load(nebulas) }),
    new THREE.MeshBasicMaterial({ map: textureLoader.load(stars) }),
    new THREE.MeshBasicMaterial({ map: textureLoader.load(nebulas) }),
    new THREE.MeshBasicMaterial({ map: textureLoader.load(stars) }),
];
const box2Mesh = new THREE.Mesh(box2Geometry, box2MultiMaterial);
scene.add(box2Mesh);
box2Mesh.position.set(0, 15, 10);
// box2Mesh.material.map = textureLoader.load(nebulas);

// 마우스 움직임에 따라 카메라가 움직이도록 설정
const mousePositon = new THREE.Vector2();
window.addEventListener("mousemove", (e) => {
    mousePositon.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePositon.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

const raycaster = new THREE.Raycaster();

const sphereId = sphereMesh.id;
box2Mesh.name = "theBox";

// 평면 추가
const plane2Geometry = new THREE.PlaneGeometry(10, 10, 10, 10);
const plane2Material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
});
const plane2Mesh = new THREE.Mesh(plane2Geometry, plane2Material);
scene.add(plane2Mesh);
plane2Mesh.position.set(10, 10, 15);

plane2Mesh.geometry.attributes.position.array[0] -= 10 * Math.random();
plane2Mesh.geometry.attributes.position.array[1] -= 10 * Math.random();
plane2Mesh.geometry.attributes.position.array[2] -= 10 * Math.random();
const lastPointZ = plane2Mesh.geometry.attributes.position.array.length - 1;
plane2Mesh.geometry.attributes.position.array[lastPointZ] -= 10 * Math.random();

// const vShader = `
//     void main() {
//         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//     }
// `;
// const fShader = `
//     void main() {
//         gl_FragColor = vec4(0.5, 0.5, 1.0, 1.0);
//     }
// `;
const sphere2Geometry = new THREE.SphereGeometry(4);
const sphere2Material = new THREE.ShaderMaterial({
    vertexShader: document.getElementById("vertexShader").textContent,
    fragmentShader: document.getElementById("fragmentShader").textContent,
});
const sphere2Mesh = new THREE.Mesh(sphere2Geometry, sphere2Material);
scene.add(sphere2Mesh);
sphere2Mesh.position.set(-5, 10, 10);

const assetLoader = new GLTFLoader();

assetLoader.load(
    monkeyUrl.href,
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.position.set(-12, 4, 10);
    },
    undefined,
    (error) => {
        console.error(error);
    }
);

const gui = new dat.GUI();
const options = {
    sphereColor: 0xff0000,
    wireframe: false,
    speed: 0.01,
    angle: 0.2,
    penumbra: 0,
    intensity: 1,
};
gui.addColor(options, "sphereColor").onChange((e) => {
    sphereMaterial.color.set(e);
});
gui.add(options, "wireframe").onChange((e) => {
    sphereMaterial.wireframe = e;
});
gui.add(options, "speed", 0, 0.1);
gui.add(options, "angle", 0, 1);
gui.add(options, "penumbra", 0, 1);
gui.add(options, "intensity", 0, 1);

function animate(time) {
    // 박스 회전
    boxMesh.rotation.x = time / 1000;
    boxMesh.rotation.y = time / 1000;

    step += options.speed;
    sphereMesh.position.y = 10 * Math.abs(Math.sin(step));

    spotLight.angle = options.angle;
    spotLight.penumbra = options.penumbra;
    spotLight.intensity = options.intensity;
    spotLightHelper.update();

    // 마우스 움직임에 따라 카메라가 움직이도록 설정
    raycaster.setFromCamera(mousePositon, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    // console.log(intersects);

    for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object.id === sphereId) {
            intersects[i].object.material.color.set(0xff0000);
        }
        if (intersects[i].object.name === "theBox") {
            intersects[i].object.rotation.x = time / 1000;
            intersects[i].object.rotation.y = time / 1000;
        }
    }

    plane2Mesh.geometry.attributes.position.array[0] = 10 * Math.random();
    plane2Mesh.geometry.attributes.position.array[1] = 10 * Math.random();
    plane2Mesh.geometry.attributes.position.array[2] = 10 * Math.random();
    plane2Mesh.geometry.attributes.position.array[lastPointZ] =
        10 * Math.random();
    plane2Mesh.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

// 장면과 카메라를 렌더러에 추가
// renderer.render(scene, camera);
renderer.setAnimationLoop(animate);
