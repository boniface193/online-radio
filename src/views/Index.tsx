import React, { useState, useRef, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { BookMarked, Channel, Country, External, Heart, Menu, Next, Pause, Play, Previous, Search } from '../assests/icons/icons';
import ToggleMode from '../components/toggleMode';
import { fetchChannels, favourite } from "../redux/reducers/channelSlice";

const YourComponent: React.FC = () => {
  const dispatch = useDispatch()
  const { data, status, loading } = useSelector((state: any) => state.channelSlice);

  
  useEffect(() => {
    dispatch(fetchChannels());
  }, [dispatch]);
  
  // eslint-disable-next-line
  const [currentTrack, setCurrentTrack] = useState<any>({ favorited: false })
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isTimerPlaying, setIsTimerPlaying] = useState<boolean>(true);
  const tracks = Object.keys(data).length < 1 ? [{}] : data;
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      setIsTimerPlaying(false);
    };

    audio?.addEventListener('ended', handleEnded);

    return () => {
      audio?.removeEventListener('ended', handleEnded);
    };
  }, []);

  const favorite = () => {
    dispatch(favourite(tracks[currentTrackIndex].id))
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex === 0 ? tracks.length - 1 : prevIndex - 1));
    setIsTimerPlaying(true);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex === tracks.length - 1 ? 0 : prevIndex + 1));
    setIsTimerPlaying(true);
  };

  const isPlaying = () => {
    const audio = audioRef.current;

    if (isTimerPlaying) {
      audio?.play();
    } else {
      audio?.pause();
    }
  };

  const play = () => {
    isPlaying();
    setIsTimerPlaying(!isTimerPlaying);
  };

  const showMenu = () => {
    document.querySelector('.menu')?.classList.toggle('hidden')
  }

  if (loading) {
    return (<section className="h-screen flex items-center dark:bg-slate-700 bg-[#dfe7ef]"> <div className="w-12 h-12 mx-auto rounded-full animate-spin border-2 border-dashed border-blue-500 border-t-transparent"></div></section>)
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
        <p className="dark:text-white">{status}</p>
        <div className="player__top">
          <div className="player-cover">
            {/* Add your transition group logic here */}
            {tracks.map((track: any, $index: number) => (
              $index === currentTrackIndex ? (
                <div key={$index} className="player-cover__item" style={{ backgroundImage: `url(${track.favicon})` }}></div>
              ) : null
            ))}
          </div>
          <div className="player-controls">
            <aside onClick={showMenu} className="player-controls__item inline-flex">
              <Menu />
            </aside>
            <div className={`player-controls__item -favorite inline-flex ${tracks[currentTrackIndex].favorited ? 'active' : ''}`} onClick={favorite}>
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
            {currentTrack ? <div className="album-info" v-if="currentTrack">
              <div className="album-info__name">{tracks[currentTrackIndex].name}</div>
              <div className="album-info__track">{tracks[currentTrackIndex].country}</div>
            </div> : null
            }
          </div>
          <audio ref={audioRef} src={tracks[currentTrackIndex].url_resolved}></audio>
        </div>
      </div>
      <Outlet />
    </div >
  );
};

export default YourComponent;
