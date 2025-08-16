// 모바일 네비게이션 토글
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 네비게이션 링크 클릭 시 메뉴 닫기
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// 스크롤 시 네비게이션 스타일 변경
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer를 사용한 스크롤 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 애니메이션을 적용할 요소들
const animateElements = document.querySelectorAll('.feature-card, .timeline-item, .instructor-card');
animateElements.forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// 타이핑 효과 (히어로 섹션 코드 블록)
const codeBlock = document.querySelector('.code-block pre code');
if (codeBlock) {
    const originalText = codeBlock.innerHTML;
    let currentIndex = 0;
    
    function typeCode() {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = originalText;
        const textContent = tempDiv.textContent || tempDiv.innerText || '';
        
        if (currentIndex < textContent.length) {
            const currentChar = textContent[currentIndex];
            const partialHTML = originalText.substring(0, originalText.indexOf(textContent.substring(currentIndex)));
            
            codeBlock.innerHTML = originalText;
            currentIndex++;
            
            setTimeout(typeCode, 50);
        }
    }
    
    // 페이지 로드 후 타이핑 효과 시작
    setTimeout(() => {
        codeBlock.style.display = 'block';
    }, 500);
}

// 카운터 애니메이션 (통계 섹션)
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const isPercentage = element.textContent.includes('%');
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (isPercentage) {
            element.textContent = Math.floor(current) + '%';
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// 통계 섹션 관찰자
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/[^\d]/g, ''));
                animateCounter(stat, number);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const instructorStats = document.querySelector('.instructor-stats');
if (instructorStats) {
    statsObserver.observe(instructorStats);
}

// 페이지 로드 완료 시 애니메이션
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// 마우스 움직임에 따른 패럴렉스 효과 (히어로 섹션)
const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const codeBlock = document.querySelector('.code-block');
        if (codeBlock) {
            const translateX = (mouseX - 0.5) * 20;
            const translateY = (mouseY - 0.5) * 20;
            codeBlock.style.transform = `translate(${translateX}px, ${translateY}px)`;
        }
    });
}

// 폼 제출 추적 (Google Forms 링크 클릭)
document.querySelectorAll('a[href*="forms.gle"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('수강 신청 폼으로 이동');
        // 여기에 Google Analytics 이벤트 추적 코드를 추가할 수 있습니다
    });
});

// 현재 섹션 하이라이트 (네비게이션)
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// 초기 실행
highlightNavigation();

// 스크롤 다운 힌트
const scrollHint = document.createElement('div');
scrollHint.className = 'scroll-hint';
scrollHint.innerHTML = '↓';
scrollHint.style.cssText = `
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    font-size: 2rem;
    animation: bounce 2s infinite;
    cursor: pointer;
`;

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroSection.appendChild(scrollHint);
    
    scrollHint.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
        }
        40% {
            transform: translateX(-50%) translateY(-20px);
        }
        60% {
            transform: translateX(-50%) translateY(-10px);
        }
    }
    
    .nav-link.active {
        color: var(--primary-color);
        position: relative;
    }
    
    .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--gradient);
    }
`;
document.head.appendChild(style);