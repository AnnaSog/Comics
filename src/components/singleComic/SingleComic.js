import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import Error from '../error/Error';
import Spinner from '../spinner/Spinner';

import './singleComic.scss';


const SingleComic = () => {
    const [comic, setComic] = useState(null);
    const {comicId} = useParams();
   const {loading, error, getComics, clearError} = useMarvelService();

    useEffect(() => {
        updateComic()
    },[comicId] )

    const updateComic = () =>{
        clearError();
        getComics(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const errorMessage = error ? <Error/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {thumbnail, title, descr, pageCount, prices, language } = comic;
    return(
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{descr}</p>
                <p className="single-comic__descr"> Pages: {pageCount}</p>
                {/* <p className="single-comic__descr">Language: {language}</p> */}
                <div className="single-comic__price">{prices} $</div>
            </div>
            <Link to={`/comics`}  className="single-comic__back">Back to all</Link>
        </div>
    )

}

export default SingleComic;