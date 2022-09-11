import './App.css';
import axios from 'axios';
import { useState } from 'react';
const App = () => {
  const [searchResponse, setSearchResponse] = useState([]);
  const [totalValue, setTotalValue] = useState();

  const handleChange = async e => {
    const { data } = await axios.post('http://localhost:8000/movies/search', {
      data: {
        title: e.target.value,
      },
    });

    setSearchResponse(data.results);
    setTotalValue(data.total.value);
  };
  return (
    <div className='App'>
      <div className='container search-table'>
        <div className='search-box'>
          <div className='row'>
            <div className='col-md-3'>
              <h5>Search All Fields</h5>
            </div>
            <div className='col-md-9'>
              <input
                type='text'
                id='myInput'
                onChange={handleChange}
                className='form-control'
                placeholder='Search IMDB movies'></input>
            </div>
          </div>
        </div>
        <div className='search-list'>
          <h3>
            {totalValue ?? 0} {totalValue > 1 ? 'Records' : 'Record'} Found
          </h3>
          <table className='table' id='myTable'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Overview</th>
                <th>Revenue:Budget ($)</th>
              </tr>
            </thead>
            <tbody>
              {searchResponse.map((res, idx) => (
                <tr key={idx}>
                  <td className='title'>{res.title}</td>
                  <td>
                    <p>{res.overview}</p>
                    <sub>"{res.tagline}"</sub>
                  </td>
                  <td>
                    <p>
                      <sub>
                        {res.revenue.toLocaleString()}:{res.budget.toLocaleString()}
                      </sub>
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
