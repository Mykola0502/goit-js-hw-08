import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const STORAGE_KEY = 'videoplayer - current - time';

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

function onTimeUpdate(data) {
  const currentPos = data.seconds;
  const vdoEndTime = data.duration;
  const percentage = (data.percent * 100).toFixed(2) + '%';

  //   console.log(currentPos);
  //   console.log(vdoEndTime);
  //   console.log(percentage);

  const currentPosOnStringify = JSON.stringify(currentPos);

  localStorage.setItem(STORAGE_KEY, currentPosOnStringify);
}

function restorePlayer() {
  const savedPosOnStringify = localStorage.getItem(STORAGE_KEY);
  console.log(savedPosOnStringify);
  console.log(typeof savedPosOnStringify);

  if (savedPosOnStringify) {
    const savedPos = JSON.parse(savedPosOnStringify);

    console.log(savedPos);
    console.log(typeof savedPos);

    player.setCurrentTime(savedPos);
  }
}

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});
