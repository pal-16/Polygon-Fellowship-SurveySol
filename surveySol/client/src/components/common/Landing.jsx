import { Link } from 'react-router-dom'

import banner from "./assets/banner.svg"
import features from "./assets/features.svg"

function Landing() {
  return <div>
    <div className="section">
      <img src={banner} alt="banner" />
      <div className="content">
        <h1>  <span>Incentivize</span> form based data collection </h1>


        <p>A portal which allows users to create surveys with specific requirements (in terms of user criteria like age, experience, skills, etc.), and users matching the criteria will be able to fill the survey in return for benefits in terms of tokens.
        </p>
        <Link to="/create" className="btn">get started</Link>
      </div>
    </div>
    <div className="section">
      <div className="content">
        <h1>Why choose us</h1>
        <p>
          <span className="li"> Verified Profiling of Users</span>
          <span className="li">Get rewards for filling surveys</span>
          <span className="li">Authentic Data assurance</span>
          <span className="li">Create Surveys </span>
        </p>
      </div>
      <img src={features} alt="features" />
    </div>
  </div>
}

export default Landing