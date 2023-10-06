import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import { Link } from 'react-router-dom';

import './comicsList.scss';




const ComicsList = () => {
    const [comic, setComic] = useState([]);
    const [offset, setOffset] = useState(256);
    const [newComisLoading, setNewComicLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true)
    }, [])
    
    const onRequest = (offset, initial) => {
        initial ? setNewComicLoading(false) : setNewComicLoading(true);
        getAllComics(offset)
            .then(updateComics)
    }

    const updateComics = (newComicList) => {
        let ended = false;
        if (newComicList.length < 8) {
            ended = true;
        }

        setComic(comic => [...comic, ...newComicList]);
        setOffset(offset => offset + 8);
        setNewComicLoading(false)
        setComicsEnded(ended);
    }

    

    const comicItem = comic.map((item, i) => {
        const {id, title, prices, urls, thumbnail } = item;
        return(
            <li className="comics__item" key={i}>
                
                <Link to={`/comics/${id}`}>
                    <img src={thumbnail} alt={title} className="comics__item-img"/>
                    <div className="comics__item-name">{title}</div>
                    <div className="comics__item-price">{prices} $</div>
                </Link>
            </li>
        )

    })

        const spinner = loading && !newComisLoading ? <Spinner/> : null;  //&& !newComisLoading
        const err = error ? <Error/> : null;
        //const content = !(loading || error ) ? comicItem : null

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {spinner}
                {err}
                {comicItem}
            </ul>
            <button className="button button__main button__long">
                <div onClick={() => onRequest(offset)} className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;
