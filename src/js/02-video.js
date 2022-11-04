import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer - current - time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

restorePlayer();
player.on('timeupdate', throttle(onTimeUpdate, 1000));

// function onTimeUpdate() {
//   player.getCurrentTime().then(function (seconds) {
//     const currentPos = seconds;
//     // console.log(currentPos);
//     // console.log(typeof currentPos);
//     localStorage.setItem(STORAGE_KEY, currentPos);
//   });
// }

function onTimeUpdate(evt) {
  const currentPos = evt.seconds;
  const vdoEndTime = evt.duration;
  const percentage = (evt.percent * 100).toFixed(2) + '%';

  //   console.log(currentPos);
  //   console.log(vdoEndTime);
  //   console.log(percentage);

  localStorage.setItem(STORAGE_KEY, currentPos);
}

function restorePlayer() {
  const savedPos = localStorage.getItem(STORAGE_KEY);
  const jsonSavedPos = JSON.parse(savedPos);
  console.log(jsonSavedPos);
  console.log(typeof jsonSavedPos);

  localStorage.removeItem(STORAGE_KEY);

  if (savedPos) {
    player
      .setCurrentTime(savedPos)
      .then(function (seconds) {
        seconds = savedPos;
      })
      .catch(function (error) {
        switch (error.name) {
          case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            console.log(error.name);
            console.log(error.message);
            break;

          default:
            // some other error occurred
            console.log(error.name);
            console.log(error.message);
            break;
        }
      });
  }
}

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});
