import React, { Component } from 'react'

const NewsItem =(props) => {
 
    let  {title, description, imageUrl, newsUrl, author, date, source} = props ;

     return ( 
       <div> 
          
                <div className="card mx-3">
                <span className="badge rounded-pill bg-danger" style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0'}}>{source}</span>
                <img src={!imageUrl ? "https://thefederal.com/file/2023/05/hand-medical-glove-pointing-virtual-screen-medical-technology.jpg" : imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className=" text-danger">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} className="btn btn-dark btm-sm" target='_blank'>Read More</a>
                </div>
                </div>
                
      </div>
     )
}
export default NewsItem;