// Configuração da API do YouTube
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('ytplayer', {
        height: '80',
        width: '100%',
        videoId: 'rtOvBOTyX00', // A Thousand Years
        playerVars: {
            'autoplay': 1,
            'list': 'RDrtOvBOTyX00', // Playlist
            'controls': 1
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    // Tenta tocar automaticamente (navegadores podem bloquear)
    event.target.playVideo();
    
    // Força tocar assim que ela interagir com a tela (tocar em qualquer lugar ou no botão fujão)
    const playOnInteraction = () => {
        if (player && typeof player.playVideo === 'function') {
            player.playVideo();
        }
        document.body.removeEventListener('click', playOnInteraction);
        document.body.removeEventListener('touchstart', playOnInteraction);
    };
    
    document.body.addEventListener('click', playOnInteraction);
    document.body.addEventListener('touchstart', playOnInteraction);
}

document.addEventListener('DOMContentLoaded', () => {
    const btnYes1 = document.getElementById('btnYes1');
    const btnNo1 = document.getElementById('btnNo1');
    const btnYes2 = document.getElementById('btnYes2');
    const btnNo2 = document.getElementById('btnNo2');
    
    const screen1 = document.getElementById('screen1');
    const screen2 = document.getElementById('screen2');
    const screen3 = document.getElementById('screen3');
    const screen4 = document.getElementById('screen4');

    const optionCards = document.querySelectorAll('.option-card');
    const selectedLocationText = document.getElementById('selected-location');

    function runaway(btn) {
        // Se o botão ainda não estiver no body, movemos ele pra lá.
        // Isso impede que ele bugue ou suma devido às caixas de fundo e rolagem.
        if (btn.parentElement !== document.body) {
            const rect = btn.getBoundingClientRect();
            btn.style.position = 'fixed';
            btn.style.left = rect.left + 'px';
            btn.style.top = rect.top + 'px';
            btn.style.zIndex = '9999'; // Fica sempre por cima de tudo
            document.body.appendChild(btn);
        }
        
        const padding = 20;
        const btnRect = btn.getBoundingClientRect();
        
        // Calcula o limite máximo usando o tamanho real da janela (evita sumir)
        const maxX = window.innerWidth - btnRect.width - padding;
        const maxY = window.innerHeight - btnRect.height - padding;
        
        const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
        const randomY = Math.max(padding, Math.floor(Math.random() * maxY));
        
        btn.style.left = randomX + 'px';
        btn.style.top = randomY + 'px';
    }

    ['mouseover', 'touchstart', 'click'].forEach(evt => {
        btnNo1.addEventListener(evt, (e) => {
            e.preventDefault(); 
            runaway(btnNo1);
        });
        btnNo2.addEventListener(evt, (e) => {
            e.preventDefault();
            runaway(btnNo2);
        });
    });

    btnYes1.addEventListener('click', () => {
        screen1.classList.remove('active');
        screen2.classList.add('active');
        startHearts();
        
        // Garante que a música toque se ela clicar em "Sim" de primeira
        if (player && typeof player.playVideo === 'function') {
            player.playVideo();
        }
    });

    btnYes2.addEventListener('click', () => {
        screen2.classList.remove('active');
        screen3.classList.add('active');
    });

    optionCards.forEach(card => {
        card.addEventListener('click', () => {
            const bg = card.getAttribute('data-bg');
            const name = card.getAttribute('data-name');
            
            screen4.style.backgroundImage = `url('${bg}')`;
            selectedLocationText.innerText = name;
            
            screen3.classList.remove('active');
            screen4.classList.add('active');
        });
    });

    function startHearts() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤️';
            
            heart.style.left = Math.random() * 100 + 'vw';
            
            const size = Math.random() * 20 + 15; 
            heart.style.fontSize = size + 'px';
            
            const duration = Math.random() * 3 + 2; 
            heart.style.animationDuration = duration + 's';
            
            document.getElementById('hearts').appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, duration * 1000);
        }, 300);
    }
});
