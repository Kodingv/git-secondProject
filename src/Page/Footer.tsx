import $ from 'jquery';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';



function Footer(){
  let navigate = useNavigate();
  let [footerName, setFooterName] = useState(['Map', 'Register', 'Plan']);
  let [footerIcon, setFooterIcon] = useState(["ri-map-pin-range-line", "ri-flag-line", "ri-calendar-2-line"]);
  let [url, setUrl] = useState(['/Map', '/Register', '/Plan']);
  const location = useLocation();


  useEffect(() => {
    let urlIndex = url.findIndex((element) => element == location.pathname)
    if(urlIndex != -1){
      $('li').removeClass('active');
      $('li').removeClass('circle');
      $('li').eq(urlIndex).addClass('active');
      $('li').eq(urlIndex).addClass('circle');
    } else {
      $('li').removeClass('active');
      $('li').removeClass('circle');
    }
  })

  return(
    <footer>
      <nav>
        <ul>
          {
            footerName.map((value, i) => {
              return(
                <li key={i} onClick={() => {
                  navigate(`/${footerName[i]}`);
                }}>
                  <i className={footerIcon[i]}></i>
                  <span>{value}</span>
                </li>
              )
            })
          }
        </ul>
      </nav>
    </footer>
  )
}




export {Footer}