
import $ from 'jquery';
import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDay, removeDay, RootState, DaysType } from '../store/store.ts';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AppDispatch } from './../index.js';


interface ClickType {
  [key :string] : string | string[];
}

interface InputDaysType {
  setInputDays : Dispatch<SetStateAction<number[]>>, 
  dispatch : AppDispatch;
}

interface PlanLiType {
  index : number,
  state : DaysType, 
  click : (boolean | ClickType)[], 
  setClick : Dispatch<SetStateAction<(boolean | ClickType)[]>>, 
  delArr : ClickType[], 
  setDelArr : Dispatch<SetStateAction<ClickType[]>>, 
  navigate : NavigateFunction;
}


function Plan(){
  let navigate = useNavigate();
  const state = useSelector((state :RootState) => state.days)
  let dispatch = useDispatch<AppDispatch>()
  // console.log(state);
  let [inputDays, setInputDays] = useState<number[]>(Array)
  let [delArr, setDelArr] = useState<ClickType[]>(Array)
  let [click, setClick] = useState<(boolean | ClickType)[]>(Array)
  let [reset, setReset] = useState(false)

  useEffect(() => {
    inputDays.map((value, i) => {
      if(state[i + 1] == undefined){
        return
      } else if(state[i + 1].length > 4){
        $('.plan-li-category').eq(i).css('grid-template-columns', `repeat(5, 1fr)`);
      } else {
        $('.plan-li-category').eq(i).css('grid-template-columns', `repeat(${state[i + 1].length}, 1fr)`);
      }
    })
  }, [inputDays, state])

  useEffect(() => {
    if(inputDays.length == 0){
      $('.deleteDay-btn').css('opacity', '0');
      $('.reset-btn').css('opacity', '0');
    } else {
      $('.deleteDay-btn').css('opacity', '1');
      $('.reset-btn').css('opacity', '1');
      $('.days-container').css('display', 'none');
    }
  }, [inputDays])

  useEffect(() => {
    let copy = [...click];
    let copyObj = {...state};
    for(var key in copyObj){
      copy = [...copy, ...copyObj[key]]
    }
    copy = Array(copy.length).fill(false);
    setClick(copy);
  }, [inputDays, state])

  useEffect(() => {
    click.map((value, i) => {
      if(value){
        $('.category-unit').eq(i).css('border', '2px solid var(--second-sun-color');
      } else {
        $('.category-unit').eq(i).css('border', 'none');
      }
    });
  }, [click])

  useEffect(() => {
    $('.category-unit').css('border', 'none');
  }, [reset])

  return(
    <div className="plan-container">
      {/* <button className="reset-btn" onClick={() => {
        dispatch(AllReset());
        window.location.reload();
      }}><i className="ri-refresh-line"></i></button> */}
      <h3>My Plan</h3>
      <div className="deleteDay-btn" onClick={() => {
        dispatch(removeDay(delArr));
        setReset(!reset);
      }}>
        <i className="ri-delete-bin-2-fill"></i>
      </div>
      <div className="plan-main-container">
        <InputDays setInputDays={setInputDays} dispatch={dispatch}/>

        <ul>
          {
            inputDays.map((value, i) => {
              return(
                <PlanLi key={i} navigate={navigate} delArr={delArr} setDelArr={setDelArr} setClick={setClick} click={click} index={i} state={state} />
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}


function InputDays({setInputDays, dispatch} : InputDaysType){
  return (
    <div className="days-container">
      <label htmlFor="input-days">
        The 
        <input type="number" id="input-days"></input>
        day trip
      </label>
      <button className="confirm-button" onClick={(e) => {
        if($('#input-days').val() === ''){
          window.alert('input a day plz');
          e.preventDefault();
        } else {
          let inputValue = $('#input-days').val();
          if(typeof inputValue === 'string'){
            inputValue = parseFloat(inputValue);
            setInputDays(Array(inputValue).fill(0));
          } else {
            return
          }
          // inputValue = parseFloat(inputValue);
          // setInputDays(Array(inputValue).fill(0));

          dispatch(addDay());
          $('.days-container').css('opacity', '0');
          $('.plan-main-container ul').css('opacity', '1');
        }
      }}>Confirm</button>
    </div>        
  )
}

function PlanLi({index, state, click, setClick, delArr, setDelArr, navigate} : PlanLiType){
  return(
    <li>
      <h4 onClick={function(e){
        let date = $(e.currentTarget).siblings('.plan-li-category').text();
        if(date === '일정이 없습니다'){
          e.preventDefault();
          window.alert('None Schedule');
        } else {
          navigate(`/Plan/${index + 1}`);
        }
      }}>Day {index + 1}</h4>

      <div className="plan-li-category">
        {
          state[index + 1] == undefined || state[index + 1].length == 0
          ? <span>일정이 없습니다</span> 
          : state[index + 1].map((value, i) => {
            return(
              <span className='category-unit' key={i} onClick={(e) => {
                e.stopPropagation();
                let nodes = [...$('.category-unit')]
                let targetIndex = nodes.indexOf(e.currentTarget);
                let copy = [...click];
                copy[targetIndex] = !copy[targetIndex];
                setClick(copy);

                let copyDel = [...delArr];
                if(copy[targetIndex] == true){
                  copyDel.push(value);
                } else {
                  let findIndex = copyDel.findIndex(element => element == value);
                  copyDel.splice(findIndex, 1); 
                }
                setDelArr(copyDel);
              }}>
                {value.locationCategory}
              </span>
            )
          })
        }
      </div>
      <i className="ri-arrow-down-circle-fill"></i>
    </li>
  )
}



export {Plan}