import React, { useState, useRef } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { BookMarked, Channel, Country, External, Heart, Menu, Next, Pause, Play, Previous, Search } from '../assests/icons/icons';
import ToggleMode from '../components/toggleMode';

interface Track {
  name: string;
  artist: string;
  cover: string;
  source: string;
  url: string;
  favorited: boolean;
}

const YourComponent: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isTimerPlaying, setIsTimerPlaying] = useState<boolean>(true);
  const [currentTrack, setCurrentTrack] = useState<any>({ favorited: false })
  const [duration, setDuration] = useState<number>(0)
  const [barWidth, setBarWidth] = useState<number>(0)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const progressRef = useRef<HTMLDivElement>(null);

  // Assuming you have the tracks array with the same structure as in the Vue instance
  const tracks: Track[] = [
    // ... your track data
    {
      name: "Mekanın Sahibi",
      artist: "Norm Ender",
      cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/1.jpg",
      source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/1.mp3",
      url: "https://www.youtube.com/watch?v=z3wAjJXbYzA",
      favorited: false
    },
    {
      name: "Everybody Knows",
      artist: "Leonard Cohen",
      cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/2.jpg",
      source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/2.mp3",
      url: "https://www.youtube.com/watch?v=Lin-a2lTelg",
      favorited: true
    },
    {
      name: "Extreme Ways",
      artist: "Moby",
      cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/3.jpg",
      source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/3.mp3",
      url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
      favorited: false
    },
    {
      name: "Butterflies",
      artist: "Sia",
      cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/4.jpg",
      source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/4.mp3",
      url: "https://www.youtube.com/watch?v=kYgGwWYOd9Y",
      favorited: false
    },
    {
      name: "The Final Victory",
      artist: "Haggard",
      cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/5.jpg",
      source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/5.mp3",
      url: "https://www.youtube.com/watch?v=0WlpALnQdN8",
      favorited: true
    },
    {
      name: "Genius ft. Sia, Diplo, Labrinth",
      artist: "LSD",
      cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/6.jpg",
      source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/6.mp3",
      url: "https://www.youtube.com/watch?v=HhoATZ1Imtw",
      favorited: false
    },
    {
      name: "The Comeback Kid",
      artist: "Lindi Ortega",
      cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/7.jpg",
      source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/7.mp3",
      url: "https://www.youtube.com/watch?v=me6aoX0wCV8",
      favorited: true
    },
    {
      name: "Overdose",
      artist: "Grandson",
      cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/8.jpg",
      source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/8.mp3",
      url: "https://www.youtube.com/watch?v=00-Rl3Jlx-o",
      favorited: false
    },
    {
      name: "Rag'n'Bone Man",
      artist: "Human",
      cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg",
      source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/9.mp3",
      url: "https://www.youtube.com/watch?v=L3wKzyIN1yk",
      favorited: false
    }
  ];

  // Define your other state variables and functions here
  const clickProgress = () => {

  }

  const favorite = () => {
    console.log('hello world')
  }

  const prevTrack = () => {
    console.log('hello world')
  }

  const nextTrack = () => {
    console.log('hello world')
  }

  const play = () => {
    console.log('hello world')
  }

  const showMenu = () => {
    document.querySelector('.menu')?.classList.toggle('hidden')
  }


  return (
    <div className="wrapper overflow-hidden sm:flex-row-reverse dark:bg-slate-700 bg-[#dfe7ef]">
      <section className="menu overflow-x-auto rounded-lg sm:h-[480px] p-[30px] sm:mt-0 mt-3 sm:w-auto w-full dark:bg-slate-900 bg-[#eef3f7] shadow-xl drop-shadow-xl sm:space-x-0 space-x-5 sm:space-y-5 flex sm:flex-col items-center">
        <Link to={'search'} className="player-controls__item flex">
          <Search />
        </Link>
        <Link to={'channels'} className="player-controls__item flex">
          <Channel />
        </Link>
        <Link to={'bookmarked'} className="player-controls__item flex">
          <BookMarked />
        </Link>
        <Link to={'country'} className="player-controls__item flex">
          <Country />
        </Link>
        <a href="https://github.com/muhammederdem/mini-player" target="_blank" rel='noreferrer' className="player-controls__item flex">
          <External />
        </a>
        <aside className="sm:absolute sm:bottom-5 right-5 ">
          <ToggleMode />
        </aside>
      </section>
      <div className="player dark:bg-slate-900 bg-[#eef3f7] mr-2">
        <div className="player__top">
          <div className="player-cover">
            {/* Add your transition group logic here */}
            {tracks.map((track, $index) => (
              $index === currentTrackIndex ? (
                <div key={$index} className="player-cover__item" style={{ backgroundImage: `url(${track.cover})` }}></div>
              ) : null
            ))}
          </div>
          <div className="player-controls">
            {/* Add your favorite, link, prev, next, and play buttons here */}
            <aside onClick={showMenu} className="player-controls__item inline-flex">
              <Menu />
            </aside>
            <div className={`player-controls__item -favorite inline-flex ${currentTrack.favorited ? "active" : ""}`} onClick={favorite}>
              <Heart />
            </div>
            <div className="player-controls__item inline-flex" onClick={prevTrack}>
              <Previous />
            </div>
            <div className="player-controls__item inline-flex" onClick={nextTrack}>
              <Next />
            </div>
            <div className="player-controls__item -xl js-play inline-flex" onClick={play}>
              {isTimerPlaying ?
                <Play />
                :
                <Pause />
              }
            </div>
          </div>
        </div>
        <div className="progress" ref={progressRef}>
          <div className="progress__top">
            {/* Add album info and duration here */}
            {currentTrack ? <div className="album-info" v-if="currentTrack">
              <div className="album-info__name">{currentTrack.artist}</div>
              <div className="album-info__track">{currentTrack.name}</div>
            </div> : null
            }
            <div className="progress__duration">{duration}</div>
          </div>
          <div className="progress__bar" onClick={clickProgress}>
            {/* Add progress bar and current time here */}
            <div className="progress__current" style={{ width: barWidth }}></div>
          </div>
        </div>
        {/* Add the remaining parts of your player component here */}
        <div className="progress__time">{currentTime}</div>
      </div>
      <Outlet />
    </div >
  );
};

export default YourComponent;
