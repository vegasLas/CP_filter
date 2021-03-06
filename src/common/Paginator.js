import React, { useState } from 'react'
import './Paginator.css';
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux/posts-reducer';
import { getCurrentPageSel } from '../selectors/postsSelectors';


let Paginator = ({ totalItemsCount,  portionSize = 20 }) => {
    let pagesCount = Math.ceil(totalItemsCount - 1 / 1)
    const dispatch = useDispatch()
    const currentPage = useSelector(getCurrentPageSel)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize
    const onPageChanged = (page) => {
        dispatch(actions.setCurrentPage(page))
    }
    return <div className="paginator">
        {portionNumber > 1 &&
            <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>}

        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p) => {
                return <a className=
                    {cn({
                        ["selectedPage"]:
                            currentPage  === p 
                    },
                        "pageNumber")}
                    key={p}
                    onClick={(e) => {
                        onPageChanged(p)
                    }}>{p}</a>
            })
        }
        {portionCount > portionNumber && <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button>}
    </div>
}

export default Paginator;