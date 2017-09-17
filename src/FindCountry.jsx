import React from 'react';
import Information from './Information.jsx';
import ReactSVG from 'react-svg';
import worldHigh from './worldHigh.svg';

class FindCountry extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          name : '',
          id : null,
          prevId: null,
          render : false
      };
  }

  handleNameChange = (event) => {
    if(this.state.prevId != null){
      const colorPath = document.querySelector(`path[id=${this.state.prevId.toLowerCase()}]`);
      colorPath.classList.remove('color');
    };

    this.setState ({
      name : event.target.value,
      render : false,
      prevId: null
    });

  }

  handleBtnClick = (event) => {
    event.preventDefault();

    const path = document.querySelector(`path[title="${this.state.name.toLowerCase()}"]`);
    console.log(path);
    const pathId = path.id;

    path.classList.add('color');

    this.setState ({
      id: pathId,
      prevId: (this.state.id!=null) ? this.state.id : pathId,
      render: true
    });
  };

  handleClickOnCountry = (event) => {
    event.preventDefault();
    const countryName = event.target.getAttribute('title');
    const path = document.querySelector(`path[title="${countryName}"]`);
    const pathId = path.id;
    path.classList.add('color');
    console.log(path);
    this.setState ({
      id : pathId,
      prevId: (this.state.id!=null)?this.state.id:pathId,
      render : true,
    });
  }

  renameTitleId() {
    let paths = document.querySelectorAll('path');
    console.log(paths)

    paths.forEach((path) => {
      path.setAttribute('id', path.id.toLowerCase());
      path.setAttribute('title', path.getAttribute('title').toLowerCase())
    });

    if(this.state.id){
      console.log(this.state.id);
      const path = document.querySelector(`path#${this.state.id}`);
      path.classList.add('color');
    }
  }


  render(){
    return(
    <div>
      <div className='div-map' onClick={this.handleClickOnCountry}>
        <ReactSVG
          path={worldHigh}
          callback={svg => this.renameTitleId()}
          className="example"
          style={{width: '1009px', height: '665px'}}
        />
      </div>
      <form className='form'>
        <input  className='input'
                type='text'
                placeholder='Podaj nazwę kraju'
                onChange={this.handleNameChange}/>

        <button className='input' onClick={this.handleBtnClick}>Znajdź na mapie</button>
      </form>

      { this.state.render && <Information id={this.state.id}/> }
    </div>
    )
  }
}

export default FindCountry;
