import $ from 'jquery';
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { setting, DaysType, RootState } from './../store/store.ts';
import { AppDispatch } from '../index.js';


interface LocationInfoType {
  [key :string] : string | string[];
}


function Map(){
  let state = useSelector((state :RootState) => state);
  let dispatch = useDispatch<AppDispatch>();
  let [theDay, setTheDay] = useState<LocationInfoType[]>();
  let [infoArr, setInfoArr] = useState<LocationInfoType[]>();
  let [falsy, setFalsy] = useState<boolean>(true);

  useEffect(() => {
    let getItem = localStorage.getItem('place');

    if(typeof getItem === 'string'){
      let getItemTwo : DaysType = JSON.parse(getItem);
      dispatch(setting(getItemTwo));
    } else {
      return
    }
  }, [])

  useEffect(() => {
    if(theDay !== undefined){
      theDay.map((value, i) => {
        let findValue = state.flag.find(element => element.name === value.location);

        if(findValue !== undefined){
          $('.map-flag').eq(i).css('top', `${findValue.top}%`);
          $('.map-flag').eq(i).css('left', `${findValue.left}%`);
        } else {
          return
        }
      })
    } else {
      return
    }
  }, [theDay])

  useEffect(() => {
    window.scrollTo({
      top: 150,
      left: 0,
      behavior: "smooth"
    });
  },[infoArr])

  return (
    <main className="map-container">
      <h3>Map</h3>
      <div className='map-input-container'>
        <label htmlFor='input-schedule'>
          Day
          <input type="number" id='input-schedule'></input>
        </label>
        <button className='map-search-btn' onClick={(e) => {
          if(state.days === null){
            window.alert('No registered shedules.');
            e.preventDefault();
          } else if(state.days[Number($('#input-schedule').val())] === undefined){
            setFalsy(false);
            setInfoArr(undefined);
            window.alert('No registered shedules.');
          } else {
            setTheDay(state.days[Number($('#input-schedule').val())]);
            setFalsy(true);
            setInfoArr(undefined);
          }
        }}>
          <i className="ri-search-2-fill"></i>
        </button>
      </div>
      <div className="map-main-container">
        <div className='map-bg'>
          {
            theDay === undefined || falsy === false
            ? null
            : theDay.map((value, i) => {
              return(
                <span className="map-flag" key={i} onClick={() => {
                  let arr :LocationInfoType[] = [];
                  arr.push(value);
                  setInfoArr(arr);
                }}>
                  <i className="ri-flag-fill"></i>
                </span>
              )
            })
          }
        </div>
      </div>
      <div className='map-info-container'>
        {
          infoArr === undefined
          ? null
          : infoArr.map((value ,i) => {
            return(
              <div className='flag-info' key={i}>
                <h4>
                  <i className="ri-map-pin-fill"></i>
                  {value.locationName}
                </h4>
                <ul className='info-ul'>
                  <li>{`${value.time[0]} : ${value.time[1]} ~ ${value.time[2]} : ${value.time[3]}`}</li>
                  <li>{value.location}</li>
                  <li>{value.locationCategory}</li>
                  <li>Day {value.day}</li>
                </ul>
              </div>
            )
          })
        }
      </div>
    </main>
  )
}


export default Map