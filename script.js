$(document).ready(function(){
    $(".icon").hide();
    $("#loading-container").hide();

    $("#search").click(function(){
        get_data($("#input").val());
        $("#front").hide();
        $("#loading-container").show();
    });

    $("#share").click(function(){
        $(this).siblings().slideToggle();
        if($(this).html() == "Share")
            $(this).html("Close");
        else
            $(this).html("Share");
    });

    $("#back-btn").click(function(){
        $("#content").hide();
        $("#input").val("");
        $("#front").show();
    });

    $("#favourite-btn").click(function(){
        $(this).attr("src", "heart-animated.gif");
        setTimeout(() => {$(this).attr("src", "heart-icon.png")}, 1000);
    })

    function get_data(title){
        $.ajax({
            url: "https://www.omdbapi.com/?apikey=5d7c67a7&t=" + title,
            dataType: "jsonp",
            success: function(data){
                $("#poster").attr("src", data.Poster);
                updateRating(data.imdbRating);
                $("#plot-content").html(data.Plot);
                $("#title-el").html(data.Title);
                $("#genre-el").html(data.Genre);
                $("#released-el").html(data.Released);
                $("#runtime-el").html(data.Runtime);
                $("#language-el").html(data.Language);
                $("#country-el").html(data.Country);
                $("#actors-el").html(data.Actors);
                $("#writer-el").html(data.Writer);
                $("#director-el").html(data.Director);
                $("#awards-el").html(data.Awards);

                $("#tbody-el").empty();

                for(let i = 0; i < data.Ratings.length; i++){
                    let row = document.getElementById("tbody-el").insertRow();
                    row.insertCell().innerHTML = data.Ratings[i].Source;
                    row.insertCell().innerHTML = data.Ratings[i].Value;
                    
                }
                $("tbody tr:even").css("background-color", "lightblue")

                $("#imdb-rat-el").html(data.imdbRating);
                $("#imdb-votes-el").html(data.imdbVotes);
                $("#metascore-el").html(data.Metascore);
                $("#prod-el").html(data.Production);
                $("#website-el").html(data.Website);

                $("#loading-container").hide();
                $("#content").show();
            }
        })
    }

    function updateRating(rating){
        $(".fa").removeClass("checked");
        $("#rating-el").html(rating);

        if(rating <= 2){
            $("#one").addClass("checked");
        }
        else if(rating <= 4){
            $("#one, #two").addClass("checked");
        }
        else if(rating <= 7){
            $("#one, #two, #three").addClass("checked");
        }
        else if(rating <= 8.5){
            $("#one, #two, #three, #four").addClass("checked");
        }
        else{
            $(".fa").addClass("checked");
        }
    }
});
