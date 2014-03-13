// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({

  initialize: function(params){
    this.playerView = new PlayerView({model: this.model.get('currentSong')});
    this.libraryView = new LibraryView({collection: this.model.get('library')});
    console.log('in appview init');
    console.log(this.model.get('currentSongQueue'));
    this.currentSongQueueView = new SongQueueView({collection: this.model.get('currentSongQueue')});

    this.model.on('change:currentSong', function(model){
      this.playerView.setSong(model.get('currentSong'));
    }, this);

    this.model.get('currentSongQueue').on('add', this.currentSongQueueView.render, this.currentSongQueueView);
    this.model.get('currentSongQueue').on('remove', this.currentSongQueueView.render, this.currentSongQueueView);
    this.model.get('currentSongQueue').on('add', this.libraryView.render, this.libraryView);
    this.model.get('currentSongQueue').on('remove', this.libraryView.render, this.libraryView);
  },

  render: function(){
    return this.$el.html([
      this.playerView.$el,
      this.libraryView.$el,
      this.currentSongQueueView.$el
    ]);
  }

});
