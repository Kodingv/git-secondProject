import { lazy, Suspense, useEffect } from 'react';
import './App.css';
import $ from 'jquery';
import { Routes, Route } from 'react-router-dom';
import {Footer} from './Page/Footer';
// import {Register} from './Page/Register';
// import {Plan} from './Page/Plan';
// import {Detail} from './Page/Detail';
// import {Map} from './Page/Map';

const Register = lazy(() => import('./Page/Register'));
const Plan = lazy(() => import('./Page/Plan'));
const Detail = lazy(() => import('./Page/Detail'));
const Map = lazy(() => import('./Page/Map'));

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

    // h2
    setTimeout(() => {
      $('.main-name > h2').css('opacity', '1');
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
      
      <Suspense fallback={ <Loading/> }>
        <Routes>
          <Route path="/" element={
            <main>
              <div className="main-container">
                <div className='main-name'>
                  <h1>
                    Travel Planner
                  </h1>
                  <h2>
                    (In JEJU)
                  </h2>
                </div>
                <div className="img-container">
                  <img className='icon' src={process.env.PUBLIC_URL + "/img/carIcon1.png"} alt='A moving car'></img>
                  <img className='icon' src={process.env.PUBLIC_URL + "/img/carIcon2.png"} alt='A moving car'></img>
                  <img className='icon' src={process.env.PUBLIC_URL + "/img/carIcon3.png"} alt='A moving car'></img>
                  <img className='icon' src={process.env.PUBLIC_URL + "/img/airplaneIcon4.png"} alt='A moving airplane'></img>
                </div>
              </div>
            </main>
          }></Route>
          <Route path="/Map" element={ <Map></Map> } />
          <Route path="/Register" element={ <Register></Register> } />
          <Route path="/Plan" element={ <Plan></Plan> } />
          <Route path="/Plan/:id" element={ <Detail></Detail> }/>
        </Routes>
      </Suspense>

      <Footer />
  
    </div>
  );
}


function Loading(){

  useEffect(() => {
    const loadingArr = $('.loading-container > h1').text().split('');
    let showText = '';
    
    loadingArr.forEach((value, i) => {
      let time = Number(String(i) + '000');
      setTimeout(() => {
        showText += value;
        $('.loading-container > h1').html(showText);
        $('.loading-container > h1').css('opacity', '1');
      }, time);
    });
  })

  return(
    <div className='loading-container'>
      <h1>Loading...</h1>
    </div>
  )
}



export default App;
