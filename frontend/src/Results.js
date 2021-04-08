import React from 'react';
import './style.css'

const Results = ({businesses, page}) => {
    const start = page*10;
    const end = Math.min(page*10 + 11, businesses.length+1);

    return (
        <>
            {businesses.slice(0).reverse().slice(start, end).map((business, index) => {
                let name = business.name;
                let address = (business.location.display_address).join(" ");
                let starRating = business.rating;
                let reviewCount = business.review_count;
                let link = business.url;
                let score = (reviewCount * starRating) / (reviewCount + 1);
                score = Math.round(score * 100) / 100;  // round to 2 decimal places
                let image = business.image_url;

                return (
                    <div key={index} className="card flex-row mx-5 my-4 px-3 py-2">
                        <div>
                            {image ? <img src={image} style={{height:"350px", width:"350px"}} alt="image"/> : null}
                        </div>
                        <div className="m-4">
                            <h4>{name}</h4>
                            <p className="my-0">{address}</p>
                            <div className="my-3">
                                {Array.from({length: Math.floor(starRating)}, (_, i) => i).map(index => 
                                    <div className="star fullstar" key={index}></div>
                                )}
                                {starRating !== Math.floor(starRating) ? <div className="star halfstar"></div> : null}
                            </div>
                            <div>
                                <p>Review Count: {reviewCount}</p>
                            </div>
                            <div>
                                <p>Score: <b>{score}</b></p>
                            </div>
                            <a href={link} target='_blank' rel="noreferrer" style={{textDecoration: 'none'}}><button className="btn btn-outline-dark">Click here for Business page</button></a>
                        </div>
                    </div>
                )

            })}
        </>
    )

}
export default Results;