import * as THREE from 'three';
import { GLTFLoader } from 'jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

const title = document.getElementById("story_title");
const text = document.getElementById("story_text");
const nextBtn = document.getElementById("nextSceneBtn");
const prevBtn = document.getElementById("prevSceneBtn");
const resetBtn = document.getElementById("resetSceneBtn");
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

const storyScenes = [
  {
    title: "The Wanderer from the West",
    text: "An interactive story created by Ashwin Vivek",
    cam_position: [0, 10, 15],
    cam_target: [0, 0, 0]
  },
  {
    title: "Scene 1: The Village",
    text: "Traveling from the west, you arrive at a small riverside village, where smoke rises gently from chimneys.",
    cam_position: [-9.51, 0.85, 3.75],
    cam_target: [0, 0, 0]
  },
  {
    title: "Scene 2: The House",
    text: "You walk by a small house, wondering if you will ever be able to afford one with your meager wages.",
    cam_position: [-3.92, 0.28, 2.64],
    cam_target: [0.784, 0.28, -0.27]
  },
  {
    title: "Scene 3: The Mines",
    text: "Wandering along the outskirts of the village, you stumble upon an old mineshaft.",
    cam_position: [-8.19, 0.953, 9.935],
    cam_target: [-7.44, -0.05, 4.629]
  },
  {
    title: "Scene 4: The Mines",
    text: "You stand before the entrance in a daze as childhood yearning arises from the depths of your soul.",
    cam_position: [-7.66, 0.362, 8.54],
    cam_target: [-8.11, 0.1169, 3.57]
  },
  {
    title: "Scene 5: The Market",
    text: "You wander into the market, your stomach grumbling in protests. Alas coin is tight these days and you stare at the food stalls in envy.",
    cam_position: [0.297, 0.402, -0.066],
    cam_target: [10.45, -0.08, 1.37]
  },
  {
    title: "Scene 6: The Castle Gate",
    text: "You approach the gate guards and, seeking a distraction, insist that the merchant they let pass was no merchant at all, but rather a clever thief in disguise.",
    cam_position: [-0.017, 1.45, 0.005],
    cam_target: [-3.74,  1.2, -6.10]
  },
  {
    title: "Scene 7: The Inner Keep",
    text: "Amidst the guards tackling the helpless merchant, you slip quietly through the gates and into the keep.",
    cam_position: [-1.26,  4.72, -3.86],
    cam_target: [-6.91,  1.8, -5]
  },
  {
    title: "Scene 8: The Blacksmith",
    text: "You eye the blacksmith’s glowing forge with ill-advised curiosity. Alas, the crime of arsonry shall escape you this day.",
    cam_position: [-1.52,  1.43, -5.637],
    cam_target: [-3.78,  -0.184, -9.795]
  },
  {
    title: "Scene 9: The Barracks",
    text: "You round the corner and find yourself before the barracks, where the scent of steel and sweat hangs thick in the air.",
    cam_position: [-3.508,  1.81, -4.43],
    cam_target: [-6.98,  1.07, -7.96]
  },
  {
    title: "Scene 10: The Bulwark",
    text: "You climb up onto the bulwark and gaze at the catapult in wide-eyed wonder, while intrusive thoughts tell you to hop into the basket.",
    cam_position: [-7.5,  2.28, -1.94],
    cam_target: [0.195,  1.97, -0.01]
  },
  {
    title: "Scene 11: The Kingdom",
    text: "Your intrusive thoughts prevail. By day’s end, half the kingdom swears they saw a lone figure soaring across the sky like some bewildered, screaming comet.",
    cam_position: [-1.238,  2.2, 9.3],
    cam_target: [-1.92,  2.2, -1.472]
  },
  {
    title: "Scene 12: The Windmill",
    text: "You awake in a sea of shimmering wheat. Though the world feels strangely enchanted, you have no recollection of the road that led you here.",
    cam_position: [8.12,  1.47, 9.94],
    cam_target: [8.71,  0.293, 3.95]
  },

];

let currentScene = 0;
let modelsToLoad = [];

//Load GLTF model
const loader = new GLTFLoader();

function loadModels() {
  modelsToLoad.forEach((item) => {
    loader.load(item.file, (gltf) => {
      
      const model = gltf.scene;

      //Prompted ChatGPT to assist with converting string to number
      if (typeof item.rotX === "string") {
        item.rotX = Function("PI", `return ${item.rotX};`)(Math.PI);
      }

      model.position.set(item.pos[0], item.pos[1], item.pos[2]);

      //Rotates model around y axis not x. Variable mislabel that kept being used until it became more effort to change it to rotY
      if (typeof item.rotX === "number") {
        model.rotation.y = item.rotX;
      }

      //Scales models vertically as needed. Helps with adding more variety in vertical height on the medieval landscape
      model.scale.set(1, item.scaleY, 1);

      scene.add(model);

    });
  });
}

document.addEventListener('DOMContentLoaded', async function() {
    console.log('Async data loading ready!');
  
    try {
        const response = await fetch('models.json');
        if (!response.ok) throw new Error("Could not load models.json");

        const data = await response.json();
        modelsToLoad = data;

        console.log("Loaded models:", modelsToLoad.length);

        loadModels();

    } catch (error) {
        console.error('Could not load data because of error:', error);
    }
});

//Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcccccc);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 10, 15);
camera.lookAt(0, 0, 0);

const container = document.getElementById("three_container");

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

//Camera control
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.rotateSpeed = 0.6;
controls.zoomSpeed = 1.0;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.maxPolarAngle = Math.PI /2; 
controls.minPolarAngle = 0; 

//Lighting
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);


//Automatically resizes camera view based on window size
window.addEventListener('resize', () => {
  const w = container.clientWidth;
  const h = container.clientHeight;

  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  renderer.setSize(w, h);
});

//Updates animation frames
function animate() {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}

//Asked chatGPT to create a helper function to transition the camera view smoothly between different scenes
function animateCamera(toPos, toTarget, duration = 1.5) {
  const fromPos = camera.position.clone();
  const fromTarget = controls.target.clone();

  let t = 0;

  function step() {
    t += 1 / (60 * duration); // smooth over duration seconds
    if (t > 1) t = 1;

    // interpolate
    camera.position.lerpVectors(fromPos, toPos, t);
    controls.target.lerpVectors(fromTarget, toTarget, t);

    controls.update();

    if (t < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function updateStory() {
  title.innerHTML = storyScenes[currentScene].title;
  text.innerHTML = storyScenes[currentScene].text;

  prevBtn.disabled = currentScene === 0;
  nextBtn.disabled = currentScene === storyScenes.length - 1;

//Initially the camera would just snap automatically to the new position. For better immersion, I asked chatgpt to help with making a smoother transition. See the animateCamera function above

const toPos = new THREE.Vector3(
  storyScenes[currentScene].cam_position[0],
  storyScenes[currentScene].cam_position[1],
  storyScenes[currentScene].cam_position[2]
  );
  
const toTarget = new THREE.Vector3(
   storyScenes[currentScene].cam_target[0],
  storyScenes[currentScene].cam_target[1],
  storyScenes[currentScene].cam_target[2]
  );

  animateCamera(toPos, toTarget);
}

nextBtn.addEventListener("click", () => {
  if (currentScene < storyScenes.length - 1) {
    currentScene+=1;
    updateStory();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentScene > 0) {
    currentScene-=1;
    updateStory();
  }
});

resetBtn.addEventListener("click", () => {
  if (currentScene != 0) {
    currentScene = 0;
    updateStory();
  }
  music.currentTime = 0;
  music.pause()
  musicBtn.innerHTML = "Play Music";
});

musicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    musicBtn.innerHTML = "Pause Music";
  } else {
    music.pause();
    musicBtn.innerHTML = "Play Music";
  }
});

updateStory();
animate();
