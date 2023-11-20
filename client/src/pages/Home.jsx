import React from "react";
import { BsCheckAll } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import AIRobot from "../assets/airobot.png";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="homepage-container">
      <div className="card" style={{ width: "80%", marginTop: "50px" }}>
        <div className="home-details">
          <div className="home-intro">
            <h4>There are many benefits of having AI Chatbot</h4>
            <ul>
              <li>
                <div>
                  <BsCheckAll />
                </div>
                <p>
                  Answer customer inquiries immediately (and help customers
                  right away),
                </p>
              </li>
              <li>
                <div>
                  <BsCheckAll />
                </div>
                <p>Respond to requests 24/7,</p>
              </li>
              <li>
                <div>
                  <BsCheckAll />
                </div>
                <p>Resolve complaints very fast,</p>
              </li>
              <li>
                <div>
                  <BsCheckAll />
                </div>
                <p>
                  help customers through digital processes, such as a payment or
                  making a reservation, and
                </p>
              </li>
              <li>
                <div>
                  <BsCheckAll />
                </div>
                <p>
                  reduce the work load of your service team, which, in turn,
                  will have more time to focus on more complex queries.
                </p>
              </li>
            </ul>
            <h4>Chatbots also can also improve your business' bottom line.</h4>
            <ul>
              <li>
                <div>
                  <BsCheckAll />
                </div>
                <p>
                  Business leaders say that chatbots have increased sales on
                  average by 67%.
                </p>
              </li>
              <li>
                <div>
                  <BsCheckAll />
                </div>
                <p>
                  In a recent survey, 57% of businesses said that chatbots
                  deliver large ROI for minimal effort.
                </p>
              </li>
              <li>
                <div>
                  <BsCheckAll />
                </div>
                <p>
                  An industry report by the Massachusetts Institute of
                  Technology has found that 90% of businesses have recorded
                  measurable improvements in the speed of complaint resolution,
                  and 80% of companies noted a larger call volume processing
                  through chatbots.
                </p>
              </li>
              <li>
                <div>
                  <BsCheckAll />
                </div>
                <p>
                  Chatbots can reduce customer support costs by 30% (they can
                  answer faster, and they free up agents).
                </p>
              </li>
              <br />
              <li>
                <p>
                  It's therefore not surprising that the chatbot market is
                  booming. While the market size for chatbots in 2016 reached
                  190.8 million US dollars, it's estimated to reach 1.2 billion
                  US dollars in 2025.
                </p>
              </li>
            </ul>
            <button onClick={() => navigate("/chat")}>Go to Chat</button>
          </div>
          <div className="home-banner">
            <img src={AIRobot} alt="banner" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
