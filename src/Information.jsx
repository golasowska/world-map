import React from 'react';

class Information extends React.Component{
  constructor(props){
      super(props);
      this.state = {
        name : '',
        capital : '',
        language : [],
        region : '',
        population : '',
        area : '',
        flag : '',
        dataAPI: null,
        id: null
      };
  }

  componentDidUpdate() {
    this.updateComponent();
  }

  componentDidMount() {
    this.updateComponent();
  }

  updateComponent = () => {
    if(this.state.id !== this.props.id){

      console.log('fetch');
      fetch('https://restcountries.eu/rest/v2/alpha/'+ this.props.id.toLowerCase())
          .then(r => r.json())
          .then( data => {
              this.setState({
                  dataAPI: data,
                  name : data.name,
                  capital : data.capital,
                  region : data.region,
                  population : data.population,
                  area : data.area,
                  flag : data.flag,
                  language : data.languages,
                  id: this.props.id
              });
          });
      }
  }

    render(){
        let langs = [];
        for (var i = 0; i < this.state.language.length; i++) {
          langs.push(this.state.language[i].name)
        }
            return <table className="table-fill">
                        <thead>
                          <tr>
                            <th className="text-left">COUNTRY NAME</th>
                            <th className="text-left">{this.state.name}</th>
                          </tr>
                        </thead>
                        <tbody className="table-hover">
                          <tr>
                            <td className="text-left">CAPITAL</td>
                            <td className="text-left">{this.state.capital}</td>
                          </tr>
                          <tr>
                            <td className="text-left">REGION</td>
                            <td className="text-left">{this.state.region}</td>
                          </tr><tr>
                            <td className="text-left">POPULATION</td>
                            <td className="text-left">{this.state.population}</td>
                          </tr><tr>
                            <td className="text-left">AREA</td>
                            <td className="text-left">{this.state.area}</td>
                          </tr>
                          <tr>
                            <td className="text-left">LANGUAGE</td>
                            <td className="text-left">{langs.join(', ')}</td>
                          </tr>
                          <tr className='last-row'>
                            <td className="text-center" colSpan="2">
                              <img
                                style={{width: 120, height: 80}}
                                src={this.state.flag}
                                alt="flag"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
    }
}

export default Information;
