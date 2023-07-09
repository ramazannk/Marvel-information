import './comicsList.scss';
import { Link } from 'react-router-dom';
import MarvelServices from '../../services/services';
import { useEffect, useState } from 'react';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import Spinner from '../../spiner/Spinner';

const ComicsList = (props) => {
    const [comics, setComics] = useState([]);

    const {getAllComics, loading, error} = MarvelServices();

    useEffect(() => {
        upDateComics();
    }, [])

    const upDateComics = () => {
        getAllComics()
        .then(upComics)
    }

    const upComics = (comics) => {
        setComics(comics)
    }

    const renderItem = (arr) => {
        const items = arr.map((item) => {
            return(
                <li className="comics__item"
                    key={item.id}>
                        <Link to={`/comics/${item.id}`}>
                            <img src={item.thumbnail} alt={item.name} className="comics__item-img"/>
                            <div className="comics__item-name">{item.name}</div>
                            <div className="comics__item-price">{item.price}</div>
                        </Link>
                    </li>
            )
        })

        return(
            <ul className="comics__grid">
                {items}
            </ul>
        )
        
    }
    
    const items = renderItem(comics);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;
    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {content}
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;