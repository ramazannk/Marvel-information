import './charInfo.scss';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Spinner from '../../spiner/Spinner';
import MarvelServices from '../../services/services';

const CharInfo = (props) =>  {
    const {error, loading, getCharapter, clearError} = MarvelServices()
    const [char, setChar] = useState(null)

        
    useEffect(() => {
        selectedCharId()
    }, [props.charId])
        

    const selectedCharId = () =>{
        const {charId} = props;

        if (!charId) {
            return;
        }
        clearError();
        getCharapter(charId)
            .then(onLoaded)
    }



    const onLoaded = (char) => {
        setChar(char)
    }
    
        const skeleton = loading || error || char ? null : <Skeleton/>
        const Spiner = loading ? <Spinner/> : null
        const errorMessage = error ? <ErrorMessage/> : null
        const content = !(loading || error || !char) ? <View char={char}/> : null
    return (
        <div className="char__info">
            {skeleton}
            {Spiner}
            {errorMessage}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name}/>
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
                {/* eslint-disable-next-line */}
                    {comics.map((item, i) =>{
                        return(
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                            )
                    })}
                </ul>
        </>
    )
}
CharInfo.propTypes = {
    charId: PropTypes.number
}
export default CharInfo;