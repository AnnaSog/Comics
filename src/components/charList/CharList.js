
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

import './charList.scss';



const CharList = (props) =>  {

    const [char, setChar] = useState([]);
    const [newCharLoading, setNewCharLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [endedList, setEndedList] = useState(false)

    const {loading, error, getAllCharacters}= useMarvelService();

    useEffect(() => {
        onRequest(offset, true); 
        //console.log('useEffect');
    }, [])
    

    const onCharLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length < 9){
            ended = true
        }

        setChar(char => [...char, ...newCharList]);
        setOffset(offset => offset + 9);
        setEndedList(ended)
        //console.log('onCharLoaded ');
    }

    const onRequest = (offset, initial) => {
        initial ? setNewCharLoading(false) : setNewCharLoading(true);
        onCharLoading();
        getAllCharacters(offset)
            .then(onCharLoaded)
        //console.log('onRequest');
    }
    
    const onCharLoading = () => {
        setNewCharLoading(true)
        //console.log('onCharLoading');
    }

    // componentDidUpdate(prevProps){
    //     if(this.props.char !== prevProps.char){
    //         this.updateCharacter()
    //     }
    //     console.log('Update')
    //    // console.log(prevProps);
    // }


        const res = char.map(item => {
            const {id, name, thumbnail} = item;
            const active = props.charId === id 
            const clazz = active ? 'char__item char__item_selected' : 'char__item';

            return(
                <li className={clazz}
                    key={id}
                    onClick={() => props.updateChar(id)}>
                    <img src={thumbnail} alt={name}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        })
        const err = error ? <Error/> : null;
        const spinner = loading && !newCharLoading ?  <Spinner/> : null;
        //const content = !(loading || error) ? res : null;
     
        return (
            <div className="char__list">
                 <ul className="char__grid">
                    {err}
                    {spinner}
                    {res} 
                </ul> 
                <button 
                    className="button button__main button__long"
                    // disabled={newCharLoading}
                    onClick={() => onRequest(offset)}
                    style={{'display': endedList ? 'none' : 'block'}}>

                    <div className="inner">load more</div>
                </button>
            </div>
        )

    
}

export default CharList;

CharList.propTypes = {
    updateChar: PropTypes.func
}
