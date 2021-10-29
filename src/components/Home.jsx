import React from 'react'
import Banner from './elements/Banner'
import BestDeals from './elements/BestDeals'
import Menus from './elements/Menus'
import SpecialOfTheDay from './elements/SpecialOfTheDay'

function Home() {
    return <div className="unpaded">
        <Banner />
        <div className="content">
            <BestDeals />
            <SpecialOfTheDay />
            <Menus />
        </div>
    </div>
}
export default Home
