import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// WEBGL 렌더러 인스턴스 생성
// Three.js가 웹페이지에 공간을 할당하는데 사용하는 도구로 생각하면 됨
const renderer = new THREE.WebGLRenderer();

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
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(planeMesh);
planeMesh.rotation.x = -0.5 * Math.PI;

// 구 추가
const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    wireframe: false,
});
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphereMesh);
sphereMesh.position.set(-10, 10, 0);

function animate(time) {
    // 박스 회전
    boxMesh.rotation.x = time / 1000;
    boxMesh.rotation.y = time / 1000;
    renderer.render(scene, camera);
}

// 장면과 카메라를 렌더러에 추가
// renderer.render(scene, camera);
renderer.setAnimationLoop(animate);
