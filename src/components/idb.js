import React, { Component } from 'react';
import idb  from 'idb';

class IDB extends Component {
    constructor(store){
        super(store);
        this.state = {
            name: 'Name',
            articles: [],
        };

        this.dbPromise = idb.open('alc-news', 1, updateDB => {
            const co = updateDB.createObjectStore('alc-news', {
                keyPath: 'id',
                autoIncrement: true,
            });
            co.createIndex('author','author', {
                 unique:false
            });
            co.createIndex('title', 'author', {
                unique: false
            });
            co.createIndex('description', 'description', {
                unique: false
            });
            // co.createIndex('title', 'title', {
            //     unique: false
            // });
            // co.createIndex('description', 'description', {
            //     unique: false
            // });
            co.createIndex('url', 'url', {
                unique: false
            });
            co.createIndex('urlToImage', 'urlToImage', {
                unique: false
            });
            co.createIndex('publishedAt', 'publishedAt', {
                unique: false
            });
            
            store.map((item, index) => co.add(item));
            return co
        });

        // this.getData = this.getData.bind(this);
        this.getAllData = this.getAllData.bind(this);
        // this.setData = this.setData.bind(this);
        // this.deleteData = this.deleteData.bind(this);
    }

    // get(key) {
    //     return this.dbPromise
    //         .then(db => 
    //             db
    //                 .transaction('tabs')
    //                 .objectStore('tabs')
    //                 .index('id')
    //                 .getAll(key)
    //         )
    //         .then(val => console.log(val));
    // }

    // getData() {
    //     this.get('tab_1');
    //   }

    getAll(){
        return this.dbPromise.then(db => {
            return db
                .transaction('alc-news')
                .objectStore('alc-news')
                .getAll();
        });
    }

    // delete(key) {
    //     return this.dbPromise.then(db => {
    //         const tx = db.transaction('tabs', 'readwrite');
    //         tx.objectStore('tabs').delete(key);
    //         tx.objectStore('tabs').getAll();

    //         return tx.complete;
    //         });
    //     }
    
    // set(val) {
    //     return this.dbPromise.then(db => {
    //         const tx = db.transaction('tabs', 'readwrite');
    //         tx.objectStore('tabs').put(val);
    //         tx.objectStore('tabs').getAll();

    //         return tx.complete;
    //     });
    // }

    getAllData(){
        return this.getAll();
    }

    // setData() {
    //     this.set({ tabId: 'tab_4', name: 'Event Four', checked: true });
    //   }
    
    //   deleteData() {
    //     this.delete('Event Three');
    //   }

    }

export default IDB;