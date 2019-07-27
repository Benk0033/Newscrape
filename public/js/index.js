$(function () {

    $(".clear").on("click", function () {

        $.get("/clear").then(function (data) {
            // $(".article-container").empty();
            location.reload();
        })
    })

    // event listener on click on devour button
    $(".save").on("click", function () {
        // store data attribute into variable
        var id = $(this).data("_id")

        // route user input to put route to update database
        $.ajax("/api/saved/" + id, {
            type: "PUT",
            data: { saved: true }
        }).then(function () {
            console.log(id);
            // Reload the page to get the updated list
            location.reload();
        });

    });

});