import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState, useRef} from 'react'
import axios from 'axios'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const apiKey = "9dabea59ad20e0d137f2e1f24e4548df";
  const location = "vancouver";
  const units ="metric";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${units}&appid=${apiKey}`

  const [data, setData] = useState();
  const grabWeather = useRef(true);

  const fetchWeather = async()=>{
    const response = await axios.get(url);
    console.log(response);

    console.log(response.data.list)
    const arrayOfDays = [];

    let weatherData = response.data.list.map((weather,index)=>{
      console.log(parseInt(weather.dt_txt.substr(8,2),10))
      let num = parseInt(weather.dt_txt.substr(8,2),10)

      if(num !== arrayOfDays.find(element => element === num)){
        arrayOfDays.push(num)
        console.log("here")
        console.log(response.data.list[index]);
        var month ='';
        var icon ='';

        if(weather.dt_txt.substr(5,2)==1){
          month = "January "
        }
        else if(weather.dt_txt.substr(5,2)==2){
          month = "february "
        }
        else if(weather.dt_txt.substr(5,2)==3){
          month = "march "
        }
        else if(weather.dt_txt.substr(5,2)==4){
          month = "april "
        }
        else if(weather.dt_txt.substr(5,2)==5){
          month = "may "
        }
        else if(weather.dt_txt.substr(5,2)==6){
          month = "june "
        }
        else if(weather.dt_txt.substr(5,2)==7){
          month = "july "
        }
        else if(weather.dt_txt.substr(5,2)==8){
          month = "august "
        }
        else if(weather.dt_txt.substr(5,2)==9){
          month = "september "
        }
        else if(weather.dt_txt.substr(5,2)==10){
          month = "october "
        }
        else if(weather.dt_txt.substr(5,2)==11){
          month = "november "
        }
        else if(weather.dt_txt.substr(5,2)==12){
          month = "december "
        }

        if(weather.weather[0].main=="Clouds"){
          icon ='/icons/broken-clouds.gif'
        }
        else if(weather.weather[0].main=="Clear"){
          icon ='/icons/clear-sky.gif'
        }
        else if(weather.weather[0].main=="Atmosphere"){
          icon ='/icons/mist.gif'
        }
        else if(weather.weather[0].main=="Rain"){
          icon ='/icons/rain.gif'
        }
        else if(weather.weather[0].main=="Drizzle"){
          icon ='/icons/shower-rain.gif'
        }
        else if(weather.weather[0].main=="Snow"){
          icon ='/icons/snow.gif'
        }
        else if(weather.weather[0].main=="Thunderstorm"){
          icon ='/icons/thunderstorm.gif'
        }

        var now = new Date(weather.dt_txt);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        let day= days[now.getDay()];
        
        return(
          <div key={index} className={styles.wCard}>
            <div className={styles.iCont}>
              <Image
                src={icon}
                alt={icon}
                width={180}
                height={180}
                priority
                />
            </div>
            <div className={styles.wNum}>{weather.main.temp.toFixed(1)} °C</div>
            <div className={styles.wType}>{weather.weather[0].main}</div>
          
            <p>
              {day}<br/>{month}{weather.dt_txt.substr(8,2)}, {weather.dt_txt.substr(0,4)}
            </p>
            
          </div>
        )
      }
    })
    console.log(arrayOfDays);
    setData(weatherData);
  }
  
  useEffect(()=>{
    if(grabWeather.current === true){
      fetchWeather()
    }
    return()=>{
      grabWeather.current = true;
    }
  },[]);

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`

  return (
    <>
      <Head>
        <title>Mewcast</title>
        <meta name="NyancouverMewcast" content="Weather app v2" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/meowIcon.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Vancouver BC Weather <br/>
            Last updated: {date}
          </p>
          <div>
            <a
              href="https://github.com/atran02"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* By{' '}
              ange */}
               <Image src="/meowIcon.png" alt="nyancouver meow" width={112} height={112} />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/nyancouverMewcast.svg"
            alt="Logo"
            width={454}
            height={198}
            priority
          />
        </div>

        <div className={styles.grid}>
          {data}
        </div>
      </main>
      <footer className={styles.footer}>
          <a
            href="https://github.com/atran02/"
            target="_blank"
            rel="noopener noreferrer"
          >
          {/* © */}
          <p>By Angelyne Tran</p>
          </a>
          
      </footer>
    </>
  )
}
