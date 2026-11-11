
function average(list) {
    let sum = 0;

    for (const m of list) {
        sum += m.rating;
    }

    return sum / list.length;
}

function best(list) {
    let top = list[0];

    for (const m of list) {
        if (m.rating > top.rating) {
            top = m;
        }
    }

    return top;
}

function filterByRating(list, min) {
    return list.filter(m => m.rating >= min);
}

function sortByRating(list) {
    return [...list].sort((a, b) => b.rating - a.rating);
}

function yearsSince(dateStr) {
    return new Date().getFullYear() - new Date(dateStr).getFullYear();
}

function posterUrl(path, size) {
    if (path.startsWith("http")) {
        return path;
    }

    return "https://image.tmdb.org/t/p/" + size + path;
}


console.log("평균:", average(movies).toFixed(2));
console.log("최고:", best(movies).title);
console.log("8점 이상:", filterByRating(movies, 8).length + "편");

const sorted = sortByRating(movies);

console.log(
    "정렬 1위:",
    sorted[0].title,
    "/ 원본 1번:",
    movies[0].title
);

console.log(yearsSince(movies[0].date) + "년 전 개봉");
console.log(posterUrl(movies[0].poster, "w342"));


document.title = "내 영화 " + movies.length + "편";


console.table(
    sortByRating(movies).map(movie => ({
        title: movie.title,
        year: movie.year,
        date: movie.date,
        rating: movie.rating,
        poster: movie.poster
    }))
);
