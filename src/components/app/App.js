import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import AppBanner from '../appBanner/AppBanner';

import Spinner from "../spinner/Spinner";
import decoration from '../../resources/img/vision.png';

const Page404 = lazy(() => import("../404.js/404"));
const ComicsList = lazy(() => import("../comicsList/ComicsList"));
const CharList = lazy(() => import("../charList/CharList"));
const SingleComic = lazy(() => import("../singleComic/SingleComic"));

const App = () =>  {

    const [charId, setCharId] = useState(null);

    const updateChar = (id) => {
        setCharId(id)
    }

    return (
        <Router>
            <div className="app">   
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}> 
                        <Routes> 
                            <Route path="/" element={ 
                                <>
                                    <RandomChar/>
                                    <div className="char__content">
                                        <ErrorBoundary>
                                            <CharList charId={charId} updateChar={updateChar}/>
                                        </ErrorBoundary>
                                        
                                        <CharInfo charId={charId}/>
                                    </div>
                                    <img className="bg-decoration" src={decoration} alt="vision"/>

                                </>
                                
                            }/>

                            <Route path="/comics" element={
                                <>
                                    <AppBanner/>
                                    <ComicsList/>
                                    
                                </>
                            }/>

                            <Route path="/comics/:comicId" element={<SingleComic/>}/>

                            <Route path="*" element={<Page404/>} />
                            
                        </Routes> 
                    </Suspense>
                </main>          
            </div>
        </Router>
       
    )

}

export default App;