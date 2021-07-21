import React, { useState } from 'react';
import axios from 'axios';

const Search = ({onBusinessChange, onShowSpinner}) => {

    const [button, setButton] = useState('');

    async function handleSearch(e) {
        e.preventDefault();

        if (button === "search") {
            onShowSpinner(true);
            let promise = await axios.get("http://localhost:8000/yelp/", {
                params: {
                    location: e.target.location.value
                }
            });
            onShowSpinner(false);
            if (promise.data.businesses !== null) {
                onBusinessChange(promise.data.businesses)
            }
        } else if (button === "deepSearch") {
            onShowSpinner(true);
            let promise = await axios.get("http://localhost:8000/yelpdeep/", {
                params: {
                    location: e.target.location.value
                }
            });
            onShowSpinner(false);
            if (promise.data.businesses !== null) {
                onBusinessChange(promise.data.businesses.sort((a,b) => (a.rating < b.rating) ? 1 : -1))
            }
        }

    }

    return (
        <div className="d-flex justify-content-center m-5">
            <form onSubmit={handleSearch}>
                <h2>Yelp Lowest Rated Parking Search</h2>
                <div style={{float:"right"}}>
                <small>powered by Yelp</small>
                </div>
                <div className="form-group mt-5 mx-2">
                    <label htmlFor="location">Enter Location</label>
                    <input type="text" className="form-control my-2 px-3" id="location" placeholder="ex. Los Angeles" required />
                    <div className="d-flex justify-content-center">
                        <button type="submit" onClick={() => setButton("search")} className="btn btn-secondary my-2 mx-3">Search</button>
                        <button type="submit" onClick={() => setButton("deepSearch")}className="btn btn-secondary my-2 mx-3">Deep Search</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Search;