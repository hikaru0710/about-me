// PROFILE（自己紹介）ページのJavaScript

document.addEventListener('DOMContentLoaded', () => {
    // ハンバーガーメニュー機能
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // スキルバーのアニメーション
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
            }
        });
    }, observerOptions);

    // スキルセクションを監視
    const skillsSection = document.querySelector('.skills-grid');
    if (skillsSection) {
        skillObserver.observe(skillsSection.closest('.profile-section'));
    }

    // セクションのスクロールアニメーション
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 全セクションを監視
    const sections = document.querySelectorAll('.profile-section');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 趣味カードのホバーエフェクト強化
    const interestItems = document.querySelectorAll('.interest-item');
    interestItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(-5px) scale(1)';
        });
    });

    // 目標アイテムのクリックで詳細表示（オプション）
    const goalItems = document.querySelectorAll('.goal-item');
    goalItems.forEach(item => {
        item.addEventListener('click', () => {
            item.style.background = item.style.background === 'rgb(236, 240, 241)' ? '#f8f9fa' : '#ecf0f1';
            setTimeout(() => {
                item.style.background = '#f8f9fa';
            }, 200);
        });
    });
});