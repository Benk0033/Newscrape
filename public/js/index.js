$(function () {

    // clears all articles on index page and deletes them from the db
    $(".clear").on("click", function () {

        $.ajax({
            method: "DELETE",
            url: "/clear"
        }).then(function () {
            // Reload the page to get the updated list
            location.reload();
        });
    });

    // clears all articles from the saved page and deletes them from the db
    $(".clear-saved").on("click", function () {

        $.ajax({
            method: "DELETE",
            url: "/saved/clearSaved"
        }).then(function () {
            // Reload the page to get the updated list
            location.reload();
        });
    });

    // event listener for click on save button to save article and sets saved = true
    $(".save").on("click", function () {
        // store data attribute into variable
        var articleToSave = $(this).parents(".card").data();

        articleToSave.saved = true

        // route user input to put route to update database
        $.ajax({
            method: "PUT",
            url: "/api/saved/" + articleToSave._id,
            data: articleToSave
        }).then(function () {
            console.log(articleToSave);
            // Reload the page to get the updated list
            location.reload();
        });

    });

    // event listener for click on delete button to delete article from saved page
    $(".delete").on("click", function () {
        // store data attribute into variable
        var savedArticle = $(this).parents(".card").data();

        // route user input to delete route to delete article from database
        $.ajax({
            method: "DELETE",
            url: "/saved/api/saved/" + savedArticle._id,
        }).then(function () {
            // Reload the page to get the updated list
            location.reload();
        });

    });

    // click event listiner to display modal and render comments list for articles
    $(".notes").on("click", function () {

        // empties comments list when open modal
        $(".comment-list").empty()

        // stores current article id into variable
        var currentArticle = $(this).parents(".card").data()

        // renders comments modal
        $("#notesModal").modal()

        // get request to get current article data
        $.ajax({
            method: "GET",
            url: "/saved/api/comments/" + currentArticle._id,
        }).then(function (data) {

            // displays article id in modal
            $("#notesModalLabel").html("Notes for Article: " + currentArticle._id);

            var commentData = {
                _id: currentArticle._id,
                comments: data || []
            };

            // stores current article data into the comment save button
            $(".save-btn").data("article", commentData);

            var commentsToRender = [];
            var currentComment;

            if (!data.comments.length) {
                // If we have no comments, let user know there are no comments yet for this article
                currentComment = $("<li class='list-group-item'>No comments for this article yet.</li>");
                commentsToRender.push(currentComment);
            } else {
                // If we do have comments, go through each one
                for (var i = 0; i < data.comments.length; i++) {
                    // Constructs an li element to contain our comment text and a delete button
                    currentComment = $("<li class='list-group-item comment'>")
                        .text(data.comments[i].body)
                        .append($("<button class='btn btn-danger comment-delete'>x</button>"));
                    // Store the comment id on the delete button for easy access when trying to delete
                    currentComment.children("button").data("_id", data.comments[i]._id);
                    // Adding our currentComment to the commentsToRender array
                    commentsToRender.push(currentComment);
                }
            }
            //append the commentsToRender to the comment-list inside the comment modal
            $(".comment-list").append(commentsToRender);
        });
    });

    // saves comment
    $(".save-btn").on("click", function () {
        var commentData;
        // grabs user comment
        var newComment = $(".comment-text").val().trim();

        // if there is a new comment post it to the db to its associated article
        if (newComment) {
            commentData = { _articleId: $(this).data("article")._id, body: newComment };
            $.ajax({
                method: "POST",
                url: "/saved/api/comments/" + commentData._articleId,
                data: {
                    body: newComment
                }
            })
                .then(function (data) {
                    // empty comment text box
                    $(".comment-text").val("");
                })
        }
    });

    // deletes comment
    $(document).on("click", ".comment-delete", function () {

        commentId = $(this).data("_id");

        $.ajax({
            method: "DELETE",
            url: "/saved/api/comments/" + commentId
        })
            .then(function (data) {
                // close modal
                $("#notesModal").modal('hide');
            })

    })

});