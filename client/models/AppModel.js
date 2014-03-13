// App.js - Defines a backbone model class for the whole app.
var AppModel = Backbone.Model.extend({

  initialize: function(params){
    this.set('currentSong', new SongModel());
    this.set('songQueue', new SongQueue());

    /* Note that 'this' is passed as the third argument. That third argument is
    the context. The 'play' handler will always be bound to that context we pass in.
    In this example, we're binding it to the App. This is helpful because otherwise
    the 'this' we use that's actually in the funciton (this.set('currentSong', song)) would
    end up refering to the window. That's just what happens with all JS events. The handlers end up
    getting called from the window (unless we override it, as we do here). */
    params.library.on('play', function(song){
      var self = this;



      this.set('currentSong', song);
      var triggeredAlready = false;
      $('audio').on('ended', function(){
        if(!triggeredAlready){
          song.set('playcount', song.get('playcount') + 1);

          var sq = self.get('songQueue');

          sq.remove(sq.at(0));
          if (sq.at(0) !== undefined) {
            var newSong = sq.at(0);
            newSong.play();
          }
          triggeredAlready = true;
        }
      });

    }, this);

    params.library.on('enqueue', function(song){
      this.get('songQueue').add(song);
      if(this.get('songQueue').length === 1){
        song.play();
      }
    }, this);




    params.library.on('dequeue', function(song){
      var sq = this.get('songQueue');
      sq.remove(song);
    }, this);
  }

});
