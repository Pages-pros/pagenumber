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
        if (btn.style.position !== 'fixed') {
            btn.style.position = 'fixed';
        }
        
        const padding = 20;
        const btnRect = btn.getBoundingClientRect();
        
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
