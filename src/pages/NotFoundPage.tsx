import React from "react";
import PillButton from "../components/PillButton";
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
            <PillButton text="Back to Home" to="/" variant="lavender" />
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
