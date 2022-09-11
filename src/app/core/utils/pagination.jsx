import React, { Component } from 'react';
import '../stylesheets/pagination.scss';

class Pagination extends Component {
  state = {  } 
  render() { 
    const { page, totalPage, query } = this.props;

    if(page < 5){      // chosen page is less than 5
      if(totalPage <= 6 ){   // check if the number of pages is less than 6
        return (
          <div className="pagination d-flex">
            {Array.from({length: totalPage}, (_, i) => i + 1).map( p => 
              <div key={p} onClick={(e) => query({page: p})} type="button" className={"num " + (p === page ? 'active' : '')}>{p}</div>
            )}
          </div>
        )
      }else {
        return (
          <div className="pagination d-flex">
            {Array.from({length: 5}, (_, i) => i + 1).map( p => 
              <div key={p} onClick={(e) => query({page: p})} type="button" className={"num " + (p === page ? 'active' : '')}>{p}</div>
            )}
            <div className="period">...</div>
            <div className="num">{totalPage}</div>
          </div>
        )
      }
    }else if(page > (totalPage - 4)){   // last few pages 
      if(totalPage <= 6){
        return (
          <div className="pagination d-flex">
            {Array.from({length: totalPage}, (_, i) => i + 1).map( p => 
              <div key={p} onClick={(e) => query({page: p})} type="button" className={"num " + (p === page ? 'active' : '')}>{p}</div>
            )}
          </div>
        )
      }else {
        var startEndNum = totalPage - 4
        return (
          <div className="pagination d-flex">
            <div className="num">1</div>
            <div className="period">...</div>
            {Array.from({length: 5}, (_, i) => i + startEndNum).map( p => 
              <div key={p} onClick={(e) => query({page: p})} type="button" className={"num " + (p === page ? 'active' : '')}>{p}</div>
            )}
          </div>
        )
      }
    }else {   // middle pages
      return (
        <div className="pagination d-flex">
          <div className="num">1</div>
          <div className="period">...</div>
          {Array.from({length: 3}, (_, i) => i + (page-1)).map( p => 
            <div key={p} onClick={(e) => query({page: p})} type="button" className={"num " + (p === page ? 'active' : '')}>{p}</div>
          )}
          <div className="period">...</div>
          <div className="num">{totalPage}</div>
        </div>
      )
    }
  }
}
 
export default Pagination;