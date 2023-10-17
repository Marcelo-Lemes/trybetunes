import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import SongsContext from './SongsContext';

function SongsProvider({ children }) {
  const [data, setData] = useState({
    favSongs: [],
  });

  useEffect(() => {

  });

  const contextValue = useMemo(() => ({
    data,
    setData,
  }), [data]);

  return (
    <SongsContext.Provider value={ contextValue }>
      {children}
    </SongsContext.Provider>
  );
}
SongsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default SongsProvider;
