document.addEventListener('DOMContentLoaded', () => {

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


    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();


            filterButtons.forEach(btn => btn.classList.remove('active'));

            button.classList.add('active');


            const filterType = button.getAttribute('data-filter');
            filterNews(filterType);
        });
    });


    const newsItems = document.querySelectorAll('.news-item');
    newsItems.forEach(item => {
        const newsLink = item.querySelector('.news-link');
        const newsDetail = item.querySelector('.news-detail');
        const arrow = item.querySelector('.news-arrow');
        
        if (newsLink && arrow) {
            newsLink.addEventListener('click', (e) => {
                e.preventDefault();
                
                const isExpanded = item.classList.contains('expanded');


                newsItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('expanded');
                        const otherArrow = otherItem.querySelector('.news-arrow');
                        if (otherArrow) otherArrow.innerHTML = '›';
                    }
                });
                

                if (isExpanded) {
                    item.classList.remove('expanded');
                    arrow.innerHTML = '›';
                } else {
                    item.classList.add('expanded');
                    arrow.innerHTML = '‹';
                    

                    if (newsDetail) {
                        setTimeout(() => {
                            newsDetail.scrollIntoView({ 
                                behavior: 'smooth',
                                block: 'nearest'
                            });
                        }, 300);
                    }
                }
            });


            item.addEventListener('mouseenter', () => {
                arrow.style.transform = 'translateX(5px)';
                arrow.style.color = '#e74c3c';
            });

            item.addEventListener('mouseleave', () => {
                if (!item.classList.contains('expanded')) {
                    arrow.style.transform = 'translateX(0)';
                    arrow.style.color = '#999';
                }
            });
        }
    });


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


    const animateElements = document.querySelectorAll('.news-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });


    function filterNews(filterType) {
        const newsItems = document.querySelectorAll('.news-item');
        
        newsItems.forEach(item => {
            const category = item.querySelector('.news-category');
            
            if (filterType === 'all' || !filterType) {
 
                item.style.display = 'flex';
                item.style.animation = 'slideInUp 0.4s ease forwards';
            } else {

                const categoryClass = category ? category.classList[1] : '';
                
                if (categoryClass === filterType) {
                    item.style.display = 'flex';
                    item.style.animation = 'slideInUp 0.4s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            }
        });
    }


    document.addEventListener('keydown', (e) => {
        const focusedItem = document.querySelector('.news-item:focus-within');
        
        if (e.key === 'Enter' && focusedItem) {
            const newsLink = focusedItem.querySelector('.news-link');
            if (newsLink) {
                newsLink.click();
            }
        }
    });


    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
        link.setAttribute('target', '_blank');
    });


    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});


const NewsUtils = {

    formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    },

    getCategoryColor(category) {
        const colors = {
            'new': '#e74c3c',
            'update': '#3498db',
            'fix': '#f39c12',
            'info': '#27ae60'
        };
        return colors[category] || '#999';
    },


    smoothScrollTo(element, offset = 0) {
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
};


window.NewsUtils = NewsUtils;