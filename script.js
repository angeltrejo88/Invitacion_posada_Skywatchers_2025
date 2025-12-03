document.addEventListener('DOMContentLoaded', () => {
    
    // =====================================
    // 1. LÓGICA DEL CONTADOR REGRESIVO
    // =====================================
    
    // ** IMPORTANTE: Establece la fecha y hora de tu evento (21 de Diciembre de 2025 a las 19:00:00) **
    const eventDate = new Date("Dec 13, 2025 18:00:00").getTime();

    const countdownFunction = setInterval(function() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        // Cálculo de tiempo en días, horas, minutos y segundos
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Actualizar el DOM
        if (document.getElementById("days")) {
            document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
            document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
            document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
            document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;
        }

        // Si la cuenta regresiva termina, mostrar un mensaje
        if (distance < 0) {
            clearInterval(countdownFunction);
            if (document.getElementById("countdown-timer")) {
                document.getElementById("countdown-timer").innerHTML = "¡LA POSADA ESTÁ EN MARCHA!";
            }
        }
    }, 1000);

    // =====================================
    // 2. EFECTO DE NIEVE (Con Canvas)
    // =====================================

    const canvas = document.getElementById('snow-canvas');
    const ctx = canvas.getContext('2d');
    
    // Asegurar que el canvas ocupe toda la ventana
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Creación de los copos de nieve
    const snowFlakes = [];
    const maxFlakes = 100; // Número de copos de nieve

    function SnowFlake() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1; // Tamaño de 1 a 3
        this.speedX = Math.random() * 0.5 - 0.25; // Movimiento lateral sutil
        this.speedY = Math.random() * 1 + 0.5; // Velocidad de caída
    }

    // Dibujar el copo de nieve
    SnowFlake.prototype.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
    };

    // Mover y resetear el copo de nieve
    SnowFlake.prototype.update = function() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Si el copo sale de la pantalla, reubicarlo arriba
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
        // Si el copo sale de los lados, reubicarlo al lado opuesto
        if (this.x > canvas.width || this.x < 0) {
            this.x = this.x > canvas.width ? 0 : canvas.width;
        }
    };

    // Inicializar los copos
    for (let i = 0; i < maxFlakes; i++) {
        snowFlakes.push(new SnowFlake());
    }

    // Bucle principal de la animación de nieve
    function animateSnow() {
        // Limpiar el canvas para el siguiente frame
        ctx.clearRect(0, 0, canvas.width, canvas.height); 

        for (let i = 0; i < maxFlakes; i++) {
            snowFlakes[i].update();
            snowFlakes[i].draw();
        }

        requestAnimationFrame(animateSnow);
    }
    animateSnow();
    
    // =====================================
    // 3. ESFERAS FLOTANTES DINÁMICAS
    // =====================================

    const colors = ['red', 'green', 'white'];
    const numOrnaments = 10;
    const content = document.getElementById('invitation-content');
    
    // Función para crear una esfera
    function createOrnament(index) {
        const ornament = document.createElement('div');
        ornament.className = 'ornament ' + colors[index % colors.length];
        
        // Posición inicial aleatoria
        ornament.style.left = Math.random() * 90 + '%';
        ornament.style.top = Math.random() * 1000 + 'px'; // Distribuido a lo largo del scroll
        
        // Retraso de animación aleatorio para que no floten a la vez
        const delay = Math.random() * 5;
        ornament.style.animationDelay = delay + 's';
        
        // Agregar interactividad (un pequeño salto al tocar/hacer clic)
        ornament.addEventListener('click', () => {
            ornament.style.transform = 'scale(1.5)';
            setTimeout(() => {
                 ornament.style.transform = 'scale(1)';
            }, 300);
        });
        
        content.appendChild(ornament);
    }
    
    // Crear el número deseado de esferas
    for (let i = 0; i < numOrnaments; i++) {
        createOrnament(i);
    }
});

