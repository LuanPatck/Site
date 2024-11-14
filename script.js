// Configurações para o cubo mágico usando Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("cube").appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const materials = [
  new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Frente
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Verso
  new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Topo
  new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Fundo
  new THREE.MeshBasicMaterial({ color: 0xff00ff }), // Lado esquerdo
  new THREE.MeshBasicMaterial({ color: 0x00ffff })  // Lado direito
];
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);
camera.position.z = 5;

let solved = false;
function animateCube() {
  requestAnimationFrame(animateCube);

  // Animação de rotação até resolver
  if (!solved) {
    cube.rotation.x += 0.05;
    cube.rotation.y += 0.05;
    if (cube.rotation.x > Math.PI * 2 && cube.rotation.y > Math.PI * 2) {
      solved = true;
      fadeOutCube();
    }
  }

  renderer.render(scene, camera);
}
animateCube();

// Função para fazer o cubo desaparecer suavemente
function fadeOutCube() {
  let opacity = 1.0;

  function fade() {
    opacity -= 0.01;
    cube.material.forEach((material) => {
      material.transparent = true;
      material.opacity = opacity;
    });
    if (opacity > 0) {
      requestAnimationFrame(fade);
    } else {
      showMessage(); // Exibe a mensagem após o cubo desaparecer
    }
    renderer.render(scene, camera);
  }
  fade();
}

// Função para mostrar a mensagem e corações animados
function showMessage() {
  const message = document.getElementById("message");
  message.classList.remove("hidden");
  message.style.opacity = 1;
  setInterval(createHeart, 300); // Gera corações a cada 300ms
}

// Função para criar corações flutuantes
function createHeart() {
  const heart = document.createElement("div");
  heart.innerText = "❤️";
  heart.classList.add("heart");
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.animationDuration = `${Math.random() * 3 + 2}s`;
  document.body.appendChild(heart);

  // Remove o coração após a animação
  setTimeout(() => {
    heart.remove();
  }, 5000);
}
