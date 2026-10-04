document.addEventListener('DOMContentLoaded', () => {

    // --- Nav scroll effect ---
    const siteNav = document.getElementById('site-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            siteNav.classList.add('scrolled');
        } else {
            siteNav.classList.remove('scrolled');
        }
    });

    // --- Hero Canvas Particles ---
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        function createParticle() {
            const alpha = Math.random() * 0.6 + 0.1;
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.5 + 0.3,
                alpha: alpha,
                baseAlpha: alpha,
                speed: Math.random() * 0.4 + 0.1,
                dir: Math.random() * Math.PI * 2
            };
        }
        for (let i = 0; i < 120; i++) particles.push(createParticle());

        let mouseX = -1000;
        let mouseY = -1000;
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        });
        canvas.addEventListener('mouseleave', () => {
            mouseX = -1000;
            mouseY = -1000;
        });

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                // Interaction logic
                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) { // Interaction radius
                    const angle = Math.atan2(dy, dx);
                    // Push particle away from mouse
                    p.x -= Math.cos(angle) * 3;
                    p.y -= Math.sin(angle) * 3;
                    p.alpha = Math.min(p.alpha + 0.05, 1); // brighten when pushed
                } else {
                    p.alpha = Math.max(p.alpha - 0.01, p.baseAlpha); // slowly dim back
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
                ctx.fill();
                
                p.x += Math.cos(p.dir) * p.speed;
                p.y += Math.sin(p.dir) * p.speed;
                
                if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
                    Object.assign(p, createParticle());
                }
            });
            requestAnimationFrame(drawParticles);
        }
        drawParticles();
    }

    // --- 0.5. Ticket Intro Screen ---
    const ticketIntro = document.getElementById('ticket-intro');

    if (ticketIntro) {
        document.body.style.overflow = 'hidden';
        ticketIntro.style.cursor = 'pointer';

        let isOpening = false;
        ticketIntro.addEventListener('click', () => {
            if (isOpening) return;
            isOpening = true;

            const ticketContent = ticketIntro.querySelector('.ticket-content');
            if (ticketContent) ticketContent.classList.add('fade-out');

            // Trigger the cinematic background zoom slightly after the ticket starts zooming
            setTimeout(() => {
                ticketIntro.classList.add('open');
                document.body.style.overflow = '';
                if (typeof playMusic === 'function') playMusic();
            }, 300);

            // Remove from DOM after animations complete
            setTimeout(() => ticketIntro.remove(), 2000);
        });
    }

    // // --- 0.6. Flower Drop Effect ---
    // if (typeof WEDDING_CONFIG !== 'undefined' && WEDDING_CONFIG.theme.enableFlowerDrop) {
    //     const flowerContainer = document.getElementById('flower-container');
    //     const flowers = ['🌸', '🌺', '💮', '✨'];

    //     function createFlower() {
    //         if (!flowerContainer) return;
    //         const flower = document.createElement('div');
    //         flower.classList.add('flower-petal');
    //         flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];

    //         flower.style.left = Math.random() * 100 + 'vw';
    //         flower.style.animationDuration = (Math.random() * 5 + 7) + 's'; 
    //         flower.style.fontSize = (Math.random() * 1 + 1) + 'rem';

    //         flowerContainer.appendChild(flower);

    //         setTimeout(() => {
    //             flower.remove();
    //         }, 12000);
    //     }

    //     setInterval(createFlower, 600);
    // }

    // --- 0. Initialize AOS Animations ---
    AOS.init({
        once: true, // whether animation should happen only once - while scrolling down
        offset: 50, // offset (in px) from the original trigger point
    });

    // --- 1. Load Configuration Data ---
    if (typeof WEDDING_CONFIG !== 'undefined') {
        // Names
        document.getElementById('groom-name').textContent = WEDDING_CONFIG.couple.groom;
        document.getElementById('bride-name').textContent = WEDDING_CONFIG.couple.bride;
        document.getElementById('footer-names').textContent = `${WEDDING_CONFIG.couple.groom} & ${WEDDING_CONFIG.couple.bride}`;
        document.getElementById('english-subtitle').textContent = WEDDING_CONFIG.couple.subtitleEnglish;
        document.getElementById('khmer-subtitle').textContent = WEDDING_CONFIG.couple.subtitleKhmer;
        
        const ticketNames = document.querySelector('.ticket-names');
        if (ticketNames) ticketNames.textContent = `${WEDDING_CONFIG.couple.groom} & ${WEDDING_CONFIG.couple.bride}`;


        // Ticket Video Background
        const ticketVideoSrc = document.getElementById('ticket-video-source');
        if (ticketVideoSrc && WEDDING_CONFIG.theme && WEDDING_CONFIG.theme.ticketVideoBg) {
            ticketVideoSrc.src = WEDDING_CONFIG.theme.ticketVideoBg;
            ticketVideoSrc.parentElement.load();
        } else if (ticketVideoSrc) {
            ticketVideoSrc.parentElement.style.display = 'none';
        }

        // Main Website Video Background
        const mainVideoSrc = document.getElementById('main-video-source');
        if (mainVideoSrc && WEDDING_CONFIG.theme && WEDDING_CONFIG.theme.mainVideoBg) {
            mainVideoSrc.src = WEDDING_CONFIG.theme.mainVideoBg;
            mainVideoSrc.parentElement.load();
        } else if (mainVideoSrc) {
            mainVideoSrc.parentElement.style.display = 'none';
        }

        // Date formatting for display
        const dateObj = new Date(WEDDING_CONFIG.weddingDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const shortOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        document.getElementById('display-date').textContent = dateObj.toLocaleDateString('en-US', options);
        const ticketDateBadge = document.getElementById('ticket-date-badge');
        if (ticketDateBadge) ticketDateBadge.textContent = dateObj.toLocaleDateString('en-US', shortOptions);

        // Custom Fonts Loading
        if (WEDDING_CONFIG.customFonts) {
            let fontStyles = '';
            
            if (WEDDING_CONFIG.customFonts.headingFont) {
                fontStyles += `
                    @font-face {
                        font-family: 'CustomHeadingFont';
                        src: url('assets/fonts/${WEDDING_CONFIG.customFonts.headingFont}');
                        font-display: swap;
                    }
                    :root { --font-heading: 'CustomHeadingFont', 'Cinzel', serif !important; }
                `;
            }
            if (WEDDING_CONFIG.customFonts.bodyFont) {
                fontStyles += `
                    @font-face {
                        font-family: 'CustomBodyFont';
                        src: url('assets/fonts/${WEDDING_CONFIG.customFonts.bodyFont}');
                        font-display: swap;
                    }
                    :root { --font-body: 'CustomBodyFont', 'Outfit', sans-serif !important; }
                `;
            }
            if (WEDDING_CONFIG.customFonts.khmerFont) {
                fontStyles += `
                    @font-face {
                        font-family: 'CustomKhmerFont';
                        src: url('assets/fonts/${WEDDING_CONFIG.customFonts.khmerFont}');
                        font-display: swap;
                    }
                    :root { --font-khmer: 'CustomKhmerFont', 'Kantumruy Pro', 'Battambang', 'Noto Sans Khmer', sans-serif !important; }
                `;
            }

            if (fontStyles) {
                const styleSheet = document.createElement("style");
                styleSheet.innerText = fontStyles;
                document.head.appendChild(styleSheet);
            }
        }

        // Music & Theme
        document.getElementById('music-source').src = WEDDING_CONFIG.theme.musicLink;
        document.body.style.backgroundImage = `url('${WEDDING_CONFIG.theme.backgroundMotif}')`;

        // Set the music button style
        const musicToggleBtn = document.getElementById('music-toggle');
        if (musicToggleBtn) {
            musicToggleBtn.style.background = 'transparent';
            musicToggleBtn.style.border = '2px solid var(--gold)';
            musicToggleBtn.style.borderRadius = '50%';
        }

        // Gallery — Flip Cards
        const galleryContainer = document.getElementById('gallery-container');
        WEDDING_CONFIG.gallery.forEach((item, index) => {
            // Support both old string format and new object format
            const src     = typeof item === 'object' ? item.src : item;
            const caption = typeof item === 'object' ? (item.caption || '') : '';
            const khmer   = typeof item === 'object' ? (item.captionKhmer || '') : '';
            const date    = typeof item === 'object' ? (item.date || '') : '';
            const delay   = index * 80;

            const card = document.createElement('div');
            card.className = 'gallery-item';
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', delay);

            card.innerHTML = `
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <img src="${src}" alt="${caption || 'Couple Photo ' + (index + 1)}" loading="lazy">
                        <div class="flip-card-front-label">
                            ${date ? `<span class="year">${date}</span>` : ''}
                            ${caption ? `<span class="caption-en">${caption}</span>` : ''}
                        </div>
                        <div class="flip-hint">&#8635;</div>
                    </div>
                    <div class="flip-card-back">
                        ${date ? `<div class="flip-back-year">${date}</div>` : ''}
                        <div class="flip-back-divider">&#10022;</div>
                        ${caption ? `<div class="flip-back-caption">${caption}</div>` : ''}
                        ${khmer ? `<div class="flip-back-khmer">${khmer}</div>` : ''}
                        <div class="flip-back-close">Tap to close</div>
                    </div>
                </div>
            `;

            // Toggle flip on click
            card.addEventListener('click', () => {
                card.classList.toggle('flipped');
            });

            galleryContainer.appendChild(card);
        });

        // Events
        const eventsContainer = document.getElementById('events-container');
        WEDDING_CONFIG.events.forEach((evt, index) => {
            const delay = index * 150;
            let iconHtml = evt.icon;
            let iconClass = 'event-icon text-icon';
            
            // Check if icon string is an image file
            if (evt.icon && evt.icon.match(/\.(png|jpe?g|svg|webp|gif)$/i)) {
                iconHtml = `<img src="${evt.icon}" alt="Event Icon">`;
                iconClass = 'event-icon img-icon';
            }

            eventsContainer.innerHTML += `
                <div class="event-card" data-aos="zoom-in-up" data-aos-delay="${delay}" onclick="window.open('${evt.mapLink}', '_blank')" style="cursor: pointer;">
                    <div class="event-card-inner">
                        <div class="${iconClass}">${iconHtml}</div>
                        <h3>${evt.titleEnglish}</h3>
                        <h4 class="khmer-text">${evt.titleKhmer}</h4>
                        <div class="event-divider">
                            <span class="diamond">&#10022;</span>
                        </div>
                        <p class="time">${evt.time}</p>
                        <p class="location">${evt.location}</p>
                        <button class="btn btn-outline" style="border-radius: 2px; border-color: var(--gold-dim); color: var(--gold-light);">Get Directions / ផែនទី</button>
                    </div>
                </div>
            `;
        });
    }

    // --- 2. Music Player ---
    const bgMusic = document.getElementById('bg-music');
    // Reload audio to apply source change
    bgMusic.load();

    // Set starting time if configured
    bgMusic.addEventListener('loadedmetadata', () => {
        if (typeof WEDDING_CONFIG !== 'undefined' && WEDDING_CONFIG.theme.musicStartTime) {
            bgMusic.currentTime = WEDDING_CONFIG.theme.musicStartTime;
        }
    });

    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = musicToggle.querySelector('.icon');
    let isPlaying = false;

    bgMusic.volume = 0.5;

    function playMusic() {
        if (!isPlaying) {
            bgMusic.play().then(() => {
                isPlaying = true;
                musicIcon.textContent = '⏸️';
                musicToggle.classList.add('playing');
            }).catch(e => {
                console.log("Autoplay blocked by browser. Waiting for user interaction.");
            });
        }
    }

    function pauseMusic() {
        if (isPlaying) {
            bgMusic.pause();
            isPlaying = false;
            musicIcon.textContent = '🎵';
            musicToggle.classList.remove('playing');
        }
    }

    musicToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isPlaying) pauseMusic();
        else playMusic();
    });

    // Try autoplay immediately
    playMusic();

    // Fallback: Autoplay on very first interaction (click or scroll) anywhere on the page
    const startMusicOnInteraction = () => {
        playMusic();
        document.removeEventListener('click', startMusicOnInteraction);
        document.removeEventListener('scroll', startMusicOnInteraction);
        document.removeEventListener('touchstart', startMusicOnInteraction);
    };

    document.addEventListener('click', startMusicOnInteraction);
    document.addEventListener('scroll', startMusicOnInteraction);
    document.addEventListener('touchstart', startMusicOnInteraction);

    // --- 2.5 Golden Scroll Progress Ring ---
    const progressSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    progressSVG.setAttribute('class', 'scroll-ring');
    progressSVG.setAttribute('viewBox', '0 0 60 60');
    progressSVG.innerHTML = '<circle cx="30" cy="30" r="28" fill="none" stroke-width="2" stroke="#d4af37"></circle>';
    musicToggle.appendChild(progressSVG);

    const circle = progressSVG.querySelector('circle');
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;
    
    const ring1 = document.querySelector('.ring-1');
    const ring2 = document.querySelector('.ring-2');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollFraction = Math.min(Math.max(scrollTop / docHeight, 0), 1);
        const draw = circumference * scrollFraction;
        circle.style.strokeDashoffset = circumference - draw;

        // 3D Parallax Rings
        if (ring1 && ring2) {
            // Rotate the rings in 3D space based on scroll position
            ring1.style.transform = `rotateX(${75 + scrollTop * 0.08}deg) rotateY(${scrollTop * 0.12}deg) translateZ(${scrollTop * 0.05}px)`;
            ring2.style.transform = `rotateX(${75 - scrollTop * 0.08}deg) rotateY(${-scrollTop * 0.12}deg) translateZ(${-scrollTop * 0.05}px)`;
        }
    });

    // --- 3. Countdown Timer ---
    const weddingDate = new Date(WEDDING_CONFIG.weddingDate).getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            document.getElementById('days').textContent = "00";
            document.getElementById('hours').textContent = "00";
            document.getElementById('minutes').textContent = "00";
            document.getElementById('seconds').textContent = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    };

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // --- 4. RSVP Form Logic ---
    const plusOneSelect = document.getElementById('plus-one');
    const guestNameGroup = document.getElementById('guest-name-group');
    const attendanceSelect = document.getElementById('attendance');
    const plusOneGroup = document.getElementById('plus-one-group');

    attendanceSelect.addEventListener('change', (e) => {
        if (e.target.value === 'no') {
            plusOneGroup.classList.add('hidden');
            guestNameGroup.classList.add('hidden');
        } else {
            plusOneGroup.classList.remove('hidden');
            if (plusOneSelect.value === 'yes') {
                guestNameGroup.classList.remove('hidden');
            }
        }
    });

    plusOneSelect.addEventListener('change', (e) => {
        if (e.target.value === 'yes') {
            guestNameGroup.classList.remove('hidden');
            document.getElementById('guest-name').setAttribute('required', 'true');
        } else {
            guestNameGroup.classList.add('hidden');
            document.getElementById('guest-name').removeAttribute('required');
        }
    });

    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpSuccess = document.getElementById('rsvp-success');

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        rsvpForm.classList.add('hidden');
        rsvpSuccess.classList.remove('hidden');
    });

    // --- 5. Digital Guestbook Logic ---
    const guestbookForm = document.getElementById('guestbook-form');
    const wishesList = document.getElementById('wishes-list');

    // Add an initial dummy wish for demonstration
    const initialWish = document.createElement('div');
    initialWish.classList.add('wish-card');
    initialWish.setAttribute('data-aos', 'fade-up');
    initialWish.innerHTML = `
        <h4>Sokha & Family</h4>
        <p>Wishing you both a lifetime of happiness and love! Congratulations!</p>
        <span class="wish-date">Just now</span>
    `;
    wishesList.appendChild(initialWish);

    guestbookForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('wisher-name').value;
        const message = document.getElementById('wisher-message').value;

        // Create new wish card
        const wishCard = document.createElement('div');
        wishCard.classList.add('wish-card');
        // Add AOS attribute for the new element, though we need to manually add an animation class or refresh
        wishCard.style.animation = 'fadeIn 0.5s ease forwards';

        wishCard.innerHTML = `
            <h4>${escapeHTML(name)}</h4>
            <p>${escapeHTML(message).replace(/\n/g, '<br>')}</p>
            <span class="wish-date">Just now</span>
        `;

        // Prepend to list
        wishesList.insertBefore(wishCard, wishesList.firstChild);

        // Reset form
        guestbookForm.reset();
    });

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g,
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    // --- Mobile Drawer Navigation Logic ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
    const mobileNavClose = document.getElementById('mobile-nav-close');
    const mobileNavBackdrop = document.getElementById('mobile-nav-backdrop');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function openMobileNav() {
        if (!mobileNavDrawer) return;
        mobileNavDrawer.classList.add('active');
        if (mobileMenuToggle) mobileMenuToggle.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileNav() {
        if (!mobileNavDrawer) return;
        mobileNavDrawer.classList.remove('active');
        if (mobileMenuToggle) mobileMenuToggle.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            if (mobileNavDrawer && mobileNavDrawer.classList.contains('active')) closeMobileNav();
            else openMobileNav();
        });
    }

    if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);
    if (mobileNavBackdrop) mobileNavBackdrop.addEventListener('click', closeMobileNav);

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNavDrawer && mobileNavDrawer.classList.contains('active')) {
            closeMobileNav();
        }
    });

    // --- Magic Sparkle Cursor Trail ---
    const cursorContainer = document.createElement('div');
    cursorContainer.id = 'cursor-sparkles';
    cursorContainer.style.position = 'fixed';
    cursorContainer.style.top = '0';
    cursorContainer.style.left = '0';
    cursorContainer.style.width = '100vw';
    cursorContainer.style.height = '100vh';
    cursorContainer.style.pointerEvents = 'none';
    cursorContainer.style.zIndex = '9998';
    document.body.appendChild(cursorContainer);

    let lastSparkleTime = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastSparkleTime < 40) return; // limit sparkle generation rate
        lastSparkleTime = now;

        const sparkle = document.createElement('div');
        sparkle.className = 'magic-sparkle';
        sparkle.style.left = (e.clientX - 5) + 'px';
        sparkle.style.top = (e.clientY - 5) + 'px';
        
        // Randomize translation and scale
        const tx = (Math.random() - 0.5) * 40;
        const ty = (Math.random() - 0.5) * 40 + 20;
        sparkle.style.setProperty('--tx', `${tx}px`);
        sparkle.style.setProperty('--ty', `${ty}px`);
        
        cursorContainer.appendChild(sparkle);

        // Remove after animation completes (approx 800ms)
        setTimeout(() => sparkle.remove(), 800);
    });

    // --- Scroll Progress Bar ---
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        if (scrollProgress) {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollFraction = Math.min(Math.max(scrollTop / docHeight, 0), 1);
            scrollProgress.style.width = (scrollFraction * 100) + '%';
        }
    });

    // --- Magnetic Button Physics ---
    const magnetBtns = document.querySelectorAll('.btn');
    magnetBtns.forEach(btn => {
        btn.classList.add('magnetic');
        
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Move the button slightly towards the mouse (magnetic pull)
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            // Snap back to original position
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // --- Glass Spotlight Hover ---
    const glassCards = document.querySelectorAll('.glass, .gallery-item');
    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- Falling Gold Petals ---
    const petalsContainer = document.getElementById('falling-petals-container');
    if (petalsContainer) {
        function spawnPetal() {
            const petal = document.createElement('div');
            petal.className = 'petal';
            
            // Random horizontal start position
            petal.style.left = Math.random() * 100 + 'vw';
            
            // Random animation duration between 8s and 15s
            const duration = Math.random() * 7 + 8;
            petal.style.animationDuration = duration + 's';
            
            // Random slight delay
            petal.style.animationDelay = Math.random() * 2 + 's';
            
            petalsContainer.appendChild(petal);
            
            // Remove petal after animation completes
            setTimeout(() => {
                petal.remove();
            }, (duration + 2) * 1000);
        }
        
        // Spawn a new petal every 800ms
        setInterval(spawnPetal, 800);
        
        // Spawn some initial petals
        for(let i=0; i<10; i++) {
            setTimeout(spawnPetal, Math.random() * 2000);
        }
    }
});
