import throttle from 'lodash.throttle';
import Vimeo from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);
const throttleTime = 1000;

const key = 'videoplayer-current-time';

player.on('timeupdate', throttle(saveVideoTimeToLocal, throttleTime));

function saveVideoTimeToLocal({ seconds }) {
  localStorage.setItem(key, seconds);
  console.log('seconds', seconds);
}

const currentTime = localStorage.getItem(key);

player
  .setCurrentTime(currentTime)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
