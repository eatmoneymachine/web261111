// posterUrl : 포스터 경로를 TMDB 이미지 주소로 변환
function posterUrl(path, size) {
    if (path.startsWith("http")) {
        return path;
    }

    return "https://image.tmdb.org/t/p/" + size + path;
}

// renderCards : 영화 배열을 읽어 보드에 카드 생성
function renderCards(list) {
    const board = document.querySelector(".board");

    board.innerHTML = "";

    for (const m of list) {
        const card = document.createElement("article");
        card.className = "card";

        if (m.rating >= 8) {
            card.classList.add("hot");
        }

        card.innerHTML = `
            <img class="poster" src="${posterUrl(m.poster, "w342")}" alt="${m.title} 포스터">
            <span class="badge">${m.rating}</span>
            <div class="info">
                <h2>${m.title}</h2>
                <p class="year">${m.year}</p>
            </div>`;

        board.appendChild(card);
    }

    document.getElementById("count").textContent = list.length + "편";
}

// sortBy : 지정한 키를 기준으로 정렬한 새 배열 반환
function sortBy(list, key, desc) {
    const copy = [...list];

    copy.sort((a, b) => {
        if (typeof a[key] === "string") {
            return a[key].localeCompare(b[key]);
        }

        return a[key] - b[key];
    });

    if (desc) {
        copy.reverse();
    }

    return copy;
}

// applySort : 선택 상자의 값에 따라 카드를 다시 그림
function applySort() {
    const key = document.getElementById("sort").value;
    renderCards(sortBy(movies, key, key !== "title"));
}

document.title = "내 영화 " + movies.length + "편";
applySort();
