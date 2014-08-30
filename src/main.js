define(function(require, exports, module) {
	var Engine  = require('famous/core/Engine'),
      Utility = require('famous/utilities/Utility');

  // import views and data
  var AppView = require('views/AppView');
  var PhotoData = require('data/PhotoData');

	var mainContext = Engine.createContext();
  mainContext.setPerspective(1000);

  // get image data
  Utility.loadURL(PhotoData.getUrl(), initApp);

  function initApp(data) {
    // parse data as defined in SlideData
    data = PhotoData.parse(data);

    // create appview
    var appView = new AppView({
      data: data,
      size: [295, 498],
      prompt: "Who, or what, do you wish you were able to spend more time with?"
    });
    mainContext.add(appView);
  }

});