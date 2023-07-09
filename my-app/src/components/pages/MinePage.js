import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import { useState } from "react";
import decoration from '../../resources/img/vision.png';

export const MinePage = () => {
    const [selectedId, setSelectedId] = useState(null);

    const selectedItemId =(id)=> {
        setSelectedId(id)
    }
    return(
        <>
            <RandomChar/>
                <div className="char__content">
                    <CharList selectedItemId={selectedItemId}/>
                    <CharInfo charId={selectedId}/>
                </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}