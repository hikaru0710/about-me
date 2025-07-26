// CYCLING（サイクリング）ページのJavaScript

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

    // 続きを読むボタンの機能
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const blogItem = btn.closest('.blog-item');
            const blogDetail = blogItem.querySelector('.blog-detail');
            const isExpanded = blogDetail.classList.contains('expanded');
            
            // 他の記事を閉じる
            const allBlogItems = document.querySelectorAll('.blog-item');
            allBlogItems.forEach(item => {
                if (item !== blogItem) {
                    const otherDetail = item.querySelector('.blog-detail');
                    const otherBtn = item.querySelector('.read-more-btn');
                    otherDetail.classList.remove('expanded');
                    otherBtn.textContent = '続きを読む';
                    otherBtn.classList.remove('expanded');
                }
            });
            
            // クリックした記事の展開/折りたたみ
            if (isExpanded) {
                blogDetail.classList.remove('expanded');
                btn.textContent = '続きを読む';
                btn.classList.remove('expanded');
            } else {
                blogDetail.classList.add('expanded');
                btn.textContent = '閉じる';
                btn.classList.add('expanded');
                
                // スムーズにスクロール
                setTimeout(() => {
                    blogDetail.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }, 100);
            }
        });
    });

    // スクロールアニメーション（オプション）
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

    // 監視対象の要素を登録
    const animateElements = document.querySelectorAll('.blog-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});