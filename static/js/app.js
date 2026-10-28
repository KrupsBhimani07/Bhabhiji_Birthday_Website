
document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // FLOATING HEARTS
    // ==========================================

    const floatingHearts = document.getElementById("floatingHearts");

    if (floatingHearts) {
        const hearts = ["💗", "💕", "💖", "💝", "♡"];

        for (let i = 0; i < 18; i++) {
            const heart = document.createElement("span");

            heart.className = "floating-heart";
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

            heart.style.left = Math.random() * 100 + "%";
            heart.style.animationDelay = Math.random() * 10 + "s";
            heart.style.animationDuration = 8 + Math.random() * 10 + "s";
            heart.style.fontSize = 14 + Math.random() * 20 + "px";

            floatingHearts.appendChild(heart);
        }
    }


    // ==========================================
    // SCROLL TO MEMORIES
    // ==========================================

    window.scrollToMemories = function () {
        const section = document.getElementById("bonding");

        if (section) {
            section.scrollIntoView({
                behavior: "smooth"
            });
        }
    };


    // ==========================================
    // BIRTHDAY LETTER OPEN / CLOSE
    // ==========================================

    const openLetterBtn = document.getElementById("openLetter");
    const closeLetterBtn = document.getElementById("closeLetter");

    const letterEnvelope = document.getElementById("letterEnvelope");
    const letterPaper = document.getElementById("letterPaper");

    if (openLetterBtn && letterEnvelope && letterPaper) {

        openLetterBtn.addEventListener("click", function () {

            letterEnvelope.classList.add("opened");

            setTimeout(function () {
                letterPaper.classList.add("show");
            }, 350);

            createConfetti();
        });
    }

    if (closeLetterBtn && letterEnvelope && letterPaper) {

        closeLetterBtn.addEventListener("click", function () {

            letterPaper.classList.remove("show");

            setTimeout(function () {
                letterEnvelope.classList.remove("opened");
            }, 350);
        });
    }


    // ==========================================
    // BIRTHDAY MUSIC
    // ==========================================

    const birthdayMusic = document.getElementById("birthdayMusic");

    const playMusicBtn = document.getElementById("playMusic");
    const pauseMusicBtn = document.getElementById("pauseMusic");

    if (birthdayMusic && playMusicBtn) {

        playMusicBtn.addEventListener("click", function () {

            birthdayMusic.play()
                .then(function () {
                    playMusicBtn.textContent = "🎵 Music Playing";
                })
                .catch(function () {
                    alert("Please click Play Music again.");
                });
        });
    }

    if (birthdayMusic && pauseMusicBtn) {

        pauseMusicBtn.addEventListener("click", function () {

            birthdayMusic.pause();

            if (playMusicBtn) {
                playMusicBtn.textContent = "▶ Play Music";
            }
        });
    }


    // ==========================================
    // CAKE CANDLE ANIMATION
    // ==========================================

    const blowCandlesBtn = document.getElementById("blowCandles");
    const relightCandlesBtn = document.getElementById("relightCandles");

    const birthdayMessage = document.getElementById("birthdayMessage");

    const flames = document.querySelectorAll(".flame");

    if (blowCandlesBtn) {

        blowCandlesBtn.addEventListener("click", function () {

            flames.forEach(function (flame) {
                flame.classList.add("flame-out");
            });

            if (birthdayMessage) {
                birthdayMessage.textContent =
                    "🎉 Happy Birthday! May all your wishes come true! 💖";
            }

            createConfetti();
        });
    }

    if (relightCandlesBtn) {

        relightCandlesBtn.addEventListener("click", function () {

            flames.forEach(function (flame) {
                flame.classList.remove("flame-out");
            });

            if (birthdayMessage) {
                birthdayMessage.textContent =
                    "Your wishes deserve to come true! 💖";
            }
        });
    }


    // ==========================================
    // MEMORY SLIDESHOW
    // ==========================================

    const memorySlides = document.querySelectorAll(".memory-slide");

    const slideDots = document.querySelectorAll(".slide-dot");

    const prevSlideBtn = document.getElementById("prevSlide");
    const nextSlideBtn = document.getElementById("nextSlide");

    const playSlideshowBtn = document.getElementById("playSlideshow");
    const pauseSlideshowBtn = document.getElementById("pauseSlideshow");

    let currentSlide = 0;
    let slideshowInterval = null;

    function showSlide(index) {

        if (memorySlides.length === 0) {
            return;
        }

        if (index >= memorySlides.length) {
            index = 0;
        }

        if (index < 0) {
            index = memorySlides.length - 1;
        }

        currentSlide = index;

        memorySlides.forEach(function (slide, i) {

            slide.classList.remove("active");

            if (i === currentSlide) {
                slide.classList.add("active");
            }
        });

        slideDots.forEach(function (dot, i) {

            dot.classList.remove("active");

            if (i === currentSlide) {
                dot.classList.add("active");
            }
        });
    }

    if (prevSlideBtn) {

        prevSlideBtn.addEventListener("click", function () {
            showSlide(currentSlide - 1);
        });
    }

    if (nextSlideBtn) {

        nextSlideBtn.addEventListener("click", function () {
            showSlide(currentSlide + 1);
        });
    }

    slideDots.forEach(function (dot, index) {

        dot.addEventListener("click", function () {
            showSlide(index);
        });
    });


    // Auto Slideshow

    function startSlideshow() {

        stopSlideshow();

        slideshowInterval = setInterval(function () {
            showSlide(currentSlide + 1);
        }, 4000);

        if (playSlideshowBtn) {
            playSlideshowBtn.textContent = "▶ Slideshow Playing";
        }
    }

    function stopSlideshow() {

        if (slideshowInterval) {
            clearInterval(slideshowInterval);
            slideshowInterval = null;
        }

        if (playSlideshowBtn) {
            playSlideshowBtn.textContent = "▶ Play Slideshow";
        }
    }

    if (playSlideshowBtn) {

        playSlideshowBtn.addEventListener("click", function () {
            startSlideshow();
        });
    }

    if (pauseSlideshowBtn) {

        pauseSlideshowBtn.addEventListener("click", function () {
            stopSlideshow();
        });
    }


    // ==========================================
    // MEMORY LIGHTBOX
    // ==========================================

    const memoryLightbox = document.getElementById("memoryLightbox");

    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxTitle = document.getElementById("lightboxTitle");
    const lightboxText = document.getElementById("lightboxText");

    const closeLightboxBtn = document.getElementById("closeLightbox");

    const lightboxPrevBtn = document.getElementById("lightboxPrev");
    const lightboxNextBtn = document.getElementById("lightboxNext");

    const memoryImages = document.querySelectorAll(".memory-photo");

    const memoryTitles = document.querySelectorAll(".memory-caption h3");
    const memoryTexts = document.querySelectorAll(".memory-caption p");

    let lightboxIndex = 0;

    window.openMemoryLightbox = function (index) {

        if (!memoryLightbox || memoryImages.length === 0) {
            return;
        }

        lightboxIndex = index;

        updateLightbox();

        memoryLightbox.classList.add("show");

        document.body.style.overflow = "hidden";
    };

    function updateLightbox() {

        if (!memoryImages[lightboxIndex]) {
            return;
        }

        lightboxImage.src = memoryImages[lightboxIndex].src;

        lightboxTitle.textContent =
            memoryTitles[lightboxIndex].textContent;

        lightboxText.textContent =
            memoryTexts[lightboxIndex].textContent;
    }

    function closeLightbox() {

        if (memoryLightbox) {
            memoryLightbox.classList.remove("show");
        }

        document.body.style.overflow = "";
    }

    if (closeLightboxBtn) {

        closeLightboxBtn.addEventListener("click", function () {
            closeLightbox();
        });
    }

    if (lightboxPrevBtn) {

        lightboxPrevBtn.addEventListener("click", function () {

            lightboxIndex--;

            if (lightboxIndex < 0) {
                lightboxIndex = memoryImages.length - 1;
            }

            updateLightbox();
        });
    }

    if (lightboxNextBtn) {

        lightboxNextBtn.addEventListener("click", function () {

            lightboxIndex++;

            if (lightboxIndex >= memoryImages.length) {
                lightboxIndex = 0;
            }

            updateLightbox();
        });
    }

    if (memoryLightbox) {

        memoryLightbox.addEventListener("click", function (event) {

            if (event.target === memoryLightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener("keydown", function (event) {

        if (!memoryLightbox || !memoryLightbox.classList.contains("show")) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowRight") {

            lightboxIndex++;

            if (lightboxIndex >= memoryImages.length) {
                lightboxIndex = 0;
            }

            updateLightbox();
        }

        if (event.key === "ArrowLeft") {

            lightboxIndex--;

            if (lightboxIndex < 0) {
                lightboxIndex = memoryImages.length - 1;
            }

            updateLightbox();
        }
    });


    // ==========================================
    // CONFETTI EFFECT
    // ==========================================

    function createConfetti() {

        const colors = [
            "#ff69b4",
            "#ffb6c1",
            "#ffd700",
            "#d8a7ff",
            "#ffffff"
        ];

        for (let i = 0; i < 45; i++) {

            const confetti = document.createElement("span");

            confetti.className = "birthday-confetti";

            confetti.style.left = Math.random() * 100 + "vw";
            confetti.style.backgroundColor =
                colors[Math.floor(Math.random() * colors.length)];

            confetti.style.animationDuration =
                2 + Math.random() * 3 + "s";

            confetti.style.animationDelay =
                Math.random() * 1.5 + "s";

            document.body.appendChild(confetti);

            setTimeout(function () {
                confetti.remove();
            }, 6000);
        }
    }


    // ==========================================
    // INITIALIZE
    // ==========================================

    showSlide(0);

});
