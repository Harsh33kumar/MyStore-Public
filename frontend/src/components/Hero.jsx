import React from 'react'

function Hero(heroData, heroCount, setHeroCount) {
  return (
    <div className='ms-hero'>
        <div className="ms-hero-sub-1">
            <p>{heroData.text1}</p>
            <p>{heroData.text2}</p>

        </div>
        <div>
            
        </div>

    </div>
  )
}

export default Hero