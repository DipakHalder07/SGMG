import React, { useState, useId } from "react";
import "../emi-calculator.css";

// Utility for Indian currency formatting (e.g. ₹60,829, ₹80,00,000)
function formatIndianCurrency(amount: number): string {
  return "₹" + Math.round(amount).toLocaleString("en-IN");
}

// Display format for loan amount (e.g. ₹80 Lacs, ₹1.5 Cr)
function formatLoanAmountDisplay(amount: number): string {
  if (amount >= 10000000) {
    const cr = amount / 10000000;
    const formatted = cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2);
    return `₹${formatted} Cr`;
  } else {
    const lacs = amount / 100000;
    const formatted = lacs % 1 === 0 ? lacs.toFixed(0) : lacs.toFixed(2);
    return `₹${formatted} ${lacs === 1 ? "Lac" : "Lacs"}`;
  }
}

export default function EmiCalculator() {
  const loanAmountId = useId();
  const interestRateId = useId();
  const loanTenureId = useId();

  // User Default Values:
  // Loan Amount: ₹80 Lacs (min: ₹1 Lac, max: ₹13 Cr)
  // Interest Rate: 6.75% (min: 1%, max: 30%)
  // Loan Tenure: 20 Years (min: 1 Year, max: 30 Years)
  const [loanAmount, setLoanAmount] = useState<number>(8000000);
  const [interestRate, setInterestRate] = useState<number>(6.75);
  const [loanTenure, setLoanTenure] = useState<number>(20);

  const MIN_LOAN = 100000; // ₹1 Lac
  const MAX_LOAN = 130000000; // ₹13 Cr
  const STEP_LOAN = 100000; // ₹1 Lac

  const MIN_RATE = 1.0;
  const MAX_RATE = 30.0;
  const STEP_RATE = 0.05;

  const MIN_TENURE = 1;
  const MAX_TENURE = 30;
  const STEP_TENURE = 1;

  // Monthly EMI Calculation
  const n = loanTenure * 12;
  const r = interestRate / 1200;

  const monthlyEmi =
    interestRate > 0
      ? Math.round(
          (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
        )
      : Math.round(loanAmount / n);

  const totalPayable =
    interestRate > 0
      ? Math.round(
          ((loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)) * n
        )
      : loanAmount;

  const interestAmount = Math.max(0, totalPayable - loanAmount);

  // Black slider track fill helper
  const getTrackFill = (val: number, min: number, max: number) => {
    const pct = Math.max(0, Math.min(100, ((val - min) / (max - min)) * 100));
    return `linear-gradient(to right, #000000 ${pct}%, #dcdcdc ${pct}%)`;
  };

  // Semi-circular Arc Math
  const cx = 220;
  const cy = 200;
  const radius = 155;

  // Fraction of Principal vs Total Payable
  const principalFraction = Math.max(
    0.04,
    Math.min(0.96, loanAmount / (totalPayable || 1))
  );

  // Angle from 180° to 0°
  const splitAngle = Math.PI * (1 - principalFraction);

  const splitX = cx + radius * Math.cos(splitAngle);
  const splitY = cy - radius * Math.sin(splitAngle);

  // Principal Arc: from (cx - radius, cy) to (splitX, splitY)
  const principalArcPath = `M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${splitX.toFixed(2)} ${splitY.toFixed(2)}`;

  // Interest Arc: from (splitX, splitY) to (cx + radius, cy)
  const interestArcPath = `M ${splitX.toFixed(2)} ${splitY.toFixed(2)} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`;

  return (
    <section className="pets emi_section" data-section="light" id="emi-calculator">
      <div className="wrapper_pets emi_container">
        {/* Main Title */}
        <h2 className="emi_calc_main_title">EMI Calculator</h2>

        <div className="emi_calc_row">
          {/* Left Column: Sliders */}
          <div className="emi_calc_sliders_col">
            {/* 1. Loan Amount */}
            <div className="emi_slider_group">
              <div className="emi_slider_top">
                <label htmlFor={loanAmountId} className="emi_slider_label">Loan Amount</label>
                <span className="emi_slider_value">
                  {formatLoanAmountDisplay(loanAmount)}
                </span>
              </div>
              <div className="emi_slider_track_wrap">
                <input
                  id={loanAmountId}
                  type="range"
                  min={MIN_LOAN}
                  max={MAX_LOAN}
                  step={STEP_LOAN}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="emi_range_input"
                  style={{
                    background: getTrackFill(loanAmount, MIN_LOAN, MAX_LOAN),
                  }}
                  aria-label="Loan Amount Slider"
                />
              </div>
              <div className="emi_slider_bottom">
                <span>₹1 Lac</span>
                <span>₹13 Cr</span>
              </div>
            </div>

            {/* 2. Interest Rate (% P. A.) */}
            <div className="emi_slider_group">
              <div className="emi_slider_top">
                <label htmlFor={interestRateId} className="emi_slider_label">Interest Rate (% P. A.)</label>
                <span className="emi_slider_value">
                  {interestRate.toFixed(2)}%
                </span>
              </div>
              <div className="emi_slider_track_wrap">
                <input
                  id={interestRateId}
                  type="range"
                  min={MIN_RATE}
                  max={MAX_RATE}
                  step={STEP_RATE}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="emi_range_input"
                  style={{
                    background: getTrackFill(interestRate, MIN_RATE, MAX_RATE),
                  }}
                  aria-label="Interest Rate Slider"
                />
              </div>
              <div className="emi_slider_bottom">
                <span>1%</span>
                <span>30%</span>
              </div>
            </div>

            {/* 3. Loan Tenure */}
            <div className="emi_slider_group">
              <div className="emi_slider_top">
                <label htmlFor={loanTenureId} className="emi_slider_label">Loan Tenure</label>
                <span className="emi_slider_value">
                  {loanTenure} {loanTenure === 1 ? "Year" : "Years"}
                </span>
              </div>
              <div className="emi_slider_track_wrap">
                <input
                  id={loanTenureId}
                  type="range"
                  min={MIN_TENURE}
                  max={MAX_TENURE}
                  step={STEP_TENURE}
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(Number(e.target.value))}
                  className="emi_range_input"
                  style={{
                    background: getTrackFill(loanTenure, MIN_TENURE, MAX_TENURE),
                  }}
                  aria-label="Loan Tenure Slider"
                />
              </div>
              <div className="emi_slider_bottom">
                <span>1 Year</span>
                <span>30 Years</span>
              </div>
            </div>
          </div>

          {/* Right Column: Arc Gauge & Results */}
          <div className="emi_calc_results_col">
            <div className="emi_gauge_wrap">
              <svg
                viewBox="0 0 440 220"
                className="emi_gauge_svg"
                aria-hidden="true"
              >
                {/* Interest Arc (SGMG Logo Green) */}
                <path
                  d={interestArcPath}
                  fill="none"
                  stroke="#8eb826"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Principal Arc (SGMG Primary Blue) */}
                <path
                  d={principalArcPath}
                  fill="none"
                  stroke="#2391cf"
                  strokeWidth="11"
                  strokeLinecap="round"
                />

                {/* Center Text inside Arc */}
                <text
                  x={cx}
                  y={cy - 68}
                  textAnchor="middle"
                  fill="#555555"
                  fontSize="17"
                  fontWeight="400"
                  fontFamily="system-ui, -apple-system, sans-serif"
                >
                  Your Monthly Home EMI
                </text>
                <text
                  x={cx}
                  y={cy - 14}
                  textAnchor="middle"
                  fill="#1a1a1a"
                  fontSize="38"
                  fontWeight="700"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  letterSpacing="-0.5"
                >
                  {formatIndianCurrency(monthlyEmi)}
                </text>
              </svg>
            </div>

            {/* Bottom 3 Summary Values */}
            <div className="emi_bottom_values_row">
              <div className="emi_val_item text-left">
                <span className="emi_val_label">
                  <span className="emi_legend_dot dot-interest" aria-hidden="true" />
                  Interest Amount
                </span>
                <span className="emi_val_number color-interest">
                  {formatIndianCurrency(interestAmount)}
                </span>
              </div>

              <div className="emi_val_item text-center">
                <span className="emi_val_label">
                  <span className="emi_legend_dot dot-principal" aria-hidden="true" />
                  Principal Amount
                </span>
                <span className="emi_val_number color-principal">
                  {formatIndianCurrency(loanAmount)}
                </span>
              </div>

              <div className="emi_val_item text-right">
                <span className="emi_val_label">
                  <span className="emi_legend_dot dot-total" aria-hidden="true" />
                  Total Payable Amount
                </span>
                <span className="emi_val_number color-total">
                  {formatIndianCurrency(totalPayable)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
