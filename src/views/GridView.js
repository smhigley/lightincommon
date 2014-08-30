define(function(require, exports, module) {
  // Import additional modules to be used in this view 
  var View = require('famous/core/View'),
      Surface = require('famous/core/Surface'),
      ImageSurface = require('famous/surfaces/ImageSurface'),
      Transform = require('famous/core/Transform'),
      StateModifier = require('famous/modifiers/StateModifier'),
      Transitionable = require("famous/transitions/Transitionable"),
      Easing = require('famous/transitions/Easing'),
      SpringTransition = require('famous/transitions/SpringTransition');

  Transitionable.registerMethod('spring', SpringTransition);

  function GridView() {
    View.apply(this, arguments);

    console.log("grid view");

    this.rootMod = new StateModifier({
      origin: [0, 0],
      align: [0, 0.5]
    });
    this.mainNode = this.add(this.rootMod);

    _createGrid.call(this);
  }

  // inherit from famo.us view
  GridView.prototype = Object.create(View.prototype);
  GridView.prototype.constructor = GridView;

  GridView.DEFAULT_OPTIONS = {
    data: undefined,
    size: [undefined, undefined],
    columns: 2
  };

  function _createGrid() {
    var cols = this.options.columns,
        urls = this.options.data['urls'];

    this.options.photoSize = this.options.size[0]/cols;
    this.photos = [];

    for (var i = 0; i < urls.length; i++) {
      var photo = _createPhoto.call(this, urls[i]);

      var offsetTop = this.options.photoSize * Math.floor(i/cols),
          offsetLeft = this.options.photoSize * (i % cols);

      var photoMod = new StateModifier({
        origin: [0, 0],
        transform: Transform.translate(offsetLeft, offsetTop, 0)
      });

      this.photos.push(photoMod);

      this.mainNode.add(photoMod).add(photo);

      // add click event listener
      _bindClick.call(this, photo, i);
    };
  }

  function _createPhoto(url) {
    var photo = new ImageSurface({
      size: [this.options.photoSize, this.options.photoSize],
      content: url
    });

    return photo;
  }

  function _bindClick(el, index) {
    el.on('click', function(){
      this.showPhoto(index);
    }.bind(this, index));
  }

  GridView.prototype.showPhoto = function(index) {
    var photo = this.photos[index];
    /*photo.properties = {
      zIndex: 5
    }*/

    console.log("clicked photo", photo);

    var spring = {
      method: 'spring',
      period: 1000,
      dampingRatio: 0.5
    };

    photo.setTransform(
      Transform.scale(2),
      { duration : 1500, curve: Easing.inOutExpo }
    );

  }

  module.exports = GridView;

});
