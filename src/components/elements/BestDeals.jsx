import React from 'react'
import { BestDealData } from '../../data/best_deals'

function BestDeals() {

    return <div className="best-deals">
        {
            BestDealData.map((deal) => {
                return <div className="deal">
                    <div className="deal-backdrop" style={{ backgroundImage: `url(${deal.productImage}` }}>
                        <div className="deal-percentage">
                            {deal.percentageOff}
                            <span className="light-text">Off</span>
                        </div>
                    </div>
                    <p className="deal-name">{deal.productName}</p>

                    <p className="deal-duration">{deal.dealDuration} Remaining</p>
                </div>
            })
        }
    </div>
}

export default BestDeals
