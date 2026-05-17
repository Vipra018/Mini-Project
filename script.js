function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
  }
  
  /* LOGIN */
  function login() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
  
    if (!name || !email) {
      document.getElementById("error").innerText = "Fill all fields";
      return;
    }
  
    showPage("dashboard");
  }
  
  /* GEOLOCATION */
  function getLocation() {
    navigator.geolocation.getCurrentPosition(pos => {
      document.getElementById("location").value =
        pos.coords.latitude + ", " + pos.coords.longitude;
    });
  }
  
  /* IMAGE PREVIEW */
  const input = document.getElementById("imageInput");
  const preview = document.getElementById("preview");
  
  input.addEventListener("change", () => {
    const file = input.files[0];
    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";
  });
  
  function analyze() {

    
    document.getElementById("loader").classList.remove("hidden");
  
    
    setTimeout(() => {
  
      document.getElementById("loader").classList.add("hidden");
  
      
      let aqi = 175;
  
      let status = "";
      let color = "";
      let health = "";
  
      // AQI LOGIC
  
      if (aqi <= 50) {
  
        status = "Good";
        color = "#22c55e";
  
        health =
          "Air quality is satisfactory and poses little or no risk.";
  
      } else if (aqi <= 100) {
  
        status = "Moderate";
        color = "#eab308";
  
        health =
          "Air quality is acceptable, but sensitive people may experience discomfort.";
  
      } else if (aqi <= 150) {
  
        status = "Unhealthy for Sensitive Groups";
        color = "#f97316";
  
        health =
          "People with respiratory issues should reduce prolonged outdoor exposure.";
  
      } else if (aqi <= 200) {
  
        status = "Unhealthy";
        color = "#ef4444";
  
        health =
          "Health effects may begin to appear for everyone.";
  
      } else if (aqi <= 300) {
  
        status = "Very Unhealthy";
        color = "#9333ea";
  
        health =
          "Serious health effects possible. Avoid outdoor activities.";
  
      } else {
  
        status = "Hazardous";
        color = "#7f1d1d";
  
        health =
          "Emergency conditions. Entire population is likely to be affected.";
      }
  
      // Update UI
  
      document.getElementById("aqiValue").innerText = aqi;
  
      document.getElementById("aqiStatus").innerText = status;
  
      document.getElementById("healthText").innerText = health;
  
      // AQI Circle Color
      document.querySelector(".circle").style.borderColor = color;
  
      document.querySelector(".circle").style.boxShadow =
        `0 0 30px ${color}`;
  
      // Status Color
      document.getElementById("aqiStatus").style.color = color;
  
      // Show result card
      document.getElementById("result").classList.remove("hidden");
  
    }, 2000);
  }

  const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
  }

  draw() {
    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < 120; i++) {
    particles.push(new Particle());
  }
}

function connectParticles() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      let dx = particles[a].x - particles[b].x;
      let dy = particles[a].y - particles[b].y;
      let distance = dx * dx + dy * dy;

      if (distance < 10000) {
        ctx.strokeStyle = "rgba(56,189,248,0.1)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  connectParticles();
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

/* Resize fix */
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

