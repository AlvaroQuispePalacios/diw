var client_id = "8be8bb5e49d24d39a5fcf7a52ff9d029";
var client_secret = "18555ef95e1d477da694d44f8af1d8f6";
var access_token = "";
var imgDefault = "https://i.pinimg.com/originals/d0/5c/77/d05c77c423324c5b06f09fae67869373.jpg";

function createCardArtist(artistId, artistName, artistPopularity, type, artistImg) {
    return `
    <article class="artist-card artistId")" data-id="${artistId}">
        <div class="artist-card-img">
            <img
                class="artist-img"
                src="${artistImg}"
                alt="Imagen del artista"
            />
            <div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="100%"
                    height="100%"
                >
                    <path
                        d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                    />
                </svg>
            </div>
        </div>
        <section class="artist-card-content">
            <h2 class="artist-card-title">${artistName}</h2>
            <p class="artist-card-type">${type}</p>
            <p class="artist-card-popularity">Popularidad ${artistPopularity}</p>
        </section>
    </article>
    `;
}

function createCardTrack(trackName, trackPopularity, type, trackImg) {
    return `
    <article class="artist-card">
        <div class="artist-card-img">
            <img
                class="artist-img"
                src="${trackImg}"
                alt="Imagen del artista"
            />
            <div>
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 384 512"
                width="100%"
                height="90%"
            >
                <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>
            </svg>
            </div>
        </div>
        <section class="artist-card-content">
            <h2 class="artist-card-title">${trackName}</h2>
            <p class="artist-card-type">${type}</p>
            <p class="artist-card-popularity">Popularidad ${trackPopularity}</p>
        </section>
    </article>
    `;
}

function createCardAlbum(albumName, type, albumReleaseDate, albumImg){
    return `
    <article class="artist-card">
        <div class="artist-card-img">
            <img
                class="artist-img"
                src="${albumImg}"
                alt="Imagen del artista"
            />
            <div>
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 384 512"
                width="100%"
                height="90%"
            >
                <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>
            </svg>
            </div>
        </div>
        <section class="artist-card-content">
            <h2 class="artist-card-title">${albumName}</h2>
            <p class="artist-card-type">${albumReleaseDate}</p>
            <p class="artist-card-type">${type}</p>
            

        </section>
    </article>
    `;
}

function capitalizarPrimeraLetra(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

//We create the Spotify class with the API to make the call to
function Spotify() {
    this.apiUrl = "https://api.spotify.com/";
}

//Search for information on an artist, adding the possibility of obtaining their albums.
Spotify.prototype.getArtist = function (artist) {
    $.ajax({
        type: "GET",
        url: this.apiUrl + "v1/search?type=artist,track&q=" + artist,
        headers: {
            Authorization: "Bearer " + access_token,
        },
    }).done(function (response) {
        // console.log(response);
        $("#results").html("");

        // Se crea la tarjeta del artista y si esta no poseé una imagen usaremos la que tenemos por defecto

        response.artists.items.forEach((item) => {
            if(item.images.length > 0){
                $("#results").append(
                    createCardArtist(item.id, item.name, item.popularity, capitalizarPrimeraLetra(item.type), item.images[0].url)
                );
            }
            else{
                $("#results").append(
                    createCardArtist(item.name, item.popularity, capitalizarPrimeraLetra(item.type), imgDefault)
                );
            }
        });

        response.tracks.items.forEach((item) => {
            if(item.album.images.length > 0){
                $("#results").append(
                    createCardTrack(item.name, item.popularity,capitalizarPrimeraLetra(item.type), item.album.images[0].url)
                );
            }else{
                $("#results").append(
                    createCardTrack(item.name, item.popularity,capitalizarPrimeraLetra(item.type), imgDefault)
                );
            }
        });
    });
};

//Search the albums of an artist, given the id of the artist
Spotify.prototype.getArtistById = function (artistId) {
    $.ajax({
        type: "GET",
        url: this.apiUrl + "v1/artists/" + artistId + "/albums",
        headers: {
            Authorization: "Bearer " + access_token,
        },
    }).done(function (response) {
        $("#results article").remove();
        response.items.forEach((item) => {
            $("#results").append(createCardAlbum(item.name, capitalizarPrimeraLetra(item.type), item.release_date, item.images[0].url));

        });
        console.log(response.href);
    });
};

//Buscar las canciones de un album
// Spotify.prototype.getArtistById = function (albumId) {
//     $.ajax({
//         type: "GET",
//         url: this.apiUrl + "v1/artist/albums" + albumId + "/albums",
//         headers: {
//             Authorization: "Bearer " + access_token,
//         },
//     }).done(function (response) {
//         console.log(response);
//     });
// };

//This fragment is the first thing that is loaded, when the $(document).ready
$(function () {
    $.ajax({
        type: "POST",
        url: "https://accounts.spotify.com/api/token",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Basic " + btoa(client_id + ":" + client_secret)
            );
        },
        dataType: "json",
        data: { grant_type: "client_credentials" },
    }).done(function (response) {
        access_token = response.access_token;
    });

    var spotify = new Spotify();

    $("#bgetArtist").on("click", function () {
        spotify.getArtist($("#artistName").val());
    });

    $("#results").on("click", ".artistId", function () {
        spotify.getArtistById($(this).attr("data-id"));
    });
});
