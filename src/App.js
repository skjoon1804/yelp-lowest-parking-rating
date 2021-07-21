import Search from './Search';
import React, { useState } from 'react';
import Results from './Results'


function App() {

  const [businesses, setBusinesses] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [page, setPage] = useState(0);

  function handleBusinessesChange(e) {
    setBusinesses(e);
    setPage(0)
  }

  function handleSpinner(e) {
    setShowSpinner(e);
  }

  return (
    <div className="App">
      <img className="logo m-4" style={{width:"15%"}} src="/airgarage-logo.png" alt="airgarage logo"/>
      <Search onBusinessChange={(e) => handleBusinessesChange(e)} onShowSpinner={(e) => handleSpinner(e)}/>
      {showSpinner
      ? <div className="spinner m-auto"></div>
      : 
      <>
        <Results businesses={businesses} page={page} />
          {businesses.length > 0
          ?
            <div className="m-5">
              <button onClick={() => setPage(page-1)} className="btn btn-warning" disabled={page===0}>Previous</button>
              <button onClick={() => setPage(page+1)} className="btn btn-warning float-end" disabled={(businesses.length/10)-1 <= page}>Next</button>
            </div>
          : null
          }
        </>
      }
    </div>
  );
}

export default App;

