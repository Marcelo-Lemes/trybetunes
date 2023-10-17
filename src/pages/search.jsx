import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/header';
import Loading from '../components/loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    search: '',
    artist: '',
    buttonDisable: true,
    loading: false,
    albumList: [],
    albumValidation: false,
  };

  validation = () => {
    const {
      artist,
    } = this.state;
    const minLength = 2;
    const artistValidation = artist.length >= minLength;

    this.setState({
      buttonDisable: !(artistValidation),
    });
  };

  onInputChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, this.validation);
  };

  searchButton = (e) => {
    e.preventDefault();
    const { artist } = this.state;
    this.setState({
      search: artist,
      loading: true,
      albumValidation: true,
    });

    searchAlbumsAPI(artist)
      .then((data) => this.setState({
        artist: '',
        loading: false,
        albumList: data,
      }));
  };

  render() {
    const {
      loading,
      buttonDisable,
      artist,
      albumList,
      albumValidation,
      search } = this.state;

    return (

      <div className="container" data-testid="page-search">
        <Header />
        <div className="search-container">
          <form className="album-form">
            <div className="album-container">
              <input
                type="text"
                name="artist"
                className="input-search"
                placeholder="digite o nome do artista"
                value={ artist }
                onChange={ this.onInputChange }
                data-testid="search-artist-input"
              />
              <button
                type="submit"
                className="search-button"
                data-testid="search-artist-button"
                disabled={ buttonDisable }
                onClick={ this.searchButton }
              >
                Pesquisar
              </button>
            </div>

          </form>

          {loading && <Loading />}
          {
            albumValidation === true && albumList.length > 0
              ? (
                <div>
                  <h2 className="search-subtitle">
                    Resultado de álbuns de:
                  </h2>
                  <h1 className="search-subtitle">{search}</h1>
                </div>

              )
              : null
          }
          <div className="album-list">
            {
              albumValidation === true && albumList.length === 0
                ? <h2 className="search-subtitle">Nenhum álbum foi encontrado</h2>
                : albumList
                  .map((album) => (

                    <div key={ album.collectionId }>
                      <Link
                        to={ `/album/${album.collectionId}` }
                        data-testid={ `link-to-album-${album.collectionId}` }
                        className="album"
                      >
                        <img
                          src={ album.artworkUrl100.replaceAll('100x100', '250x250') }
                          alt={ album.collectionName }
                        />
                        <div className="album-desc">
                          <p>
                            { `Album: ${album.collectionName}` }
                          </p>
                          <p>
                            { `Artista: ${album.artistName}` }
                          </p>
                        </div>

                      </Link>
                    </div>
                  ))
            }
            { loading && <Loading /> }
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
