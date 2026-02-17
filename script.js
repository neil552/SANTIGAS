// ===== FORMULARIO CON GOOGLE SHEETS =====
const formulario = document.getElementById("formulario");
const btn = document.getElementById("btnEnviar");
const loader = document.getElementById("loader");
const textoBtn = document.getElementById("textoBtn");
const estado = document.getElementById("estado");

formulario.addEventListener("submit", async function(e){
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    // Validaciones simples
    if(nombre.length < 3){
        estado.style.color = "red";
        estado.innerText = "El nombre debe tener al menos 3 letras.";
        return;
    }
    if(!correo.includes("@") || correo.length < 5){
        estado.style.color = "red";
        estado.innerText = "Ingresa un correo válido.";
        return;
    }
    if(mensaje.length < 5){
        estado.style.color = "red";
        estado.innerText = "El mensaje es demasiado corto.";
        return;
    }

    // Bloquear botón y mostrar loader
    btn.disabled = true;
    loader.style.display = "inline-block";
    textoBtn.style.display = "none";
    estado.innerText = "";

    try {
        const res = await fetch("https://script.google.com/macros/s/AKfycbxLyLkTlxtlbzYwwT0gUvhS-aiRE4fy2FTfUuuYw2Q9WuJeLxWkVYvVQAjDVkV3O_r1nw/exec", {
            method: "POST",
            body: JSON.stringify({ nombre, correo, mensaje }),
        });

        if(!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.text();

        estado.style.color = "green";
        estado.innerText = "Mensaje enviado correctamente 🔥";
        formulario.reset();
    } catch (error) {
        console.error(error);
        estado.style.color = "red";
        estado.innerText = "Error al enviar el mensaje. Intenta más tarde.";
    } finally {
        btn.disabled = false;
        loader.style.display = "none";
        textoBtn.style.display = "inline";
    }
});

// ===== MENU HAMBURGUESA =====
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
});

// ===== CURSOR GLOW =====
const glow = document.getElementById("cursorGlow");

document.addEventListener("mousemove", e => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});

