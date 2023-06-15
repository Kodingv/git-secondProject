
import { useEffect, useState } from 'react';
import $ from 'jquery';
import { DaysType } from '../store/store';


interface ObjType {
  [key :string] : string | string[];
}


function Register(){
  let [region] = useState(['구좌읍', '남원읍', '대정읍', '마라도', '서귀포시', '성산읍', '애월읍', '안덕면', '우도', '제주시', '조천읍', '표선면', '한경면', '한라산', '한림읍']);
  let [obj, setObj] =  useState<ObjType>();

  useEffect(() => {
    let getItem = localStorage.getItem('place');
    if(typeof getItem === 'string'){
      if(obj === undefined){
        return
      } else if(getItem === null && obj != null){
        let objData :DaysType = {};
        objData[Number(obj.day)] = [obj];
        localStorage.setItem('place', JSON.stringify(objData));
      } else if (getItem != null){
        let getItemTwo :DaysType = JSON.parse(getItem);
  
        if(getItemTwo[Number(obj.day)]){
          getItemTwo[Number(obj.day)].push(obj);
        } else {
          getItemTwo[Number(obj.day)] = [obj];
        }
  
        localStorage.setItem('place', JSON.stringify(getItemTwo));
      }
    } else {
      return
    }
  }, [obj]);

  return(
    <div className="register-container">
      <h3>Registering<br/> A <br/> Place</h3>
      <div className="register-main-container">
        <label htmlFor="placeLocation"> Place's Location
          <select id="placeLocation" defaultValue={'제주시'}>
            {
              region.map((value, i) => {
                return(
                  <option key={i} value={value}>{value}</option>
                )
              })
            }
          </select>
        </label>
        <label htmlFor="placeName">
          Place Name
          <input type="text" id="placeName"></input>
        </label>
        <label htmlFor="placeCategory">
          Place Category
          <input type="text" id="placeCategory"></input>
        </label>
        <label htmlFor='days'>
          When are you going?
          <input type='number' id="days"></input>
        </label>
        <button className="register-button" onClick={() => {
          let placeLocation = $('#placeLocation').val();
          let placeName = $('#placeName').val();
          let placeCategory = $('#placeCategory').val();
          let days = $('#days').val();
            
          // input값 검사
          if(
            typeof placeLocation === 'string'
            && typeof placeName === 'string'
            && typeof placeCategory === 'string'
            && typeof days === 'string'
          ){
            if(!/\S/.test(placeName)){
              window.alert("input the Place Name");
            }
            if(!/\S/.test(placeCategory)){
              window.alert("input the Place Category");
            } 
            if(!/[0-9]/.test(days)){
              window.alert("input the days");
            }

            // LocalStorage
            if(/\S/.test(placeLocation) && /\S/.test(placeName) && /\S/.test(placeCategory) && /[0-9]/.test(days)){
              let newObj = {
                location : placeLocation,
                locationName : placeName,
                locationCategory : placeCategory,
                day : days,
                time : ['00', '00', '00', '00']
              }
              setObj(newObj);

              window.alert("Registered! 😊")
            }
          }
        }}>Register</button>
      </div>
    </div>
  )
}





export {Register}