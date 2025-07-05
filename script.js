document.addEventListener('DOMContentLoaded', () => {
	
    // --- LÓGICA DO RASTRO DO MOUSE (CURSOR TRAIL) ---
    const trailCount = 15; // Quantidade de "caveiras" no rastro
    const trails = [];

    for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        document.body.appendChild(trail);
        trails.push(trail);
    }

    let mouseX = -100;
    let mouseY = -100;
    const trailPositionsX = new Array(trailCount).fill(mouseX);
    const trailPositionsY = new Array(trailCount).fill(mouseY);

    document.addEventListener('mousemove', e => {
        mouseX = e.pageX;
        mouseY = e.pageY;
    });

    function animateTrail() {
        // O primeiro elemento do rastro segue o mouse
        trailPositionsX.unshift(mouseX);
        trailPositionsY.unshift(mouseY);
        trailPositionsX.pop();
        trailPositionsY.pop();

        for (let i = 0; i < trails.length; i++) {
            const trail = trails[i];
            trail.style.transform = `translate(${trailPositionsX[i]}px, ${trailPositionsY[i]}px)`;
            trail.style.opacity = 1 - (i / trails.length);
        }
        
        requestAnimationFrame(animateTrail);
    }
    animateTrail();


    // --- LÓGICA DO AVISO DE ÁUDIO ---
    const audioOverlay = document.getElementById('audio-prompt-overlay');
    const musicPlayer = document.getElementById('background-music-player');

    function startExperience() {
        audioOverlay.classList.add('hidden');
        musicPlayer.play().catch(e => console.log("A reprodução automática foi bloqueada, mas a interação do usuário deveria permitir."));
        document.body.removeEventListener('click', startExperience);
    }
    document.body.addEventListener('click', startExperience, { once: true });
    
    function setupSerenataEnigma() {
        const targetSequence = 'SERENATA';
        let currentIndex = 0;

        const elements = {
            glitch: document.getElementById('glitch-overlay'),
            normal: document.getElementById('normal-content'),
            nightmare: document.getElementById('nightmare-content'),
            siteAudioPlayer: document.getElementById('persistent-audio-player'),
            nightmareAudio: document.getElementById('nightmare-audio'),
            cipherText: document.getElementById('cipher-text'),
            nightmareVideo: document.getElementById('nightmare-video')
        };
        
        // Verifica se todos os elementos essenciais existem
        for (let key in elements) {
            if (!elements[key]) {
                console.error(`ERRO CRÍTICO: Elemento "${key}" não encontrado no HTML.`);
                return;
            }
        }

        const keydownHandler = (event) => {
            if (event.key.toUpperCase() !== targetSequence[currentIndex]) {
                currentIndex = 0; // Errou a tecla, reinicia
                return;
            }

            // Acertou a tecla
            elements.glitch.classList.remove('hidden');
            setTimeout(() => elements.glitch.classList.add('hidden'), 75);
            currentIndex++;

            // Se a sequência está completa, inicia a transformação
            if (currentIndex === targetSequence.length) {
                document.removeEventListener('keydown', keydownHandler); // Desativa o gatilho
                transformPage();
            }
        };

        const transformPage = () => {
            // 1. Esconde a página normal e para a música do site
            elements.normal.style.display = 'none';
            const siteMusic = elements.siteAudioPlayer.querySelector('audio');
            if (siteMusic) siteMusic.pause();
            elements.siteAudioPlayer.style.display = 'none';

            // 2. Mostra o modo pesadelo e toca a nova música
            elements.nightmare.classList.remove('hidden');
            elements.nightmareAudio.play().catch(e => console.error("Falha ao tocar áudio do metrônomo."));
            
            // 3. Muda o título da aba
            document.title = "PRODITORIA";

            // 4. Inicia o efeito de digitação
            const fullText = "QOPNYCDUWUCIHTDVFFJSGPFZPZPKWJXBJGZMGRKIGXGIZMHJEPUQTZDDPWGXWJEZYCDCETWFGRLJRKWJOXTXEMRUWJVBPHWVYVVDUBJJDOUFWIWLKJYYHJLTCLBFWXDELPUQTHLNWRVXXXEZCVHEIJCKITLADTSTOPJWODQRDWGOPXRVYRSECOINEPURLJCSDEOJFVSHUXHXTIDVUDCXVTCVQFETWSTWDJXDJTSRXJXYHREDTMTWGZUJGHGNJJCZVJWVWFGRPPFREXPEDHLIWRWHVXSTCXRDGWKKDJLKUFPXOXETCODJWPDOXWLHDJUJKAPIZXRDGIQJFZPZVTGAJBGJDKRZKHQLHUFMRJGJUXGFZZQKGPTLCTXZTLWHCYTX";
            typewriterEffect(elements.cipherText, fullText, () => {
                // Função de callback: executada APÓS o texto ser totalmente escrito
                setTimeout(() => {
                    // 5. Após alguns segundos, para a música e troca o texto pelo vídeo
                    elements.cipherText.style.display = 'none';
                    elements.nightmareAudio.pause();
                    elements.nightmareVideo.classList.remove('hidden');
                    elements.nightmareVideo.play().catch(e => console.error("Falha ao tocar vídeo do karaoke."));
                }, 4000); // 4 segundos de espera
            });
        };

        document.addEventListener('keydown', keydownHandler);
    }

    function typewriterEffect(element, text, callback) {
        let i = 0;
        element.innerHTML = ""; // Limpa o elemento
        const interval = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
                if (callback) callback(); // Chama a função de callback
            }
        }, 35); // Velocidade da digitação (em milissegundos)
    }
	
    // --- FUNÇÕES GLOBAIS ---
    updateVisitorCount();
    setupPersistentAudio();
    handleCarousel(); 

    // --- ROTEADOR PRINCIPAL ---
    const bodyId = document.body.id;

   const juizButton = document.getElementById('juiz-verify-button');
    if (juizButton) {
        const juizInput = document.getElementById('juiz-password-input');
        const juizError = document.getElementById('juiz-error-message');

        juizButton.addEventListener('click', () => {
            if (juizInput.value.trim().toUpperCase() === 'NOTEURASTROOUTROSVIRAO') {
                alert('ACESSO CONCEDIDO...');
                const link = document.createElement('a');
                link.href = 'judex_ocissus.zip';
                link.click();
            } else {
                juizError.classList.remove('hidden');
            }
        });
    }

    
    // --- LÓGICA PARA A PÁGINA DO PINTOR ---
 const maletaButton = document.getElementById('maleta-verify-button');
    if (maletaButton) {
        const maletaInput = document.getElementById('maleta-password-input');
        const maletaError = document.getElementById('maleta-error-message');

        maletaButton.addEventListener('click', () => {
            if (maletaInput.value.trim().toUpperCase() === 'DEFACE') {
                alert('Maleta destrancada...');
                const link = document.createElement('a');
                link.href = 'spilsbury.rar';
                link.click();
            } else {
                maletaError.classList.remove('hidden');
            }
        });
    }

    const carouselButton = document.getElementById('carousel-verify-button');
    if (carouselButton) {
        const carouselInput = document.getElementById('carousel-password-input');
        const carouselError = document.getElementById('carousel-error-message');
        const carouselWrapper = document.getElementById('carousel-wrapper');

        carouselButton.addEventListener('click', () => {
            if (carouselInput.value.trim().toUpperCase() === 'INFERNO') {
                alert('Palavra-chave aceita...');
                if (carouselWrapper) carouselWrapper.classList.remove('hidden');
            } else {
                carouselError.classList.remove('hidden');
            }
        });
    }


    // --- LÓGICA PARA A PÁGINA DA SOPRANO ---
    else if (bodyId === 'page-queen-of-hearts') {
        setupSerenataEnigma(); // Esta função não envolve botões de formulário
    }
	
    // --- LÓGICA PARA A PÁGINA DE CASOS ---
    else if (bodyId === 'page-cases') {
        setupCasesPage();
    }
        
    // Função genérica para enigmas simples de senha e download
    function setupSimplePasswordEnigma(password, fileToDownload, idPrefix = '') {
        const input = document.getElementById(idPrefix ? `${idPrefix}-password-input` : 'password-input');
        const button = document.getElementById(idPrefix ? `${idPrefix}-verify-button` : 'verify-button');
        const error = document.getElementById(idPrefix ? `${idPrefix}-error-message` : 'error-message');
        
        if (!input || !button) return;

        const check = (event) => {
            event.preventDefault(); // <-- A CORREÇÃO CRUCIAL!
            if (input.value.trim().toUpperCase().replace(/\s+/g, '') === password) {
                alert('ACESSO CONCEDIDO. INICIANDO DOWNLOAD...');
                const tempLink = document.createElement('a');
                tempLink.href = fileToDownload;
                tempLink.style.display = 'none';
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);
            } else {
                if (error) error.classList.remove('hidden');
            }
        };
        button.addEventListener('click', check);
        input.addEventListener('keypress', (e) => { if (e.key === 'Enter') check(e); });
    }

    // Função para o enigma que revela o carrossel
    function setupCarouselRevealEnigma(password) {
        const input = document.getElementById('carousel-password-input');
        const button = document.getElementById('carousel-verify-button');
        const error = document.getElementById('error-message-2');
        const wrapper = document.getElementById('carousel-wrapper');
        if (!input || !button || !wrapper) return;

        const check = (event) => {
            event.preventDefault(); // <-- A CORREÇÃO CRUCIAL!
            if (input.value.trim().toUpperCase() === password) {
                alert('Palavra-chave aceita. A obra está se revelando...');
                wrapper.classList.remove('hidden');
                const firstVideo = wrapper.querySelector('.carousel-track video');
                if (firstVideo) tryToPlayVideo(firstVideo);
            } else {
                if (error) error.classList.remove('hidden');
            }
        };
        button.addEventListener('click', check);
        input.addEventListener('keypress', (e) => { if (e.key === 'Enter') check(e); });
    }
	
	    // Função para tentar tocar o vídeo e lidar com falhas
    function tryToPlayVideo(video) {
        const overlay = video.parentElement.querySelector('.video-overlay');
        const playPromise = video.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Autoplay funcionou! Esconde o botão de play.
                if (overlay) overlay.classList.add('hidden');
            }).catch(error => {
                // Autoplay falhou. Mostra o botão de play.
                console.error("Autoplay bloqueado:", error);
                if (overlay) overlay.classList.remove('hidden');
            });
        }
    }

    // Função que controla a lógica do carrossel
    function handleCarousel() {
        const track = document.querySelector('.carousel-track');
        if (!track) return;

        const slides = Array.from(track.children);
        const nextButton = document.querySelector('#nextButton');
        const prevButton = document.querySelector('#prevButton');
        const dotsNav = document.querySelector('.carousel-nav');
        const dots = Array.from(dotsNav.children);

        if (slides.length === 0) return;
        const slideWidth = slides[0].getBoundingClientRect().width;
        
        slides.forEach((slide, index) => { slide.style.left = slideWidth * index + 'px'; });

        const moveTo = (targetSlide) => {
            if (!targetSlide) return;
            const currentSlide = track.querySelector('.current-slide');
            track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
            currentSlide.classList.remove('current-slide');
            targetSlide.classList.add('current-slide');
            handleVideoPlayback(targetSlide);
            updateDots(targetSlide);
        };

        const updateDots = (targetSlide) => {
            const targetIndex = slides.findIndex(slide => slide === targetSlide);
            const currentDot = dotsNav.querySelector('.current-slide');
            const targetDot = dots[targetIndex];
            if (currentDot) currentDot.classList.remove('current-slide');
            if (targetDot) targetDot.classList.add('current-slide');
        };

        const handleVideoPlayback = (targetSlide) => {
            slides.forEach(slide => { const video = slide.querySelector('video'); if (video) video.pause(); });
            const targetVideo = targetSlide.querySelector('video');
            if (targetVideo) targetVideo.play();
        };

        nextButton.addEventListener('click', () => moveTo(track.querySelector('.current-slide').nextElementSibling));
        prevButton.addEventListener('click', () => moveTo(track.querySelector('.current-slide').previousElementSibling));
        dotsNav.addEventListener('click', e => {
            const targetDot = e.target.closest('button.carousel-indicator');
            if (!targetDot) return;
            const targetIndex = dots.findIndex(dot => dot === targetDot);
            moveTo(slides[targetIndex]);
        });
    }
	
	 // Função específica e inteligente para a página de Casos Arquivados
    function setupCasesPage() {
        const modal = document.getElementById('password-modal-cases');
        const modalTitle = document.getElementById('modal-case-title');
        const modalInput = document.getElementById('cases-password-input');
        const modalButton = document.getElementById('cases-verify-button');
        const modalError = document.getElementById('cases-error-message');
        const modalCloseBtn = document.getElementById('cases-modal-close-btn');
        const grid = document.querySelector('.case-files-grid');

        if (!grid || !modal) return;

        let currentCase = null;

        const caseData = {
            'jack': { password: 'DEFACE', page: 'jack_of_clubs.html', name: 'O Caso do Artista Gael' },
            'noiva': { password: 'RUBRICA', page: 'queen_of_hearts.html', name: 'O Caso da Noiva Fantasma' },
            'banqueiro': { password: 'CASO', page: 'king_of_diamonds.html', name: 'O Caso do Banqueiro Avarento' }
        };

        // Função que transforma o DIV selado em um LINK funcional
        const unlockCase = (caseId) => {
            const caseDiv = document.querySelector(`.case-file[data-case-id="${caseId}"]`);
            if (!caseDiv || !caseDiv.classList.contains('sealed')) return; // Já está desbloqueado

            // Cria um novo elemento de link <a>
            const link = document.createElement('a');
            link.href = caseData[caseId].page;
            link.className = 'case-file'; // Mantém o estilo
            link.innerHTML = caseDiv.innerHTML; // Copia o conteúdo interno

            // Atualiza o status visual
            const status = link.querySelector('.file-status');
            status.textContent = 'ARQUIVO ABERTO';
            status.classList.remove('status-sealed');
            status.classList.add('status-open');
            
            // Substitui o DIV pelo novo LINK na página
            caseDiv.replaceWith(link);

            // Salva o progresso no navegador do jogador!
            localStorage.setItem(`unlocked_${caseId}`, 'true');
        };

        // Ao carregar a página, verifica quais casos já foram desbloqueados
        Object.keys(caseData).forEach(caseId => {
            if (localStorage.getItem(`unlocked_${caseId}`) === 'true') {
                unlockCase(caseId);
            }
        });
        
        // Abre o modal quando um caso selado é clicado
        grid.addEventListener('click', (e) => {
            const targetCaseDiv = e.target.closest('.case-file.sealed');
            if (targetCaseDiv) {
                currentCase = targetCaseDiv.dataset.caseId;
                modalTitle.textContent = caseData[currentCase].name;
                modal.classList.remove('hidden');
                modalInput.focus();
            }
        });

        // Verifica a senha no modal
        modalButton.addEventListener('click', () => {
            if (!currentCase) return;
            const userInput = modalInput.value.trim().toUpperCase().replace(/\s+/g, '');
            if (userInput === caseData[currentCase].password) {
                modal.classList.add('hidden');
                unlockCase(currentCase);
            } else {
                modalError.classList.remove('hidden');
            }
        });
        
        // Fecha o modal
        modalCloseBtn.addEventListener('click', () => modal.classList.add('hidden'));
    }

    // Função do contador de visitas
    function updateVisitorCount() {
        const el = document.getElementById('visitor-number');
        if (!el) return;
        let count = localStorage.getItem('laplaceVisitorCount') || 48150;
        count = parseInt(count) + 1;
        localStorage.setItem('laplaceVisitorCount', count);
        el.textContent = count.toString().padStart(6, '0');
    }
    

      function setupPersistentAudio() {
        const audioPlayer = document.getElementById('background-music-player');
        if (!audioPlayer) return;

        // Ao carregar a página, verifica se a música já estava tocando
        const lastTime = localStorage.getItem('musicPlaybackTime');
        const wasPlaying = localStorage.getItem('musicIsPlaying') === 'true';

        if (wasPlaying && lastTime) {
            audioPlayer.currentTime = parseFloat(lastTime);
            audioPlayer.play().catch(e => console.log("Usuário precisa interagir para o som tocar."));
        }
        
        // Adiciona os controles do player
        audioPlayer.setAttribute('controls', 'true');

        // Salva o estado "tocando"
        audioPlayer.addEventListener('play', () => {
            localStorage.setItem('musicIsPlaying', 'true');
        });

        // Salva o estado "pausado"
        audioPlayer.addEventListener('pause', () => {
            localStorage.setItem('musicIsPlaying', 'false');
        });

        // Atualiza a posição da música enquanto ela toca
        audioPlayer.addEventListener('timeupdate', () => {
            localStorage.setItem('musicPlaybackTime', audioPlayer.currentTime);
        });
    }
});