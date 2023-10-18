// 상단 search 나오게 
window.addEventListener("scroll", function() {
    const hederSearch = document.querySelector(".headSearch");

    // 현재 내 스크롤 위치
    let scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (scrollPosition >= 100) {
        // 현재 내 스크롤 위치가 100 초과 시
        hederSearch.style.height = '120px';
    } else {
        // 현재 내 스크롤 위치가 100 미만 시
        hederSearch.style.height = '0';
    }
});