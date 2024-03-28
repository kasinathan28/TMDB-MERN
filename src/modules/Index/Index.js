import React from 'react'
import "./Index.css"
import Navbar from '../../components/Navbar/Navbar'

import wave from "../../assets/wave2.png";
import bg from "../../assets/bg.png";
import democard from "../../assets/democard.png";


function Index() {
  return (
    <div className='index'>
        <Navbar/>
        <div className='main'>
          <img src={bg} alt='bg' className='bgimg'/>
          <div className='message'>
          <h1>Welcome</h1>
          <h2>Millions of Movies , TV Shows and People To Discover.</h2>
          </div>
          <div className='search'>
            <input type='text' id='search'/>
            <button>Search</button>
          </div>
          <div>
          <img src={wave} alt='wave'  className='wave'/>
          </div>
        </div>


        <div className='trend'>
          <div className='label'>
            <h2>Trending:</h2>
           <ul>
            <li>!</li>
            <li>!</li>
            <li>!</li>
           </ul>
          </div>
        </div>
        
        <div className='cardctn'>
          <div className='cardctnbg'>
          <img src={wave} alt='wave'/>
          </div>
            <div className='card'>
              <img src={democard} alt='cardimg' />
              <div className='desc'>
                <p>askdjh</p>
                <p>askdjh</p>
              </div>
            </div>
            
            <div className='card'>
              <img src={democard} alt='cardimg' />
            </div>
            
            <div className='card'>
              <img src={democard} alt='cardimg' />
            </div>
            
            <div className='card'>
              <img src={democard} alt='cardimg' />
            </div>
            
            <div className='card'>
              <img src={democard} alt='cardimg' />
            </div>
            
            <div className='card'>
              <img src={democard} alt='cardimg' />
            </div>
            
            <div className='card'>
              <img src={democard} alt='cardimg' />
            </div>
            
            <div className='card'>
              <img src={democard} alt='cardimg' />
            </div>
            
            <div className='card'>
              <img src={democard} alt='cardimg' />
            </div>
            
            <div className='card'>
              <img src={democard} alt='cardimg' />
            </div>
            
          </div>
    </div>
  )
}

export default Index