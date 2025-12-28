//globe
const canvas = document.getElementById("globeCanvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,1,0.1,1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});

function resize(){
  const s = canvas.parentElement.clientWidth;
  canvas.width = s;
  canvas.height = s;
  renderer.setSize(s,s);
  camera.aspect = 1;
  camera.updateProjectionMatrix();
}
resize();
window.addEventListener("resize",resize);

scene.add(new THREE.AmbientLight(0xffffff,0.9));
const light = new THREE.DirectionalLight(0xffcc88,1.2);
light.position.set(5,5,5);
scene.add(light);

// Wireframe globe
const globe = new THREE.Mesh(
  new THREE.SphereGeometry(1.2,64,64),
  new THREE.MeshBasicMaterial({
    color:0xDBB2B9,
    wireframe:true,
    transparent:true,
    opacity:0.45
  })
);
scene.add(globe);

// Text on globe 
function makeTextTexture(text){
  const c=document.createElement("canvas");
  c.width=1024;c.height=512;
  const ctx=c.getContext("2d");
  ctx.font="italic 50px Poppins";
  ctx.textAlign="center";
  ctx.textBaseline="middle";
  ctx.shadowColor="#00f0ff";
  ctx.shadowBlur=20;
  ctx.fillStyle="#fff";
  ctx.fillText(text,c.width/2,c.height/2);
  return new THREE.CanvasTexture(c);
}

const textSphere=new THREE.Mesh(
  new THREE.SphereGeometry(1.22,64,64),
      new THREE.MeshBasicMaterial({
        map: makeTextTexture("CLIENTURA"),
        transparent: true,
        side: THREE.DoubleSide
      })

    );
scene.add(textSphere);

// globe rotation

let isHovering = false;
let currentRotation = 0;
let targetRotation = 0;

const BASE_ROTATION = 0;

function animate() {
  requestAnimationFrame(animate);

  targetRotation += 0.02;
  currentRotation += (targetRotation - currentRotation) * 0.1;

  globe.rotation.y = currentRotation;
  textSphere.rotation.y = currentRotation;

  renderer.render(scene, camera);
}

animate();




//for mobile support
canvas.addEventListener("touchmove", e => {
  const t = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  rotY = ((t.clientX - rect.left) / rect.width - 0.5) * 1.5;
});


const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target); 
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach(el => revealObserver.observe(el));


//birds background

const birdsEffect=VANTA.BIRDS({
  el: "#birds",
  mouseControls: true,
  touchControls: false,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  color1:0xf59e0b,
  color2: 0xff0800,
  birdSize: 1.2,
  wingSpan: 40.00,
  separation: 63.00
})

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    card.style.transform = `
      translate(${x * 0.05}px, ${y * 0.05}px)
      scale(1.05)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translate(0,0) scale(1)";
  });
});


const cursor = document.createElement("div");
cursor.className = "cursor";
document.body.appendChild(cursor);

document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

document.querySelectorAll(".card, button, a").forEach(el => {
  el.addEventListener("mouseenter", () => cursor.style.transform = "scale(2)");
  el.addEventListener("mouseleave", () => cursor.style.transform = "scale(1)");
});


