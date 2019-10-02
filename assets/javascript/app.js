//Starting variable(s)
let tvShows = ["Game of Thrones", "Entourage", "It's Always Sunny In Philadelphia", "Parks and Recreation", "The Office", "Breaking Bad", "Westworld"]
const baseURL = "https://api.giphy.com/v1/gifs/search?q="
const apiKey = "aXG0hvq0vUg7to2ZRwUTY7G3bUyPktOd"
const limit = "&limit=10"

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

        for (var i=0; i < tvShows.length; i++) {

        let results = response.data;
        let rating = results[i].rating;
        let image = results[i].images.fixed_height.url

        $("#gifContainer").prepend(`
        <div>
        <p>Rating: ${rating}</p>
        <img src="${image}" class="border solid 4px light"></img>
        </div>
        `)
    }
    
    })

})




