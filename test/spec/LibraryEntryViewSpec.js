describe('LibraryEntryView', function() {
  var view, model;

  beforeEach(function() {
    model = new SongModel({
      artist: 'Fakey McFakerson',
      title: 'Never Gonna Mock You Up',
      url: 'example/url',
    });
    //sinon.spy(SongModel.prototype, 'enqueue'); // Uncomment this when working on the second test
    sinon.spy(SongModel.prototype, 'play');
    view = new LibraryEntryView({model: model});
    view.render();
  });

  after(function() {
    SongModel.prototype.enqueue.restore();
  });

  xit('plays clicked songs', function(){
    view.$el.children().first().click();
    expect(model.play).to.have.been.called;
  });

  // Comment out the above spec when implementing the below
  it('queues clicked songs', function(){
    view.$el.children().first().click();
    expect(model.enqueue).to.have.been.called;
  });

});
