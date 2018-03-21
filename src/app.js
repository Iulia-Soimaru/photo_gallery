import Flickr from './flickr';
import Gallery from './gallery';

class App {
  createGallery = (json) => {
    const gallery = new Gallery(json);
    gallery.addGalleryToView();
  }

  flickrApiCall = () => {
    const flickr = new Flickr(this.createGallery);
    window.jsonFlickrApi = flickr.jsonFlickrApi;
    flickr.init()
  }
}

const app = new App();
app.flickrApiCall();
