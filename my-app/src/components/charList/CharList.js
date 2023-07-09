import './charList.scss';
import { useEffect, useState} from 'react'
import PropTypes from "prop-types"
import Spinner from '../../spiner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import MarvelServices from '../../services/services';
const CharList = (props) => {
    const [charList, setChar] = useState([]);
    const [newitemId, setNewitemId] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false)

    const {error, loading, getCharapters} = MarvelServices();
   
    

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = (offset) => {
        onCharListLoading();
        getCharapters(offset)
            .then(onCharListLoaded)
    }

    const onCharListLoading = () => {
        setNewitemId(true)
    }

    const onCharListLoaded = (newCharList) => {
       
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setChar([...newCharList]);
        setNewitemId(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended)


    }

    function renderItems(arr) {
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    key={item.id}
                    onClick={() => props.selectedItemId(item.id)}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

        
        const items = renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                    className="button button__main button__long"
                    disabled={newitemId}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    
}

CharList.propTypes = {
    selectedItemId: PropTypes.func.isRequired
}

export default CharList;

