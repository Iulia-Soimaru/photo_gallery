import Flickr from './flickr';
import Gallery from './gallery';

class App {
  createGallery = (json) => {
    new Gallery(json);
  }

  flickrApiCall = () => {
    const flickr = new Flickr(this.createGallery);
    window.jsonFlickrApi = flickr.jsonFlickrApi;
    flickr.init()
  }
}

const app = new App();
app.flickrApiCall();
