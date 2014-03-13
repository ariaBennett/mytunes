// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({

  initialize: function(params){
    this.playerView = new PlayerView({model: this.model.get('currentSong')});
    this.libraryView = new LibraryView({collection: this.model.get('library')});
    this.songQueueView = new SongQueueView({collection: this.model.get('songQueue')});

    this.model.on('change:currentSong', function(model){
      console.log('Triggered by change:currentSong' , this.model.get('currentSong'));
      this.playerView.setSong(model.get('currentSong'));
    }, this);

    this.model.get('songQueue').on('add', this.songQueueView.render, this.songQueueView);
    this.model.get('songQueue').on('remove', this.songQueueView.render, this.songQueueView);
  },

  render: function(){
    return this.$el.html([
      this.playerView.$el,
      this.libraryView.$el,
      this.songQueueView.$el
    ]);
  }

});
