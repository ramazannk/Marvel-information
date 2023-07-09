import AppHeader from "../appHeader/AppHeader";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {MinePage, ComicsPage, SingleComic} from '../pages';



    

const App = () => {
        return (
            <Router>
                <div className="app">
                    <AppHeader/>
                    <main>
                        <Routes>
                            <Route path="/" element={<MinePage/>}/>                                    
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route path="/comics/:comicsId" element={<SingleComic/>}/>
                        </Routes>
                    </main>
                </div>
            </Router>
        )

}

export default App;