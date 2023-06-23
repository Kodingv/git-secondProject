import $ from 'jquery';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom"
import { alignLocation, addTime, RootState, DaysType } from '../store/store.ts';
import { AppDispatch } from '../index.js';


interface LocationType {
  value : {[key :string] : string | string[]}, 
  index : number, 
  state : DaysType, 
  id : number, 
  dispatch : AppDispatch;
}


function Detail(){
  let {id} = useParams();
  let state = useSelector((state :RootState) => state.days);
  let dispatch = useDispatch<AppDispatch>();

  return(
    <main className="detail-container">
      <h3>Day {id}</h3>
      <button className="detail-saveBtn" onClick={() => {
        let timeNodes = [...$('.detail-location-time')];
        let nodes = [...$('select')];

        let timeArr :string[][] = [];

        timeNodes.map((value, i) => {
          let timeTable :string[] = [];
          nodes.map((element, k) => {
            if(k >= i * 4 && k < (i + 1) * 4){
              let select = $('select').eq(k).val();
              if(typeof select === 'string'){
                timeTable.push(select);
              }
              // timeTable.push($('select').eq(k).val())
            } else {
              return
            }
          });
          timeArr.push(timeTable);
        });

        console.log(timeArr);

        dispatch(addTime([Number(id), timeArr]));
        window.alert('Save!');
        // dispatch(redefined([id, timeArr, state.days]));
      }}>SAVE</button>
      <div className="detail-schedule-container">
        {
          state[Number(id)].map((value, i) => {
            return(
              <Location key={i} dispatch={dispatch} id={Number(id)} state={state} value={value} index={i}></Location>
            )
          })
        }
      </div>
    </main>
  )
}

// Location Component를 하나 더 만들어서
// Save 누르면 another Location Component로 state 관리

function Location({value, index, state, id, dispatch} : LocationType){
  let hourArr = new Array(24).fill(0);
  let minuteArr = new Array(12).fill(0);

  return(
    <div className="detail-location-container">
      <div className="detail-location-time">
        <select name="hour" defaultValue={
          state[id][index].time !== undefined
          ? state[id][index].time[0]
          : ''
        }>
          {
            hourArr.map((value, i) => {
              let num :string;
              if(i < 10){
                num = `0${i}`;
              } else {
                num = `${i}`;
              }

              return(
                <option key={i} value={num}>{num}</option>
              )

              // if(state[id][index].time === undefined){
              //   return(
              //     <option key={i} value={num}>{num}</option>
              //   )
              // } else {
              //   if(`${num}` === state[id][index].time[0]){
              //     return(
              //       <option key={i} value={num} selected>{num}</option>
              //     )
              //   } else {
              //     return(
              //       <option key={i} value={num}>{num}</option>
              //     )
              //   }
              // }
            })
          }
        </select>
        <span>:</span>
        <select name="minute" defaultValue={
          state[id][index].time !== undefined
          ? state[id][index].time[1]
          : ''
        }>
          {
            minuteArr.map((value, i) => {
              let num = i * 5;
              let str :string;
              if(num < 10){
                str = `0${num}`;
                return(
                  <option key={i} value={str}>{str}</option>
                )
              } else {
                return(
                  <option key={i} value={num}>{num}</option>
                )
              }

              // return(
              //   <option key={i} value={num}>{str}</option>
              // )

              // if(state[id][index].time === undefined){
              //   return(
              //     <option key={i} value={num}>{num}</option>
              //   )
              // } else {
              //   if(`${num}` === state[id][index].time[1]){
              //     return(
              //       <option key={i} value={num} selected>{num}</option>
              //     )
              //   } else {
              //     return(
              //       <option key={i} value={num}>{num}</option>
              //     )
              //   }
              // }
            })
          }
        </select>
        <span>To</span>
        <select name="hour" defaultValue={
          state[id][index].time !== undefined
          ? state[id][index].time[2]
          : ''
        }>
          {
            hourArr.map((value, i) => {
              let num :string;
              if(i < 10){
                num = `0${i}`;
              } else {
                num = `${i}`;
              }

              return(
                <option key={i} value={num}>{num}</option>
              )

              // if(state[id][index].time === undefined){
              //   return(
              //     <option key={i} value={num}>{num}</option>
              //   )
              // } else {
              //   if(`${num}` === state[id][index].time[2]){
              //     return(
              //       <option key={i} value={num} selected>{num}</option>
              //     )
              //   } else {
              //     return(
              //       <option key={i} value={num}>{num}</option>
              //     )
              //   }
              // }
            })
          }
        </select>
        <span>:</span>
        <select name="minute" defaultValue={
          state[id][index].time !== undefined
          ? state[id][index].time[3]
          : ''
        }>
          {
            minuteArr.map((value, i) => {
              let num = i * 5;
              let str :string;
              if(num < 10){
                str = `0${num}`;
                return(
                  <option key={i} value={str}>{str}</option>
                )
              } else {
                return(
                  <option key={i} value={num}>{num}</option>
                )
              }

              // if(state[id][index].time === undefined){
              //   return(
              //     <option key={i} value={num}>{num}</option>
              //   )
              // } else {
              //   if(`${num}` === state[id][index].time[3]){
              //     return(
              //       <option key={i} value={num} selected>{num}</option>
              //     )
              //   } else {
              //     return(
              //       <option key={i} value={num}>{num}</option>
              //     )
              //   }
              // }
            })
          }
        </select>
      </div>
      <div className="detail-location">
        <div><i className="ri-flag-fill"></i></div>
        <ul>
          <li>{value.location}</li>
          <li>{value.locationName}</li>
          <li>{value.locationCategory}</li>
        </ul>
        <div className='detail-updown-btn'>
          <button className='detail-up-btn' onClick={() => {
            let length = state[id].length - 1
            if(state[id][index - 1] === undefined){
              // [id, value, state[id][length]]
              dispatch(alignLocation([id, value, state[id][length]]))
            } else {
              // [id, value, state[id][index - 1]]
              dispatch(alignLocation([id, value, state[id][index - 1]]))
            }
          }}><i className="ri-arrow-up-s-line"></i></button>

          <button className='detail-down-btn' onClick={() => {
            if(state[id][index + 1] === undefined){
              dispatch(alignLocation([id, value, state[id][0]]))
            } else {
              dispatch(alignLocation([id, value, state[id][index + 1]]))
            }
          }}><i className="ri-arrow-down-s-line"></i></button>
        </div>
      </div>
    </div>
  )
}


export {Detail}