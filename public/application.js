var post = Backbone.Model.extend({
  urlRoot: "/posts"
});

var postStore = Backbone.Collection.extend({
  url: "/posts",
  model: post
});

var posts = new postStore;

var feedView = Backbone.View.extend({

  initialize: function(){
    this.collection.fetch({
      success: function(response){
        var arrOfPosts = response.models[0].get("feed");
        this.render(arrOfPosts);
      }.bind(this)
    });
  },
  //

  render: function(arrOfPosts){
    var template = _.template($('#feed-template').html());
    window.arrOfPosts = arrOfPosts;
    this.$el.html(template);
    return this;
  }
});

var view = new feedView({el: $('#mainContent'), collection: posts});
