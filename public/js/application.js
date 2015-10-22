var post = Backbone.Model.extend({
  urlRoot: "/posts"
});

var postStore = Backbone.Collection.extend({
  url: "/posts",
  model: post
});

var posts = new postStore;

var feedView = Backbone.View.extend({
  events: {
    'click .thumbnail-img': 'promoteModal',
    'click .message-button': 'displayMessage',
    'click .camera-container': 'publish'
  },

  initialize: function(){
    this.collection.fetch({
      success: function(response){
        var arrOfPosts = response.models[0].get("feed");
        this.render(arrOfPosts);
      }.bind(this)
    });
  },

  render: function(arrOfPosts){
    var template = _.template($('#feed-template').html());
    arrOfPosts.shift();
    window.arrOfPosts = arrOfPosts;
    this.$el.html(template);
    return this;
  },

  promoteModal: function(e){
    // Set Image
    $(".modal-img").attr("src", e.currentTarget.src);

    // Set Likes
    var likeData = $(e.currentTarget).attr("numLikes");
    var likeString = likeData === "" ? "0 " : likeData + " ";
    likeString += "<span class='glyphicon glyphicon-heart' aria-hidden='true'></span>";
    $("#numLikes").html(likeString);
  },

  displayMessage: function(e){
    e.preventDefault();
    var requestType = $(e.currentTarget).html() === "Flag" ? "put" : "delete";
    $.ajax({
      type: requestType,
      url: "/posts",
      success: function (response) {
        $("#message").html(response.Message);
        $("#message").fadeIn();
        setTimeout(function(){
          $("#message").fadeOut();
        }, 1000);
      }
    });
  },

  publish: function(e){
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/posts",
      success: function (response) {
        $("#publishing-message").html(response.Message);
        $("#publishing-message").fadeIn();
        setTimeout(function(){
          $("#publishing-message").fadeOut();
        }, 1000);
      }
    });
  }

});

var view = new feedView({el: $('#mainContent'), collection: posts});
