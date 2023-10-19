const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MGI2YTY4OWQ1NTMwNTAyYmQ3MmVlNjY4NWJlMDUzOCIsInN1YiI6IjY0ZmUzOGZjYzNiZmZlMDEwMTI5NDAwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WxRRqtG5TE7NPS7X8Pfn100g3ozzHAiLzN_WB8g1HS4'
    }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
.then(res => res.json())
.then(res => {
    const result = res.results;
    const cardListWrap = document.getElementById('m_list_wrap');
    
    // 영화 데이터 불러와서 카드형태로 뿌리기
    result.forEach(el => {
        // console.log(el);
        const post_image = el.poster_path;
        const title = el.title;
        const dataId = el.id;
        
        const listItem = document.createElement('li'); // li 추가
        listItem.classList.add('m_list'); // li에 m_list 클래스 추가
        listItem.setAttribute('data-id', dataId);
        let temp_html = `
        <div class="img_wrap">
            <img src="https://image.tmdb.org/t/p/w500${post_image}" alt="post_img">
        </div>
        <p class="movie_title">${title}</p>
        `;
        listItem.innerHTML = temp_html; // 추가한 li.m_list에 내용 넣기;
        
        cardListWrap.appendChild(listItem);

    });
    
    // 해당 포스터 클릭 했을 때, 팝업창 데이터에 맞춰서 뜨기
    const cardList = document.querySelectorAll('.m_list'); // 카드리스트
    const popDimm = document.querySelector('.dimm'); // 팝업 배경
    const popup = document.querySelector('.popup_cont_wrap'); // 팝업 데이터 넣기
    const popOpen = document.querySelector('#popOpen'); // 팝업 열기
    const closeBtn = document.querySelector('.closeBtn'); // 팝업 close버튼
    let popupOpen = (title, image, summaryCont, rating) => {
        const popup_html = `
            <div class="pop_cont">
                <h2>${title}</h2>
                <div class="pop_img_wrap">
                    <img src="https://image.tmdb.org/t/p/w500${image}" alt="movie_img">
                </div>
                <p class="summaryCont">
                    ${summaryCont}
                </p>
                <p class="rating">movie rating : ${rating}</p>
            </div>
        `
        return popup_html;
    }
    cardList.forEach(list => {
        list.addEventListener("click", function(e) {
            const id = parseInt(this.getAttribute('data-id'));
            // console.log(id);
            const clickDom = (result.filter((item)=> {
                return id === item.id;
            }))[0];
            // console.log(clickDom.vote_average);
            popup.innerHTML = popupOpen(clickDom.title, clickDom.backdrop_path, clickDom.overview, clickDom.vote_average);
            popDimm.classList.add('_on');
            popOpen.classList.add('_on');
        });
    });
    
    // 팝업 닫기
    popDimm.addEventListener('click',()=>{
        popDimm.classList.remove('_on');
        popOpen.classList.remove('_on');
    });
    // 팝업 닫기 버튼
    closeBtn.addEventListener('click',()=>{
        popDimm.classList.remove('_on');
        popOpen.classList.remove('_on');
    });


})
.catch(err => console.error(err));



// 상단 search 나오게 
window.addEventListener("scroll", function() {
    const hederSearch = document.querySelector(".headSearch");

    // 현재 내 스크롤 위치
    let scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (scrollPosition >= 100) {
        // 현재 내 스크롤 위치가 100 초과 시
        hederSearch.style.opacity = '0.9';
    } else {
        // 현재 내 스크롤 위치가 100 미만 시
        hederSearch.style.opacity = '0';
    }
});

