// 自転車ベル紹介ページのJavaScript

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

    // スクロールアニメーション
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // アニメーション対象の要素を監視
    const animateElements = document.querySelectorAll('.content-section, .bell-showcase, .specs-section, .rating-section');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // 画像のホバーエフェクト強化
    const bellImages = document.querySelectorAll('.bell-image img');
    bellImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.08)';
            img.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
            img.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        });
    });

    // 理由アイテムのクリックアニメーション
    const reasonItems = document.querySelectorAll('.reason-item');
    reasonItems.forEach(item => {
        item.addEventListener('click', () => {
            item.style.transform = 'translateX(10px) scale(1.02)';
            setTimeout(() => {
                item.style.transform = 'translateX(5px)';
            }, 200);
        });
    });

    // スター評価のアニメーション（ページ読み込み時）
    const ratingItems = document.querySelectorAll('.rating-item');
    ratingItems.forEach((item, index) => {
        setTimeout(() => {
            const stars = item.querySelectorAll('.star.filled');
            stars.forEach((star, starIndex) => {
                setTimeout(() => {
                    star.style.transform = 'scale(1.2)';
                    star.style.color = '#ffd700';
                    setTimeout(() => {
                        star.style.transform = 'scale(1)';
                    }, 200);
                }, starIndex * 100);
            });
        }, index * 500);
    });

    // 関連記事のホバーエフェクト
    const relatedArticles = document.querySelectorAll('.related-article');
    relatedArticles.forEach(article => {
        article.addEventListener('mouseenter', () => {
            const img = article.querySelector('.related-image img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });
        
        article.addEventListener('mouseleave', () => {
            const img = article.querySelector('.related-image img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // スムーズスクロール（セクション内リンク用）
    const smoothScrollToSection = (targetId) => {
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // 総合評価の数値アニメーション
    const overallScore = document.querySelector('.overall-score');
    if (overallScore) {
        const targetScore = parseFloat(overallScore.textContent);
        let currentScore = 0;
        const increment = targetScore / 30;
        
        const scoreAnimation = setInterval(() => {
            currentScore += increment;
            if (currentScore >= targetScore) {
                currentScore = targetScore;
                clearInterval(scoreAnimation);
            }
            overallScore.textContent = currentScore.toFixed(1);
        }, 50);
    }
});