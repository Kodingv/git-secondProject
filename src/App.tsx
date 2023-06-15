import { useEffect, useState } from 'react';
import './App.css';
import $ from 'jquery';
import { Routes, Route } from 'react-router-dom';
import {Footer} from './Page/Footer';
import {Register} from './Page/Register';
import {Plan} from './Page/Plan';
import {Detail} from './Page/Detail';
import {Map} from './Page/Map';

function App() {

  useEffect(() => {
    // 1
    let xRandom = Math.floor(Math.random() * (400 - 11)) + 10;
    $('.icon').eq(0).css('top', `${xRandom}px`);
    setTimeout(() => {
      $('.icon').eq(0).css('left', '100%');
    }, 500)

    // 2
    let yRandom = Math.floor(Math.random() * (800 - 301)) + 300;
    setTimeout(() => {
      $('.icon').eq(1).css('transform', `translate(-2500px, ${yRandom}px)`);
    }, 500)

    // 3
    let xRandom2 = Math.floor(Math.random() * (650 - 401)) + 400;
    $('.icon').eq(2).css('top', `${xRandom2}px`);
    setTimeout(() => {
      $('.icon').eq(2).css('right', '100%');
    }, 500)

    // 4
    setTimeout(() => {
      $('.icon').eq(3).css('bottom', '100%');
    }, 2500)

    // h1
    setTimeout(() => {
      $('.main-name > h1').css('opacity', '1');
    }, 4800)

    // h3
    setTimeout(() => {
      $('.main-name > h3').css('opacity', '1');
    }, 5800)

  }, [])

  useEffect(() => {
    let getItem = localStorage.getItem('place')
    if(getItem === null){
      localStorage.setItem('place', JSON.stringify({}))
    } else {
      return
    }
  }, [])

  return (
    <div className="App">

      <Routes>
        <Route path="/" element={
          <>
          <main>
            <div className="main-container">
              <div className='main-name'>
                <h1>
                  Travel Planner
                </h1>
                <h3>
                  (In JEJU)
                </h3>
              </div>
              <div className="img-container">
                <img className='icon' src={process.env.PUBLIC_URL + "/img/carIcon1.png"}></img>
                <img className='icon' src={process.env.PUBLIC_URL + "/img/carIcon2.png"}></img>
                <img className='icon' src={process.env.PUBLIC_URL + "/img/carIcon3.png"}></img>
                <img className='icon' src={process.env.PUBLIC_URL + "/img/airplaneIcon4.png"}></img>
              </div>
            </div>
          </main>
          </>
        }></Route>

        <Route path="/Map" element={ <Map></Map> } />

        <Route path="/Register" element={ <Register></Register> } />

        <Route path="/Plan" element={ <Plan></Plan> } />

        <Route path="/Plan/:id" element={ <Detail></Detail> }/>
      </Routes>

      <Footer />
  
    </div>
  );
}



export default App;
