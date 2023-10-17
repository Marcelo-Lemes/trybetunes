import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { addSong, removeSong,
  getFavoriteSongs, readFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './loading';
import SongsContext from '../contexts/SongsContext';

function MusicCard(props) {
  const { setData } = useContext(SongsContext);
  const [state, setState] = useState({
    favorite: false,
    loading: false,
  });

  const removeFavorite = (song) => {
    const favSongs = readFavoriteSongs();
    const newFavSongs = favSongs.filter((s) => s.trackId !== song.trackId);
    setData({
      favSongs: newFavSongs,
    });
  };

  const favoriteSongs = ({ target }) => {
    const { songs } = props;
    setState({
      loading: true,
    });
    if (target.checked) {
      addSong(songs)
        .then(() => setState({
          loading: false,
          favorite: true,
        }));
    } else {
      removeSong(songs)
        .then(() => setState({
          loading: false,
          favorite: false,
        }));
      removeFavorite(songs);
    }
  };

  const loadComplete = () => {
    const timer = 100;
    setTimeout(() => {
      setState({
        loading: false,
      });
    }, timer);
  };

  const favoriteCheck = async () => {
    setState({ loading: true });
    const { songs } = props;
    const musicas = await getFavoriteSongs();
    const favoritas = musicas.find((song) => song.trackId === songs.trackId);
    if (favoritas) {
      setState({
        favorite: true,
      });
    } loadComplete();
  };

  useEffect(() => {
    favoriteCheck();
  }, []);

  const { songs: {
    trackName,
    previewUrl,
    trackId,
  } } = props;
  const { loading, favorite } = state;
  return (
    <li className="music-card">
      {loading ? <Loading />
        : (
          <>
            <div className="music-name">
              <p>{trackName}</p>
            </div>

            <audio
              className="music-player"
              data-testid="audio-component"
              src={ previewUrl }
              controls
            >
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <label className="favorite-label" htmlFor={ trackId }>
              Favorita
              <input
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                checked={ favorite }
                id={ trackId }
                onChange={ favoriteSongs }
              />
            </label>

          </>)}
    </li>

  );
}

MusicCard.propTypes = {
  songs: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};

export default MusicCard;
