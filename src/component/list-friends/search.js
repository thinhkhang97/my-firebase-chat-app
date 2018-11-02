import React, {Component} from 'react';
import './search.css'
class Search extends Component {
    render(){
        return(
            <div>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.2/css/all.css"
                      integrity="sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns"
                      crossOrigin="anonymous"/>
                <div className='search-container'>
                    <button className='search-button'><i className="fas fa-search"></i></button>
                    <input className='search-input' placeholder='enter name'/>
                </div>
            </div>
        )
    }
}
export default Search;