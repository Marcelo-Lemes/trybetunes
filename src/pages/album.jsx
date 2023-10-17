import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/musicCard';
import Loading from '../components/loading';

class Album extends React.Component {
  state = {
    albumSongs: [],
    loading: true,

  };

  componentDidMount() {
    this.selectedAlbum();
  }

  selectedAlbum = () => {
    const id = this.props;
    const albumId = id.match.params.id;

    getMusics(albumId)
      .then((data) => this.setState({
        albumSongs: data,
      }))
      .then(() => this.loadComplete());
  };

  loadComplete = () => {
    const timer = 1000;
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, timer);
  };

  render() {
    const { albumSongs, loading } = this.state;
    return (
      <div className="container" data-testid="page-album">
        <Header />
        <div className="songs-container">
          {loading ? <Loading />
            : (
              <>
                <div className="album-songs" key={ albumSongs[0].collectionId }>
                  <img
                    className="album-img"
                    src={ albumSongs[0].artworkUrl100.replaceAll('100x100', '520x520') }
                    alt={ albumSongs[0].collectionName }
                  />
                  <div className="album-text">
                    <h2 data-testid="artist-name">{albumSongs[0].artistName}</h2>
                    <h4 data-testid="album-name">{albumSongs[0].collectionName}</h4>
                  </div>

                </div>
                <ul className="songs">
                  {albumSongs
                    .filter((album) => album.kind)
                    .map((song) => (
                      <MusicCard
                        key={ song.trackId }
                        songs={ song }
                      />))}
                </ul>

              </>)}
        </div>

      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
export default Album;
