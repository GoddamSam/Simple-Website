const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Firework particles
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = 2;
        this.speed = 2;
        this.opacity = 1;
    }

    update() {
        this.radius -= 0.05;
        this.opacity -= 0.02;
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
    }

    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

// Create fireworks
function createFirework(x, y) {
    const particles = [];
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

    for (let i = 0; i < 50; i++) {
        const angle = (Math.PI * 2) * (i / 50);
        const color = colors[Math.floor(Math.random() * colors.length)];

        particles.push(new Particle(x, y, color, angle));
    }

    fireworks.push(particles);
}

// Draw fireworks
function drawFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < fireworks.length; i++) {
        for (let j = 0; j < fireworks[i].length; j++) {
            fireworks[i][j].update();
            fireworks[i][j].draw();
        }
    }

    fireworks = fireworks.filter(particles => particles[0].opacity > 0);
}

// Launch fireworks on mouse click
document.addEventListener('click', (event) => {
    createFirework(event.clientX, event.clientY);
});

// Animation loop
let fireworks = [];

function animate() {
    drawFireworks();
    requestAnimationFrame(animate);
}

animate();
