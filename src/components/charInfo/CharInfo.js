import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import Error from '../error/Error';
import Spinner from '../spinner/Spinner';

import './charInfo.scss';


const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const {loading, error, getAllCharacters, getCharacter} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId]);


    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <Error/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {
                    comics.map((item, i) => {
                        // eslint-disable-next-line
                        if (i > 9) return;
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }                
            </ul>
        </>
    )
}

export default CharInfo;

CharInfo.propTypes = {
    charId: PropTypes.number
}

// class CharInfo extends Component {

//     state ={
//         char: null,
//         loading: true,
//         error: false
//     }
        
//     marvelService = new MarvelService();

//     componentDidMount(){
//         this.updateCharacter();
//         // this.interval = setInterval(this.updateCharacter, 3000)
        
//     }

//     componentDidUpdate(prevProps){
//         if(this.props.charId !== prevProps.charId){
//             this.updateCharacter()
//         }
//     }

//     onCharLoaded = (char) => {
//         this.setState({
//             char: char,
//             loading: false
//         })
//     }

    
//     onError = () => {
//         this.setState({
//             loading: false, 
//             error: true
//         })
//     }

//     updateCharacter = () => {
//         const {charId} = this.props;
//         this.marvelService
//             .getCharacter(charId)
//             .then(this.onCharLoaded)
//             .catch(this.onError) 
//     }
   


//     render(){
//         //const content = !this.props.charId ?  <Skeleton/> : <View char={this.state.char}/>
//         return (
//             <div className="char__info">
//                 {/* <h3>Anna</h3> */}
//                 <View char={this.state.char}/>
//                  {/* {content} */}
//             </div>
//         )
//     }
 
// }
    

// const View = ({char}) => {
//     const {name, descr,thumbnail, homepage, wiki, comics} = char;

//     return(
//         <>
//             <div className="char__basics">
//                 <img src={thumbnail} alt={name}/>
//                 <div>
//                     <div className="char__info-name">{name}</div>
//                     <div className="char__btns">
//                         <a href={homepage} className="button button__main">
//                             <div className="inner">homepage</div>
//                         </a>
//                         <a href={wiki}  className="button button__secondary">
//                             <div className="inner">Wiki</div>
//                         </a>
//                     </div>
//                 </div>
//             </div>
//             <div className="char__descr">
//                 {descr}
//             </div>
//             <div className="char__comics">Comics:</div>
//             <ul className="char__comics-list">

//                 {(comics.length > 0) ? null : 'This character has no comics'  }

//                 {
//                     comics.map((item, i) => {
//                         return(
//                             <li key={i} className="char__comics-item">
//                                 {item.name}
//                             </li>
//                         ) 
//                     }) 
//                 }

//             </ul>
//         </>
//     )

// }

// export default CharInfo;