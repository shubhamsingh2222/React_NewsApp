import React from 'react'

export default function NewsItem(props) {
  return (
    <div className='my-3'>
      <div className="card" >
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        position: 'absolute',
        right: '0'
      }}>
        <span className=" badge rounded-pill bg-danger">{props.source}</span>
      </div>
          <img src={props.imageUrl?props.imageUrl:"https://static.files.bbci.co.uk/ws/simorgh-assets/public/sport/images/metadata/poster-1024x576.png"} className="card-img-top" alt="sportImage"/>
          <div className="card-body">
            <h5 className="card-title">{props.title}...</h5>
            <p className="card-text">{props.description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {props.author?props.author:"Unknown"} on {new Date(props.date).toDateString()}</small></p>
            <a href= {props.newsUrl} target='_' className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
    </div>
  )
}
