/* eslint-disable no-unused-vars */
import React from 'react'

const Stats = () => {
    return (
        <div className="stats w-full outline-2">

            <div className="stat flex justify-between px-10">
                <div>
                    <div className="stat-title">Certificates Generated</div>
                    <div className="stat-value text-primary">2.5k</div>
                    <div className="stat-desc">21% more than last month</div>
                </div>
                <div className="stat-figure text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                </div>
            </div>

            <div className="stat flex justify-between px-10">
                <div>
                    <div className="stat-title">CO2 Prevented</div>
                    <div className="stat-value text-green-500">1.3M</div>
                    <div className="stat-desc text-green-500">17% more than last month</div>
                </div>
                <div className="stat-figure ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
            </div>

            <div className="stat flex justify-between px-10">
                <div>
                    <div className="stat-value text-secondary">86%</div>
                    <div className="stat-title">Tasks done</div>
                    <div className="stat-desc text-secondary">3 Groups Created</div>
                </div>
                <div className="stat-figure text-secondary=">
                    <div className="avatar online">
                        <div className="w-16 rounded-full">
                            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Stats