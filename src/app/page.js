"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  console.log("session: ", session);
  console.log("status: ", status);

  if (status === "loading") return <p>Loading session...</p>;

  return (
    <>
      <div >
        <div className="section section-1">
          <div>
            <div className="hero-text">Unlock real-time <br/> sensor insights </div>
            <div className="sub-text"> Streamline your operations, optimize resources, <br/> and gain actionable insights with our intuitive <br/> dashboard and advanced analytics.</div>
          </div>
          <div>
            <img src="/main-unsplash.jpg" alt="Data Sense" className="main-img w-300"/>
          </div>
        </div>

        <div className="section-1">
          <div className="box">
            <h2>Real-time Data Insights</h2>
            <p>Track live data: Monitor temperature, humidity, and moisture levels in real-time, visualize the data through intuitive charts, and gain valuable insights for decision-making.</p>
          </div>
          <div className="box">
            <h2>Instant Access to Key Metrics</h2>
            <p>Instantly access key data points: Simply plug in a sensor, view live measurements, and download the data for deeper analysis whenever required for optimized results.</p>
          </div>
          <div className="box">
            <h2>Smart Sensor Integration</h2>
            <p>Easily integrate sensors with Raspberry Pi, track data automatically, and enjoy a seamless, user-friendly experience that simplifies smart sensor management for efficient operations.</p>
          </div>
        </div>

        <div className="section section-2">
          <div>
            <img src="/new-oil.jpg" alt="Data Sense" className="section2-img h-170"/>
          </div>
          <div>
            <div className="hero-text">“DATA IS THE NEW OIL”   
              <span className="quote-author">Clive Humby</span>
            </div>
            <div className="author-text">   </div>
            <div className="sub-text"> Turn data into your most valuable asset, <br/> optimize operations and drive impact with actionable insights. <br/>  </div>
          </div>
        </div>
      </div>
    </>
  );
}
