import express from 'express';
import * as config from '../config.json';
import { YoutubeService } from '../services/youtube';

const router = express.Router();
const service = new YoutubeService();

/* GET home page. */
router.get('/', async (req, res) => {
  const trends = await service.getTrendingVideos();
    res.render('youtube/index', {
    title: config.title,
    region: 'US',
    countriesList: service.getCountriesList(),
    videos: trends
  }); 
  // console.log('Fetching data --- ', trends)
});

router.get('/region/:region', async (req, res) => {
  const trends = await service.getTrendingVideos(req.params.region);
  res.render('youtube/index', {
      title: config.title,
      countriesList: service.getCountriesList(),
      region: req.params.region,
      videos: trends
  });
});


router.get('/:videoId', async (req, res) => {
   res.render('youtube/player', {
    title: config.title,
    countriesList: service.getCountriesList(),
    src: 'http://www.youtube.com/embed/' + req.params.videoId + '?autoplay=1',
  });
});

module.exports = router;
