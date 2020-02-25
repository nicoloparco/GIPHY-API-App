//Starting variable(s)
let tvShows = ["Game of Thrones", "Entourage", "It's Always Sunny In Philadelphia", "Parks and Recreation", "The Office", "Breaking Bad", "Westworld"]
const baseURL = "https://api.giphy.com/v1/gifs/search?q="
const apiKey = "aXG0hvq0vUg7to2ZRwUTY7G3bUyPktOd"
const limit = "&limit=10"
let favorites = [];

//Function to load values from local storage
function loadLocalStorage() {
    
    let buttons = localStorage.getItem("buttons")
    $("#gifButtons").html(buttons)
    

}


//Function to create buttons from array of tv shows
function renderButtons () {

    $("#gifButtons").empty()

    for (var i =0; i < tvShows.length; i++) {

    const showName = tvShows[i]
    const button = `
    <div id="buttonWrap">
    <button class="btn btn-outline-primary text-light btn-names mx-3 my-2 showButtons" data-name="${showName}">${showName}</button>
    `
    $("#gifButtons").append(button)
    
    
};



};

loadLocalStorage();
renderButtons();


//On-click event to create new buttons using the searchbar
$("#searchButton").on("click", function(event) {
    event.preventDefault();

    let newShow = $("#searchBar").val().trim();
    tvShows.push(newShow);
    localStorage.setItem("buttons", tvShows)

    renderButtons() 
});

//Button triggered AJAX 
$(document).on("click", ".showButtons", function (event) {

    event.preventDefault();
    let show = $(this).attr("data-name")
    const queryURL = baseURL + show + "&api_key=" + apiKey + limit

    $.ajax({
        url:queryURL,
        method: "GET"
    }).then(function (response) {

        for (var i=0; i < 10; i++) {
    
        let results = response.data;
        let id = results.id;
        let rating = results[i].rating;
        let url = results[i].url;
        let imageMoving = results[i].images.fixed_height.url
        
        const favoriteIndex = favorites.indexOf(id);
        const isFavorite = favoriteIndex !== -1 ? "fas" : "far";

        $("#gifContainer").prepend(`
        <div class="card my-3 bg-dark shadow-lg col-3" id=${id}>
        <img src="${imageMoving}" class="border solid 4px light gif rounded" data-status="moving"></img>
        <p>Rating: ${rating}</p>
        <a href=${url} style="text-decoration: none">Giphy.com Link</a>
        <i class="${isFavorite} fa-heart my-3 favorite" data-favorite="${isFavorite}"></i>
        </div>
        `)

        //Function to stop gif from playing on click
        $(".gif").on("click", function (event) {
   
        	var src = $(this).attr("src");
      if($(this).hasClass('playing')){
         //stop
         $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
         $(this).removeClass('playing');
      } else {
        //play
        $(this).addClass('playing');
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
      }
    })
    }
})
})

//Favorite function
function handleFavorite() {
    const favoriteState = $(this).attr("data-favorite")
    const id = $(this).attr("data-id")

    if(favoriteState === "far"){
        favorites.push(id);
        localStorage.setItem("favorites", JSON.stringify(favorites))
        $(this).removeClass("far").addClass("fas");
        $(this).attr("data-favorite", "fas");
    } else {
        favorites = favorites.filter((el) => el != id);
        $(this).removeClass("fas").addClass("far");
        $(this).attr("data-favorite", "far");
    }
}
$(document).on("click", ".favorite", handleFavorite)





