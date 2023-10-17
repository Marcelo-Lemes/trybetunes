import React, { useContext, useEffect, useState } from 'react';

import Header from '../components/header';
import Loading from '../components/loading';
import MusicCard from '../components/test';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import SongsContext from '../contexts/SongsContext';

export default function Favorites() {
  const { data, setData } = useContext(SongsContext);
  const [loading, setLoad] = useState(true);

  const loadComplete = () => {
    const timer = 1500;
    setTimeout(() => {
      setLoad(false);
    }, timer);
  };

  useEffect(() => {
    getFavoriteSongs()
      .then((songs) => setData({
        favSongs: songs,
      }))
      .then(() => loadComplete());
  });

  return (
    <div className="container" data-testid="page-favorites">
      <Header />
      <div className="favorite-box">
        <div className="favorite-banner">
          <h2 className="title">Músicas Favoritas</h2>

        </div>
        <ul className="favorite-list">
          {loading ? <Loading />
            : data?.favSongs
              .filter((album) => album.kind)
              .map((song) => (
                <MusicCard
                  key={ song.trackId }
                  songs={ song }
                />))}

        </ul>
      </div>

    </div>
  );
}
