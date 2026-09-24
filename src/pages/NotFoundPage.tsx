import React from "react";
import { Link } from "react-router-dom";
import { ArrowIcon } from "../components/Header";
import EndlessStairsGame from "../components/EndlessStairsGame";
import "../not-found.css";

export default function NotFoundPage() {
  return (
    <section className="_404_page">
      <div className="wrapper_404">
        {/* Left Side: Headline & Back to Home Action */}
        <div className="heading_back">
          <h1 className="_404_heading">
            You’re not supposed
            <br />
            to be here
          </h1>

          <div className="_404_btn">
            <Link to="/" className="button w-inline-block" aria-label="Back to Home">
              <div className="icon_box is-left">
                <div className="arrow_icon">
                  <ArrowIcon fill="#121214" />
                </div>
              </div>
              <div className="text_box">
                <div>Back to Home</div>
              </div>
              <div className="icon_box is-right">
                <div className="arrow_icon">
                  <ArrowIcon fill="#121214" />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Right Side: Interactive Endless Stairs Canvas Mini-Game */}
        <div className="game_middle">
          <div className="game_window">
            <EndlessStairsGame />
          </div>
        </div>
      </div>
    </section>
  );
}
