import logo from './logo.svg';
import React from 'react'
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { actions, getPosts } from './redux/posts-reducer';
import { useEffect, useReducer, useState } from 'react';
import { getCurrentPageSel, getFilterPostsSel, getPostsSel } from './selectors/postsSelectors';
import Paginator from './common/Paginator';

function Post({ title, body }) {
  return (
    <div className="posts__post">
      <div className="posts__title">
        {title}
      </div>
      <div className="posts__body">
        {body}
      </div>
    </div>
  )
}
function App() {
  console.log("Привет")
  const [count, setCount] = useState(0)
  const [string, setString] = useState("")
  const dispatch = useDispatch()
  const postsSel = useSelector(getPostsSel)
  const filterPostsSel = useSelector(getFilterPostsSel)
  const posts = filterPostsSel.length > 0 && string.length > 0 ? filterPostsSel : string.length === 0 ? postsSel : [];
  const currentPage = useSelector(getCurrentPageSel)
  const getPostsDis = () => {
    dispatch(getPosts())
  }
  useEffect(() => {
    getPostsDis()
  }, [])
  const changeInputFilter = (e) => {
    e.preventDefault()
    setString(e.target.value)
    dispatch(actions.setFilter(e.target.value))
    // dispatch.
  }
  const submitQueue = (e) => {
    e.preventDefault()
    if (count === 0) {
      dispatch(actions.setQueue(false))
      setCount(1)
    } else if (count === 1) {
      dispatch(actions.setQueue(true))
      setCount(2)
    }
    else if (count === 2) {
      dispatch(getPosts())
      setCount(0)
    }
  }
  return (
    <div className="app">
      <label className="app__label">
        Filter:
          <input className="app__input" value={string} onChange={changeInputFilter}>
        </input>
      </label>
      <div className="app__table">
        <table className="app__table-wrapp" border="1">
          <caption className="app__caption">Таблица</caption>
          <thead className="app__names">
            <tr>
              <th className="app__name"><button>Номер</button></th>
              <th className="app__name"><button onClick={submitQueue}>Столбец</button></th>
            </tr>
          </thead>
          {posts.length > 0 ? posts[currentPage].map(p => (
            <tbody key={p.id} className="app_raw">
              <tr>
                <th className="app__id">{p.id}</th>
                <th className="app__title">{p.title}</th>
              </tr>
            </tbody>
          )) : null}
        </table>
      </div>
      <Paginator totalItemsCount={posts.length} pageSize={20} />
    </div >
  );
}

export default React.memo(App);
