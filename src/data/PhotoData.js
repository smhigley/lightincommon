define(function(require, exports, module) {
    var PhotoData = {
        flickr_api_key: '5f6652a08b32dd50ae264fb3f47a9632',
        flickr_api_secret: '6826da1b61cf3f39',
        query_params: '?method=flickr.interestingness.getList&format=json&nojsoncallback=1&per_page=15',
        url: 'https://api.flickr.com/services/rest/'
    }

    PhotoData.getUrl = function() {
        return PhotoData.url + PhotoData.query_params + '&api_key=' + PhotoData.flickr_api_key;
    };

    PhotoData.parse = function(data) {
        var urls = [],
            titles = [];
        data = JSON.parse(data);
        var photos = data.photos.photo;
        console.log("returned photo array", photos);
        for (var i = 0; i < photos.length; i++) {
            console.log("this photo:", photos[i]);
            var photo = photos[i];

            var url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_m.jpg'
            urls.push(url);

            titles.push(photo.title);
        }
        return {"urls": urls, "titles": titles};
    };

    module.exports = PhotoData;
});
