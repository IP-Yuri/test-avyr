const canvas = document.getElementById('particles-canvas');
        const ctx = canvas.getContext('2d');

        let width, height;

        // Resize canvas to full window size
        function resize() {
            width = window.innerWidth;
            height = window.innerHeight; // Cover only hero section or full page? Let's do full page fixed
            canvas.width = width;
            canvas.height = height;
        }

        window.addEventListener('resize', resize);
        resize();

        // Particle Class
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.8; // Increased Speed slightly
                this.vy = (Math.random() - 0.5) * 0.8;
                this.size = Math.random() * 3.5 + 2; // Increased Size (was 2 + 1)
                this.baseColor = 'rgba(168, 237, 242, ';
                this.opacity = Math.random() * 0.7 + 0.5; // Increased Opacity (was 0.5 + 0.1)
                this.color = this.baseColor + this.opacity + ')';
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Mouse Interaction
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 200) { // Increased interaction radius
                    // Move away slightly
                    this.x -= dx * 0.01;
                    this.y -= dy * 0.01;

                    // "Active" state: Pulse size
                    if (this.size < 5) this.size += 0.2;
                } else {
                    if (this.size > 2.5) this.size -= 0.1; // Return to normal
                }
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Create Particles
        const particlesArray = [];
        const numberOfParticles = 100; // Increased Density (was 80)

        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }

        // Mouse Object
        const mouse = { x: null, y: null };

        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        // Animation Loop
        function animate() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();

                // Draw Connections
                for (let j = i; j < particlesArray.length; j++) {
                    let dx = particlesArray[i].x - particlesArray[j].x;
                    let dy = particlesArray[i].y - particlesArray[j].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 180) { // Increased connection distance
                        ctx.strokeStyle = 'rgba(167, 235, 242, ' + (1 - distance / 180) * 0.25 + ')'; // Increased line opacity
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        }

        animate();

        // Pack Selection Logic
        function clearPack() {
            const contactSection = document.getElementById('contact');
            const packInput = document.getElementById('pack-input');

            // Allow default anchor behavior to handle scroll, or do it manually
            // We'll let the anchor href="#contact" handle the jump, but we ensure input is cleared
            packInput.value = '';

            // Optional: Focused state to show readiness
            setTimeout(() => {
                packInput.style.borderColor = ''; // Reset any previous highlight
                packInput.style.boxShadow = '';
            }, 100);
        }
        function selectPack(packName) {
            const contactSection = document.getElementById('contact');
            const packInput = document.getElementById('pack-input');

            contactSection.scrollIntoView({ behavior: 'smooth' });
            packInput.value = packName;

            // Highlight the input temporarily to show it was populated
            packInput.style.borderColor = '#A7EBF2';
            packInput.style.boxShadow = '0 0 15px rgba(167, 235, 242, 0.2)';
            setTimeout(() => {
                packInput.style.borderColor = '';
                packInput.style.boxShadow = '';
            }, 2000);
        }
        // for mobile menu
       
    function toggleMenu() {
        const menu = document.getElementById('mobile-menu');
        const hamburger = document.querySelector('.hamburger');
        menu.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    // Close Menu Function
    function closeMenu() {
        const menu = document.getElementById('mobile-menu');
        const hamburger = document.querySelector('.hamburger');
        menu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const menu = document.getElementById('mobile-menu');
        const hamburger = document.querySelector('.hamburger');
        if (menu && !menu.contains(e.target) && !hamburger.contains(e.target)) {
            closeMenu();
        }
    });