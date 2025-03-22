"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  console.log("session: ", session);
  console.log("status: ", status);

  if (status === "loading") return <p>Loading session...</p>;

  return (
    <>
      <div>

        <div className="section section-1">
          <div>
            <div className="hero-text">Unlock real-time <br/> sensor insights </div>
            <div className="sub-text"> Streamline your operations, optimize resources, <br/> and gain actionable insights with our intuitive <br/> dashboard and advanced analytics.</div>
          </div>
          <div>
            <img src="/main-unsplash.jpg" alt="Data Sense" className="main-img w-300"/>
          </div>
        </div>

          {/* 가로로 3개 요소 추가 */}
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
          <h1>Section 2</h1>
          <p>This is the second section.</p>
        </div>

        <div className="section section-3">
          <h1>Section 3</h1>
          <p>This is the third section.</p>
        </div>

      </div>
    
      {session ? (
        <>
          <h1>Welcome, {session.user.name}!</h1>
          <p>Email: {session.user.email}</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <>
          <h1>You are not signed in.</h1>
          <button onClick={() => signIn()}>Sign In</button>
        </>
      )}
    </>
  );
}
