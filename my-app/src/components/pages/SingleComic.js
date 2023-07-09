import './singleComic.scss';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import Spinner from '../../spiner/Spinner';
import MarvelServices from '../../services/services';
import { useState, useEffect } from 'react';
import {Link, useParams} from "react-router-dom"
import AppBanner from '../appBanner/AppBanner';

const SingleComic = () => {
    const [comics, setComics] = useState(null);
    const {comicsId} = useParams();
    console.log(comicsId)

    const {getComics, loading, error, clearError} = MarvelServices();

    useEffect(() => {
        upDateComics();
    }, [comicsId])

    const upDateComics = () => {
        clearError();
        getComics(comicsId)
        .then(upComics)
    }

    const upComics = (comics) => {
        setComics(comics)
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comics) ? <View comics={comics}/> : null;
    return (
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({comics}) => {
    const {thumbnail, title, description, pageCount, language, price} = comics
    return(
        <>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{pageCount}</p>
                    <p className="single-comic__descr">{language}</p>
                    <div className="single-comic__price">{price}</div>
                </div>
                <Link to="/comics" className="single-comic__back">Back to all</Link>
        </>
    )
}

export default SingleComic;