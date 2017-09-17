import React from 'react';

import FindCountry from './FindCountry.jsx';


class Map extends React.Component{
  render(){
    return(
      <div className='main-div'>
        <h1 className='header'>WORLD MAP</h1>
        <FindCountry />
      </div>
    )
  }
}

export default Map;

