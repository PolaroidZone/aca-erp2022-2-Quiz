import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
} from "@fortawesome/free-solid-svg-icons";

const SideNavL = () => {
  return (
    <div className="side-navL">
      <div className="side-nav-box">
        <ul className="side-socials">
          <li>
            <a href="">
              <FontAwesomeIcon icon={faYoutube} size="2x" />
            </a>
          </li>
          <li>
            <a href="">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
          </li>
          <li>
            <a href="">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
          </li>
        </ul>
      </div>
      <div className="side-nav-box">
        <div className="act-navigator">
          <div className="act-btn">
            <FontAwesomeIcon icon={faArrowAltCircleUp} size="2x" />
          </div>
          <div className="act-message">
            <h1 className="side-nav-text">SCROLL</h1>
          </div>
          <div className="act-btn">
            <FontAwesomeIcon icon={faArrowAltCircleDown} size="2x" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavL;
