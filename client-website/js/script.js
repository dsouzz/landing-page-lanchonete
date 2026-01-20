// Atualiza ano do footer
function atualizarAnoFooter() {
  const ano = new Date().getFullYear();
  const spanAno = document.getElementById("ano-atual");
  if (spanAno) {
    spanAno.textContent = ano;
  }
}

atualizarAnoFooter();

// Scripts da seção "Como Funciona"
document.addEventListener("DOMContentLoaded", () => {
  const perguntas = document.querySelectorAll(".faq-pergunta");

  perguntas.forEach((pergunta) => {
    pergunta.addEventListener("click", () => {
      const faqItem = pergunta.closest(".faq-item");
      const aberta = pergunta.getAttribute("aria-expanded") === "true";

      pergunta.setAttribute("aria-expanded", String(!aberta));
      faqItem.classList.toggle("ativo");
    });
  });
});

// Script para o carrossel de destaques da página de index.html
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  let activeIndex = slideIndex - 1;
  for (i = 0; i < slides.length; i++) {
    let position = (i - activeIndex + slides.length) % slides.length;
    if (position === 0) {
      // Center
      slides[i].style.left = "50%";
      slides[i].style.transform = "translateX(-50%) scale(1)";
      slides[i].style.opacity = "1";
      slides[i].style.filter = "none";
      slides[i].style.zIndex = "3";
    } else if (position === 1) {
      // Right
      slides[i].style.left = "75%";
      slides[i].style.transform = "translateX(-50%) scale(0.7)";
      slides[i].style.opacity = "0.5";
      slides[i].style.filter = "grayscale(50%)";
      slides[i].style.zIndex = "1";
    } else {
      // Left
      slides[i].style.left = "25%";
      slides[i].style.transform = "translateX(-50%) scale(0.7)";
      slides[i].style.opacity = "0.5";
      slides[i].style.filter = "grayscale(50%)";
      slides[i].style.zIndex = "1";
    }
  }
}

// Touch swipe functionality for mobile
let startX = 0;
let endX = 0;

const slideshowContainer = document.querySelector('.slideshow-container');

if (slideshowContainer) {
  slideshowContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  slideshowContainer.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance for swipe
    if (startX - endX > swipeThreshold) {
      // Swipe left - next slide
      plusSlides(1);
    } else if (endX - startX > swipeThreshold) {
      // Swipe right - previous slide
      plusSlides(-1);
    }
  }
}

// Configurações do Filtro do Cardápio
const filtroBtn = document.querySelector(".filtro-btn");
const filtroOpcoes = document.querySelector(".filtro-opcoes");

filtroBtn.addEventListener("click", () => {
  const aberto = filtroBtn.getAttribute("aria-expanded") === "true";

  filtroBtn.setAttribute("aria-expanded", !aberto);
  filtroOpcoes.classList.toggle("ativo");
});

const filtros = document.querySelectorAll(".filtro-opcoes li");
const itens = document.querySelectorAll(".item-cardapio");

filtros.forEach(filtro => {
  filtro.addEventListener("click", () => {
    const categoria = filtro.getAttribute("data-filter");

    itens.forEach(item => {
      if (categoria === "todos" || item.dataset.categoria === categoria) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });

    // Esconder os Títulos e a linha da seção
    const categorias = document.querySelectorAll("h3[data-categoria]");
    categorias.forEach((titulo) => {
      const cat = titulo.dataset.categoria;
      const itensDaCategoria = document.querySelectorAll(
        `.item-cardapio[data-categoria="${cat}"]`
      );
      const algumVisivel = Array.from(itensDaCategoria).some(
        item => item.style.display !== "none"
      );
      const sectionHeader = titulo.closest('.categoria-cardapio');
      sectionHeader.style.display = algumVisivel ? "" : "none";
    });

    // Fecha o menu após selecionar
    filtroOpcoes.classList.remove("ativo");
    filtroBtn.setAttribute("aria-expanded", "false");
  });
});