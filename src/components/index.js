import React, {Component} from 'react';
import {Link} from 'react-router-dom';
// import IDB  from './idb';
import idb  from 'idb';
import Pagination from 'react-js-pagination';
import DB from '../db';
// import Business from './business';
// import Bitcoin from './bitcoin';
// import TechCrunch from './techcrunch';
// import Apple from './apple';
import './index.css';
var API = "https://newsapi.org/v2/top-headlines?country=ng&apiKey=137f99815b5e4f99a3f121cc64a2374b";
class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            stats: [],
            count: '',
            // currentPage: 9
            currentPage: 1,
            contentPerPage: 9
        }
    }

    OpenIDB() {
        return idb.open('alc-news-db', 3, function(upgradeDb) {
          switch(upgradeDb.oldVersion) {
            default:
              // Intial stuuff
              break;
            case 1:
              const alcNews = upgradeDb.createObjectStore('alc-news', {keyPath: 'publishedAt'});
              alcNews.createIndex('time-index', 'publishedAt');
              break;
            case 2:
              const favNews = upgradeDb.createObjectStore('fav-news', {keyPath: 'title'});
              favNews.createIndex('fav-index', 'title');
          }
        });
      }

    componentDidMount(){
        fetch(API,{mode: 'cors'})
            .then((response) => response.json())
            .then(findResponse => {
                // console.log(findResponse.articles)
                // console.log(findResponse.totalResults);
                // console.log(IDB.this.getAllData());
                // console.log(this.state.count);
                this.OpenIDB().then(db => {
                    var tx = db.transaction('alc-news', 'readwrite');
                    var store = tx.objectStore('alc-news');
                    findResponse.articles.map(articles => {
                      return store.put(articles);
                      console.log(articles)
                    });
                });
                // this.setState({
                //     // data: IDB
                //     data:findResponse.articles,
                //     count:findResponse.totalResults,
                // })
        })
    }

    render(){
        if(!this.state.stats){
            return <h3>Loading, Please Wait....</h3>
        }
        // const { stats, currentPage, contentPerPage } = this.state
        return (
            <div>
            <nav>
                <div className="nav_wrapper">
                    <a>NEWS OUTLET</a>
                    <ul id="nav-mobile" className="right hide-on-med-down">
                        <li className="active"><a><i className="material-icons">home</i>Home</a></li>
                        <li><a><i className="material-icons">business_center</i>Business</a></li>
                        <li><a><i className="material-icons">monetization_on</i>Bitcoin</a></li>
                        <li><a><i className="material-icons">language</i>Tech Crunch</a></li>
                        <li><a><i className="material-icons">desktop_mac</i>Apple</a></li>
                        
                    </ul>
                </div>
            </nav>
            <div>
                {this.state.data && this.state.data.map((dynamicData,index) =>
                    <div className="container">
                    <div className="row">
                        <div className="col s12 m7">
                            <div className="card">
                                <div className="card-image">
                                    <img src={dynamicData.urlToImage} alt="images of each atrticles"/>
                                    <span className="card-title">{dynamicData.title}</span>
                                </div>
                                <div className="card-action">
                                <a>Continue Reading</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                )} 
                        <Pagination
                            prevPageText='prev'
                            nextPageText='next'
                            firstPageText='first'
                            lastPageText='last'
                            currentPage={this.state.currentPage}
                            itemCountPerChange={9}
                            totalItemsCount={this.state.count}
                            // perRangeDisplayed={5}
                            onChange={this.handlePageChange}
                        />
            </div>
            </div>
        )
    }
}

export default Index;