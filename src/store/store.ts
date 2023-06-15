import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { act } from 'react-dom/test-utils'

export interface DaysType {
  [key: number] : { [key: string] : string | string[] }[];
}

const daysValue : DaysType = {};

// { 
//   1 : [{}, {}],
//   2 : [{}, {}]
// }

let days = createSlice({
  name : 'days',
  initialState : daysValue,
  reducers : {
    addDay(state){
      let getItem = localStorage.getItem('place')
      if(typeof getItem === 'string'){
        let getItemTwo :DaysType = JSON.parse(getItem)
        return state = {...getItemTwo}
      } else {
        return
      }
      // getItem = JSON.parse(getItem)
      // return state = {...getItem}
    },

    removeDay(state, action :PayloadAction<{ [key: string] : string | string[] }[]>){
      let getItem = localStorage.getItem('place')

      if(typeof getItem === 'string'){
        let getItemTwo :DaysType = JSON.parse(getItem)


        for(const key in getItemTwo){
          action.payload.map((value, i) => {
            let index = getItemTwo[key].findIndex(element => {
              return element.location == value.location &&
              element.locationName == value.locationName &&
              element.locationCategory == value.locationCategory &&
              element.day == value.day
            });

            if(index != -1){
              getItemTwo[key].splice(index, 1);
            }
          })
        }

        localStorage.setItem('place', JSON.stringify(getItemTwo))
      }

      // let getItem = localStorage.getItem('place')
      // getItem = JSON.parse(getItem)


      // for(const key in getItem){
      //   action.payload.map((value, i) => {
      //     let index = getItem[key].findIndex(element => {
      //       return element.location == value.location &&
      //       element.locationName == value.locationName &&
      //       element.locationCategory == value.locationCategory &&
      //       element.day == value.day
      //     });

      //     if(index != -1){
      //       getItem[key].splice(index, 1);
      //     }
      //   })
      // }

      for(const key in state){
        action.payload.map((value, i) => {
          let index = state[key].findIndex(element => {
            return element.location == value.location &&
            element.locationName == value.locationName &&
            element.locationCategory == value.locationCategory &&
            element.day == value.day
          });

          if(index != -1){
            state[key].splice(index, 1);
          }
        })
      }
    },

    alignLocation(state, action :PayloadAction<[number, {[key :string] : string | string[]}, {[key :string] : string | string[]}]>){
      let [id, clickValue, replaceValue] = [...action.payload];
      let firstIndex = state[id].findIndex(element => {
        return element.location == replaceValue.location &&
        element.locationName == replaceValue.locationName &&
        element.locationCategory == replaceValue.locationCategory &&
        element.day == replaceValue.day
      });
      let lastIndex = state[id].findIndex(element => {
        return element.location == clickValue.location &&
        element.locationName == clickValue.locationName &&
        element.locationCategory == clickValue.locationCategory &&
        element.day == clickValue.day
      })
      state[id][firstIndex] = clickValue;
      state[id][lastIndex] = replaceValue;
    },

    addTime(state, action :PayloadAction<[number, string[][]]>){
      let [id, timeArr] = [...action.payload];
      state[id].map((value, i) => {
        value['time'] = timeArr[i]
      });

      localStorage.removeItem('place');
      localStorage.setItem('place', JSON.stringify(state));
    },

    setting(state, action :PayloadAction<DaysType>){
      return state = action.payload
    },
  }
});

type FlagType = {
  name : string,
  top : number,
  left : number
}[];

const flagValue :FlagType = [
  {
    name : '한경면',
    top : 55,
    left : 13
  },
  {
    name : '한림읍',
    top : 45,
    left : 19
  },
  {
    name : '애월읍',
    top : 38,
    left : 30
  },
  {
    name : '제주시',
    top : 28,
    left : 45
  },
  {
    name : '조천읍',
    top : 25,
    left : 62
  },
  {
    name : '구좌읍',
    top : 23,
    left : 75
  },
  {
    name : '우도',
    top : 20,
    left : 93
  },
  {
    name : '성산읍',
    top : 38,
    left : 83
  },
  {
    name : '표선면',
    top : 47,
    left : 73
  },
  {
    name : '남원읍',
    top : 58,
    left : 58
  },
  {
    name : '서귀포시',
    top : 62,
    left : 38
  },
  {
    name : '안덕면',
    top : 58,
    left : 25
  },
  {
    name : '대정읍',
    top : 68,
    left : 15
  },
  {
    name : '마라도',
    top : 92,
    left : 19
  },
  {
    name : '한라산',
    top : 37,
    left : 52
  }
];

let flag = createSlice({
  name : 'flag',
  initialState : flagValue,
  reducers : {}
})

export let { addDay, removeDay, alignLocation, addTime, setting } = days.actions

export let store = configureStore({
  reducer: {
    days : days.reducer,
    flag : flag.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
