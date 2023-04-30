import birdsData from './birds.js';
import birdsDataEn from './birdsEn.js';
import './index.html';
import './index.scss';
import correct from './assets/sounds/mixkit-correct-answer-tone-2870 (mp3cut.net).mp3';
import wrong from './assets/sounds/mixkit-wrong-electricity-buzz-955 (mp3cut.net).wav';
import defaultImg from './assets/img/steve-smith-SS8-1lF3cZ8-unsplash-mini.webp';

// Variables
const play = document.querySelector('#js-play');
const trackDuration = document.querySelector('#js-track-duration');
const seekBar = document.querySelector('#js-seek-bar1');
const volumeSlider = document.querySelector('#js-volume-slider');
const volumeButton = document.querySelector('#js-volume-button');
const play2 = document.querySelector('#js-play2');
const trackDuration2 = document.querySelector('#js-track-duration2');
const seekBar2 = document.querySelector('#js-seek-bar2');
const volumeSlider2 = document.querySelector('#js-volume-slider2');
const volumeButton2 = document.querySelector('#js-volume-button2');
const variants = document.querySelector('.variants');
const birdPhoto = document.querySelector('#js-bird-photo');
const birdName = document.querySelector('#js-bird-name');
const birdPhoto2 = document.querySelector('#js-bird-photo2');
const birdName2 = document.querySelector('#js-bird-name2');
const birdLatin = document.querySelector('.bird-latin');
const level = document.querySelector('.level');
const birdDescription = document.querySelector('.bird-description');
const hiddenInfo =document.querySelector('#question-container');
const score = document.querySelector('.score');
const birdsFamily = document.querySelectorAll('.birds-family');
const levelText = document.querySelector('.level-text');
const main = document.querySelector('.main');
const gameResults = document.querySelector('.game-results');
const message = document.querySelector('.message');
const playAgain = document.querySelector('#js-button-more');
const startPage = document.querySelector('.start-page');
const startGame = document.querySelector('#js-button-start');
const congrats = document.querySelector('.congrats');
const ruLangBtn = document.querySelector('#js-ru-lang');
const enLangBtn = document.querySelector('#js-en-lang');
const logo = document.querySelector('.logo');
const title = document.querySelector('.title');
const rules = document.querySelector('.rules');
const gallerySection = document.createElement('section');
const viewGallery = document.querySelector('#js-button-gallery');
const quiz = document.querySelector('#js-button-quiz');
const mainPage = document.querySelector('#js-button-main');

let isPlay = false;
let birdFamilies = document.querySelectorAll('.family');
let stage = 0;
let isWin = false;
let bird = '';
let randomNum = 0;
let overallScore = 0;
let stageScore = 5;
let checkboxName = document.querySelectorAll('.checkbox');
let label = document.querySelectorAll('.label');
let birdImage = '';
let description = '';
let isPlay2 = false;
let lang = '';
let timer;
let timer2;
let isStartGame = false;

// Sounds
let audio = new Audio();
let audio2 = new Audio();
let rightAnswerSound = new Audio(correct);
let wrongAnswerSound = new Audio(wrong);

// First start settings
score.classList.add('hidden');
ruLangBtn.textContent = 'Русский';
enLangBtn.textContent = 'English';

// Event Listeners
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
ruLangBtn.addEventListener('click', () => {
  lang = 'ru';
  isStartGame = false;
  quiz.classList.add('hidden');
  ruLang();
});
enLangBtn.addEventListener('click', () => {
  lang = 'en';
  isStartGame = false;
  quiz.classList.add('hidden');
  enLang();
});
startGame.addEventListener('click', start);
logo.addEventListener('click', toMainPage);
mainPage.addEventListener('click', toMainPage);
variants.addEventListener('click', checkVariants);
level.addEventListener('click', changeLevel);
playAgain.addEventListener('click', resetGame);
play.addEventListener('click', playAudioButton, false);
volumeSlider.addEventListener('click', changeVolume, false);
volumeButton.addEventListener('click', mute, false);
seekBar.addEventListener('input', handleSeekBar);
audio.addEventListener('timeupdate', () => {
  seekBar.value = audio.currentTime;
  seekBarStyle();
}, false);
play2.addEventListener('click', playAudioButton2);
volumeSlider2.addEventListener('click', changeVolume2, false);
volumeButton2.addEventListener('click', mute2);
seekBar2.addEventListener('input', handleSeekBar2);
audio2.addEventListener('timeupdate', () => {
  seekBar2.value = audio2.currentTime;
  seekBarStyle2();
}, false);
viewGallery.addEventListener('click', () => {
  gallerySection.classList.remove('hidden');
  startPage.classList.add('hidden');
  main.classList.add('hidden');
  gameResults.classList.add('hidden');
  if (isStartGame) {
    quiz.classList.remove('hidden');
  }
  audio.pause();
  play.classList.remove('pause');
  isPlay = false;
  audio2.pause();
  play2.classList.remove('pause');
  isPlay2 = false;
  createGallery();
});
quiz.addEventListener('click', () => {
  main.classList.remove('hidden');
  gallerySection.classList.add('hidden');
  score.classList.remove('hidden');
  gameResults.classList.add('hidden');
  startPage.classList.add('hidden');
  quiz.classList.add('hidden');
});
document.addEventListener('play', autoStopGalleryAudio, true);

function setLocalStorage() {
  localStorage.setItem('languageSergioAJS', lang);
}

function getLocalStorage() {
  if (localStorage.getItem('languageSergioAJS')) {
    lang = localStorage.getItem('languageSergioAJS');

    if (lang === 'ru') {
      ruLang();
    } else {
      enLang();
    }

  } else {
    lang = 'ru';
    ruLang();
  }
}

// Language settings

function ruLang() {
  logo.title = 'На главную страницу';
  birdFamilies[0].textContent = 'Разминка';
  birdFamilies[1].textContent = 'Воробьиные';
  birdFamilies[2].textContent = 'Лесные птицы';
  birdFamilies[3].textContent = 'Певчие птицы';
  birdFamilies[4].textContent = 'Хищные птицы';
  birdFamilies[5].textContent = 'Морские птицы';
  mainPage.textContent = 'Главная';
  startGame.textContent = 'Новая игра';
  quiz.textContent = 'Продолжить игру';
  title.textContent = 'Приветствую в викторине Songbird!';
  rules.innerHTML = 'Ваша задача - узнать птицу по голосу.<br>Перед началом игры можете ознакомиться с птицами в галерее.<br><br>При смене языка, Вы не сможете продолжить начатую игру!';
  congrats.textContent = 'Поздравляю!';
  playAgain.textContent = 'Сыграть еще раз';
  viewGallery.textContent = 'Галерея птиц';
  gallerySection.innerHTML = '';
}

function enLang() {
  logo.title = 'To main page';
  congrats.textContent = 'Congratulations!';
  birdFamilies[0].textContent = 'Warm-up';
  birdFamilies[1].textContent = 'Sparrows';
  birdFamilies[2].textContent = 'Forest birds';
  birdFamilies[3].textContent = 'Songbirds';
  birdFamilies[4].textContent = 'Birds of prey';
  birdFamilies[5].textContent = 'Sea birds';
  mainPage.textContent = 'Main';
  startGame.textContent = 'New game';
  quiz.textContent = 'Continue game';
  title.textContent = 'Welcome to the Songbird Quiz!';
  rules.innerHTML = 'Your task is to recognize the bird by its voice<br>Before you start the game, you can check out the birds in the gallery.<br><br>If you change the language, you will not be able to continue the current game!';
  playAgain.textContent = 'Play again';
  viewGallery.textContent = 'Birds gallery';
  gallerySection.innerHTML = '';
}

// Game functions

function start() {
  score.classList.remove('hidden');
  startPage.classList.add('hidden');
  main.classList.remove('hidden');
  gallerySection.classList.add('hidden');
  quiz.classList.remove('hidden');
  resetGame();
  isStartGame = true;
}

function toMainPage() {
  score.classList.add('hidden');
  startPage.classList.remove('hidden');
  main.classList.add('hidden');
  gameResults.classList.add('hidden');
  gallerySection.classList.add('hidden');
  clearInterval(timer);
  clearInterval(timer2);
  play.classList.remove('pause');
  isPlay = false;
  audio.pause();
  play2.classList.remove('pause');
  isPlay2 = false;
  audio2.pause();
  if (!isStartGame) {
    quiz.classList.add('hidden');
  } else {
    quiz.classList.remove('hidden');
  }
}

function checkVariants() {
  let checkbox = event.target.closest('.checkbox');

  if (!checkbox) return;

  if (!variants.contains(checkbox)) return;

  function currentBird() {
    hiddenInfo.classList.remove('hidden');
    audio2.src = birdsData[stage][checkbox.id].audio;
    play2.classList.remove('pause');
    isPlay2 = false;
    birdPhoto2.src = birdsData[stage][checkbox.id].image;
    birdPhoto2.style.filter = 'brightness(1)';
    clearInterval(timer2);

    if (lang === 'ru') {
      birdName2.textContent = birdsData[stage][checkbox.id].name;
      birdLatin.textContent = birdsData[stage][checkbox.id].species;
      birdDescription.innerHTML = birdsData[stage][checkbox.id].description;
    } else {
      birdName2.textContent = birdsDataEn[stage][checkbox.id].name;
      birdLatin.textContent = birdsDataEn[stage][checkbox.id].species;
      birdDescription.innerHTML = birdsDataEn[stage][checkbox.id].description;
    }

  }

  if (!isWin) {

    if (checkbox.name !== bird) {
      wrongAnswerSound.play();
      currentBird();
      checkbox.style.backgroundColor = 'red';

      if (checkbox.classList.contains('checked')) {
        return;
      } else {
        stageScore--;
      }

      checkbox.classList.add('checked');
    } else {
      isWin = true;
      rightAnswerSound.play();
      checkbox.style.backgroundColor = 'green';
      hiddenInfo.classList.remove('hidden');
      birdPhoto.src = birdImage;
      birdPhoto.style.filter = 'brightness(1)';
      birdName.textContent = bird;
      birdDescription.innerHTML = description;
      level.classList.add('level-active');
      audio.pause();
      play.classList.remove('pause');
      isPlay = false;
      overallScore +=stageScore;
      audio2.src = birdsData[stage][checkbox.id].audio;
      birdPhoto2.src = birdsData[stage][checkbox.id].image;
      birdPhoto2.style.filter = 'brightness(1)';
      clearInterval(timer);
      currentBird();

      if (lang === 'ru') {
        score.innerHTML = `Очки: ${overallScore}`;
        birdName2.textContent = birdsData[stage][checkbox.id].name;
        birdLatin.textContent = birdsData[stage][checkbox.id].species;
      } else {
        score.innerHTML = `Score: ${overallScore}`;
        birdName2.textContent = birdsDataEn[stage][checkbox.id].name;
        birdLatin.textContent = birdsDataEn[stage][checkbox.id].species;
      }

    }

  } else {
    currentBird();
  }
}

function getRandomNum() {
  return randomNum = Math.floor(Math.random() * 6);
}

function game(stage) {
  if (stage === 5) {

    if (lang === 'ru') {
      levelText.textContent = 'Показать результат';
    } else {
      levelText.textContent = 'Show result';
    }

    gameStage();
  } else {

    if (lang === 'ru') {
      levelText.textContent = 'Следующий уровень';
    } else {
      levelText.textContent = 'Next level';
    }

    gameStage();
  }
}

function gameStage() {
  if (lang === 'ru') {
    trackDuration.textContent = 'Загрузка...';

  } else {
    trackDuration.textContent = 'Loading...';
  }
  clearInterval(timer);
  getRandomNum();
  isWin = false;
  birdName.textContent = '******';
  birdPhoto.src = defaultImg;
  birdsFamily[stage].classList.add('birds-family-active');

  for (let i = 0; i < birdsData[stage].length; i++) {
    checkboxName[i].style.backgroundColor = '#896e69';

    if (lang === 'ru') {
      label[i].textContent = birdsData[stage][i].name;
      checkboxName[i].name = birdsData[stage][i].name;
    } else {
      label[i].textContent = birdsDataEn[stage][i].name;
      checkboxName[i].name = birdsDataEn[stage][i].name;
    }

    checkboxName[i].classList.remove('checked');
  }

  if (lang === 'ru') {
    score.innerHTML = `Очки: ${overallScore}`;
    birdDescription.innerHTML = 'Послушайте плеер.<br>Выберите птицу из списка';
    bird = birdsData[stage][randomNum].name;
    description = birdsData[stage][randomNum].description;
  } else {
    score.innerHTML = `Score: ${overallScore}`;
    birdDescription.innerHTML = 'Listen to the player.<br>Choose a bird from the list';
    bird = birdsDataEn[stage][randomNum].name;
    description = birdsDataEn[stage][randomNum].description;
  }

  audio.src = birdsData[stage][randomNum].audio;
  birdImage = birdsData[stage][randomNum].image;
  birdPhoto.style.filter = 'brightness(0.7)';
}

function changeLevel() {
  if (level.classList.contains('level-active')) {
    clearInterval(timer);

    if (lang === 'ru') {
      trackDuration.textContent = 'Загрузка...';

    } else {
      trackDuration.textContent = 'Loading...';
    }

    if (stage === 5) {
      main.classList.add('hidden');
      gameResults.classList.remove('hidden');
      quiz.classList.add('hidden');
      isStartGame = false;

      if (overallScore !== 30) {
        playAgain.classList.remove('hidden');
        if (lang === 'ru') {
          message.innerHTML = `Вы набрали ${overallScore} из 30 возможных очков.<br>Вы можете лучше!`;
        } else {
          message.innerHTML = `You scored ${overallScore} out of a possible 30 points.<br>You can do better!`;
        }
      } else {
        playAgain.classList.add('hidden');
        if (lang === 'ru') {
          message.textContent = `Вы набрали ${overallScore} очков. Супер!`;
        } else {
          message.textContent = `You scored ${overallScore} points. Super!`;
        }
        playAgain.classList.add('.hidden');
      }
      clearInterval(timer);
      clearInterval(timer2);
      play.classList.remove('pause');
      isPlay = false;
      audio.pause();
      play2.classList.remove('pause');
      isPlay2 = false;
      audio2.pause();
    } else {
      if (lang === 'ru') {
        trackDuration.textContent = 'Загрузка...';

      } else {
        trackDuration.textContent = 'Loading...';
      }
      clearInterval(timer);
      clearInterval(timer2);
      stage++;
      birdsFamily[stage - 1].classList.remove('birds-family-active');
      stageScore = 5;
      isWin = false;
      game(stage);
      level.classList.remove('level-active');
      play.classList.remove('pause');
      isPlay = false;
      play2.classList.remove('pause');
      isPlay2 = false;
      audio2.pause();
      hiddenInfo.classList.add('hidden');
    }

  }

}

function resetGame() {
  if (lang === 'ru') {
    trackDuration.textContent = 'Загрузка...';

  } else {
    trackDuration.textContent = 'Loading...';
  }

  hiddenInfo.classList.add('hidden');
  birdsFamily[1].classList.remove('birds-family-active');
  birdsFamily[2].classList.remove('birds-family-active');
  birdsFamily[3].classList.remove('birds-family-active');
  birdsFamily[4].classList.remove('birds-family-active');
  birdsFamily[5].classList.remove('birds-family-active');
  main.classList.remove('hidden');
  gameResults.classList.add('hidden');
  playAgain.classList.remove('hidden');
  quiz.classList.add('hidden');
  game(stage = 0);
  overallScore = 0;

  if (lang === 'ru') {
    score.textContent = `Очки: ${overallScore}`;
  } else {
    score.textContent = `Score: ${overallScore}`;
  }

  stageScore = 5;
  play.classList.remove('pause');
  isPlay = false;
  audio.pause();
  play2.classList.remove('pause');
  isPlay2 = false;
  audio2.pause();
  level.classList.remove('level-active');
  isWin = false;
}

// Player 1

audio.onloadeddata = () => {
  trackDuration.textContent = `${getTimeCodeFromNum(audio.currentTime)} / ${getTimeCodeFromNum(audio.duration)}`;
  seekBar.max = audio.duration;
  seekBar.step = seekBar.max / 10000;
};

audio.ontimeupdate = () => {
  seekBar.value = audio.currentTime;
  seekBarStyle();
};

function handleSeekBar() {
  audio.currentTime = seekBar.value;
  seekBarStyle();
}

function seekBarStyle() {
  seekBar.style.backgroundSize = (seekBar.value - seekBar.min) * 100 / (seekBar.max - seekBar.min) + '% 100%';
}

function playAudioButton() {
  play.classList.add('pause');
  if (!isPlay) {
    audio.play();
    isPlay = true;
    timer = setInterval(function() {
      trackDuration.textContent = `${getTimeCodeFromNum(audio.currentTime)} / ${getTimeCodeFromNum(audio.duration)}`;

      if (audio.currentTime === audio.duration) {
        play.classList.remove('pause');
        isPlay = false;
      }

    }, 50);
  } else {
    play.classList.remove('pause');
    audio.pause();
    isPlay = false;
  }

}

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${String(minutes).padStart(2, 0)}:${String(seconds % 60).padStart(2, 0)}`;

  return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
}

function changeVolume(event) {
  const sliderWidth = window.getComputedStyle(volumeSlider).width;
  const newVolume = event.offsetX / parseInt(sliderWidth);
  audio.volume = newVolume;
  volumeSlider.querySelector('#js-volume-percentage').style.width = newVolume * 100 + '%';
}

function mute() {
  const volumeEl = document.querySelector('#js-volume-container #js-volume');
  audio.muted = !audio.muted;

  if (audio.muted) {
    volumeEl.classList.remove('unmute');
    volumeEl.classList.add('mute');
  } else {
    volumeEl.classList.add('unmute');
    volumeEl.classList.remove('mute');
  }

}

// Player 2

audio2.onloadstart = () => {
  if (lang === 'ru') {
    trackDuration2.textContent = 'Загрузка...';

  } else {
    trackDuration2.textContent = 'Loading...';
  }
};

audio2.onloadeddata = () => {
  trackDuration2.textContent = `${getTimeCodeFromNum(audio2.currentTime)} / ${getTimeCodeFromNum(audio2.duration)}`;
  seekBar2.max = audio2.duration;
  seekBar2.step = seekBar2.max / 10000;
};

audio2.ontimeupdate = () => {
  seekBar2.value = audio2.currentTime;
  seekBarStyle2();
};

function handleSeekBar2() {
  audio2.currentTime = seekBar2.value;
  seekBarStyle2();
}

function seekBarStyle2() {
  seekBar2.style.backgroundSize = (seekBar2.value - seekBar2.min) * 100 / (seekBar2.max - seekBar2.min) + '% 100%';
}

function playAudioButton2() {
  play2.classList.add('pause');

  if (!isPlay2) {
    audio2.play();
    isPlay2 = true;
    timer2 = setInterval(function() {
      trackDuration2.textContent = `${getTimeCodeFromNum2(audio2.currentTime)} / ${getTimeCodeFromNum2(audio2.duration)}`;

      if (audio2.currentTime === audio2.duration) {
        play2.classList.remove('pause');
        isPlay2 = false;
      }

    }, 50);
  } else {
    play2.classList.remove('pause');
    audio2.pause();
    isPlay2 = false;
  }

}

function getTimeCodeFromNum2(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${String(minutes).padStart(2, 0)}:${String(seconds % 60).padStart(2, 0)}`;

  return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
}

function changeVolume2(event) {
  const sliderWidth = window.getComputedStyle(volumeSlider2).width;
  const newVolume = event.offsetX / parseInt(sliderWidth);
  audio2.volume = newVolume;
  volumeSlider2.querySelector('#js-volume-percentage2').style.width = newVolume * 100 + '%';
}

function mute2() {
  const volumeEl = document.querySelector('#js-volume-container2 #js-volume2');
  audio2.muted = !audio2.muted;

  if (audio2.muted) {
    volumeEl.classList.remove('unmute');
    volumeEl.classList.add('mute');
  } else {
    volumeEl.classList.add('unmute');
    volumeEl.classList.remove('mute');
  }

}


// Gallery

function createGallery() {
  const header = document.querySelector('.header');
  const galleryContainer = document.createElement('div');
  gallerySection.classList.add('gallery-section');
  galleryContainer.classList.add('gallery-container');
  let birdDataFlatRu = birdsData.flat();
  let birdDataFlatEn = birdsDataEn.flat();

  if (lang === 'ru') {
    for (const bird of birdDataFlatRu) {
      let birdCard = document.createElement('div');
      let birdImage = document.createElement('img');
      let birdTitle = document.createElement('h3');
      let birdLatinTitle = document.createElement('h4');
      let birdAudio = document.createElement('audio');
      let birdInformation = document.createElement('p');

      birdImage.src = bird.image;
      birdImage.alt = bird.name;
      birdTitle.textContent = bird.name;
      birdLatinTitle.textContent = bird.species;
      birdAudio.src = bird.audio;
      birdAudio.preload = 'none';
      birdAudio.controls = true;
      birdAudio.volume = 0.7;
      birdInformation.textContent = bird.description;

      birdCard.classList.add('bird-card');
      birdImage.classList.add('bird-image');
      birdTitle.classList.add('bird-title');
      birdLatinTitle.classList.add('bird-latin-title');
      birdAudio.classList.add('bird-audio');
      birdInformation.classList.add('bird-information');

      birdCard.appendChild(birdTitle);
      birdCard.appendChild(birdImage);
      birdCard.appendChild(birdLatinTitle);
      birdCard.appendChild(birdAudio);
      birdCard.appendChild(birdInformation);
      galleryContainer.appendChild(birdCard);

      logo.addEventListener('click', () => {
        birdAudio.pause();
        clearInterval(timer);
        clearInterval(timer2);
        galleryContainer.classList.add('hidden');
        gallerySection.innerHTML = '';
      });
      startGame.addEventListener('click', () => {
        birdAudio.pause();
        clearInterval(timer);
        clearInterval(timer2);
        gallerySection.innerHTML = '';
      });
      quiz.addEventListener('click', () => {
        birdAudio.pause();
        clearInterval(timer);
        clearInterval(timer2);
        gallerySection.innerHTML = '';
      });
    }
  } else if (lang === 'en') {
    for (const bird of birdDataFlatEn) {
      let birdCard = document.createElement('div');
      let birdImage = document.createElement('img');
      let birdTitle = document.createElement('h3');
      let birdLatinTitle = document.createElement('h4');
      let birdAudio = document.createElement('audio');
      let birdInformation = document.createElement('p');

      birdImage.src = bird.image;
      birdImage.alt = bird.name;
      birdTitle.textContent = bird.name;
      birdLatinTitle.textContent = bird.species;
      birdAudio.src = bird.audio;
      birdAudio.preload = 'none';
      birdAudio.controls = true;
      birdAudio.volume = 0.7;
      birdInformation.textContent = bird.description;

      birdCard.classList.add('bird-card');
      birdImage.classList.add('bird-image');
      birdTitle.classList.add('bird-title');
      birdLatinTitle.classList.add('bird-latin-title');
      birdAudio.classList.add('bird-audio');
      birdInformation.classList.add('bird-information');

      birdCard.appendChild(birdTitle);
      birdCard.appendChild(birdImage);
      birdCard.appendChild(birdLatinTitle);
      birdCard.appendChild(birdAudio);
      birdCard.appendChild(birdInformation);
      galleryContainer.appendChild(birdCard);

      logo.addEventListener('click', () => {
        birdAudio.pause();
        clearInterval(timer);
        clearInterval(timer2);
        galleryContainer.classList.add('hidden');
        gallerySection.innerHTML = '';
      });
      startGame.addEventListener('click', () => {
        birdAudio.pause();
        clearInterval(timer);
        clearInterval(timer2);
        gallerySection.innerHTML = '';
      });
      quiz.addEventListener('click', () => {
        birdAudio.pause();
        clearInterval(timer);
        clearInterval(timer2);
        gallerySection.innerHTML = '';
      });
    }
  }
  header.after(gallerySection);
  gallerySection.appendChild(galleryContainer);
}

function autoStopGalleryAudio(event) {
  let audios = document.querySelectorAll('.bird-audio');

  for (let i = 0; i < audios.length; i++) {
    if (audios[i] !== event.target) {
      audios[i].pause();
      audios[i].currentTime = 0;
    }

  }
}
