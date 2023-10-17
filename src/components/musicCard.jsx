import React from 'react';
import PropTypes from 'prop-types';

import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
    favorite: false,
  };

  componentDidMount() {
    this.favoriteCheck();
  }

  favoriteSongs = ({ target }) => {
    const { songs } = this.props;
    this.setState({
      loading: true,
    });
    if (target.checked) {
      addSong(songs)
        .then(() => this.setState({
          loading: false,
          favorite: true,
        }));
    } else {
      removeSong(songs)
        .then(() => this.setState({
          loading: false,
          favorite: false,
        }));
    }
  };

  favoriteCheck = async () => {
    this.setState({ loading: true });
    const { songs } = this.props;
    const musicas = await getFavoriteSongs();
    const favoritas = musicas.find((song) => song.trackId === songs.trackId);
    if (favoritas) {
      this.setState({
        favorite: true,
      });
    } this.loadComplete();
  };

  loadComplete = () => {
    const timer = 100;
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, timer);
  };

  render() {
    const { songs: {
      trackName,
      previewUrl,
      trackId,
    } } = this.props;
    const { loading, favorite } = this.state;
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
                Favorite
                <input
                  data-testid={ `checkbox-music-${trackId}` }
                  type="checkbox"
                  checked={ favorite }
                  id={ trackId }
                  onChange={ this.favoriteSongs }
                />
              </label>

            </>)}
      </li>

    );
  }
}
MusicCard.propTypes = {
  songs: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};

export default MusicCard;
