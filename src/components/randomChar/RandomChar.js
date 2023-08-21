import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import useMarvelService from '../../services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {

    const [char, setChar] = useState({});

    const { error, loading, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateCharacter();
    },[]);
   
    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateCharacter = () => {
        clearError();
        const id = Math.floor(Math.random() * (1010789 - 1009146) + 1009146)
        // const id = 1009168;
        getCharacter(id)
            .then(onCharLoaded)
        
       
    }

    const spinner = loading ?  <Spinner/> : null;
    const err = error ? <Error/> : null;
    const view = !(loading || error) ? <View char={char}/> : null;


    return (
        <div className="randomchar">
            {/* <View char={char}/> */}
            {spinner}
            {err}
            {view}
            
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateCharacter} className="button button__main" >
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
   
}

const View = (props) => {
    const {name, descr, thumbnail, homepage, wiki} = props.char;
    const style = (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') ?  `object-fit: contain` : null;

    return(
        <div className="randomchar__block">
            <img style={style} src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {descr}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;