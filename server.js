const express = require("express");
const axios = require("axios");
const { request } = require("http");
const { response } = require("express");

const app = express();


app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (request, response) => {
    let url = 'https://api.themoviedb.org/3/movie/550?api_key=d6786e3599ab20d71b44ad7c375c6d25';
    axios.get(url)
    .then(response => {
        let data = response.data;
        let releaseDate = new Date(data.release_date).getFullYear();
        let genresToDisplay = "";
        data.genres.forEach(genre => {
            genresToDisplay = genresToDisplay + `${genre.name},`;
            
        });
        console.log(genresToDisplay)
        let genresUpdated = genresToDisplay.slice(0, -2) + ".";

        let posterUrl = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}`;
        moviePoster.src = posterUrl;
        moviePoster.alt = `${data.title} poster`;

        let curentYear = new Date().getFullYear();

        response.render("index", {
            dataToRender: data,
            year: currentYear,
            releaseYear: releaseDate,
            genres: genresUpdated,
            poster: posterUrl
        });
    });
       
});

app.listen(process.emv.PORT || 3000, () => {
console.log("Server is running on port 3000.");
});
