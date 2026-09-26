import React, { useState, useId } from "react";
import "../emi-calculator.css";

// Utility for Indian currency formatting (e.g. ₹60,829, ₹80,00,000)
function formatIndianCurrency(amount: number): string {
  return "₹" + Math.round(amount).toLocaleString("en-IN");
}

// Display format for loan amount badge
function formatLoanAmountBadge(amount: number): string {
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

  // State defaults as specified by user:
  // Loan Amount: ₹80 Lacs (min: ₹1 Lac, max: ₹13 Cr)
  // Interest Rate: 6.75% (min: 1%, max: 30%)
  // Tenure: 20 Years (min: 1 Year, max: 30 Years)
  const [loanAmount, setLoanAmount] = useState<number>(8000000);
  const [interestRate, setInterestRate] = useState<number>(6.75);
  const [loanTenure, setLoanTenure] = useState<number>(20);

  // Constants
  const MIN_LOAN = 100000; // ₹1 Lac
  const MAX_LOAN = 130000000; // ₹13 Cr
  const STEP_LOAN = 100000; // ₹1 Lac step

  const MIN_RATE = 1.0;
  const MAX_RATE = 30.0;
  const STEP_RATE = 0.05;

  const MIN_TENURE = 1;
  const MAX_TENURE = 30;
  const STEP_TENURE = 1;

  // Calculation
  const n = loanTenure * 12;
  const r = interestRate / 1200;

  // Monthly EMI
  const monthlyEmi =
    interestRate > 0
      ? Math.round(
          (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
        )
      : Math.round(loanAmount / n);

  // Exact Total Payable
  const totalPayable =
    interestRate > 0
      ? Math.round(
          ((loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)) * n
        )
      : loanAmount;

  // Interest Amount
  const interestAmount = Math.max(0, totalPayable - loanAmount);

  // Breakdown Percentages
  const principalPct =
    totalPayable > 0 ? (loanAmount / totalPayable) * 100 : 100;
  const interestPct = totalPayable > 0 ? 100 - principalPct : 0;

  // SVG Donut properties (r = 45, circumference ~ 282.74)
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const principalStrokeDash = (principalPct / 100) * circumference;

  // Dynamic slider track fill helper
  const getSliderBackground = (val: number, min: number, max: number) => {
    const pct = ((val - min) / (max - min)) * 100;
    return `linear-gradient(to right, #2391cf ${pct}%, #e2e8f0 ${pct}%)`;
  };

  return (
    <section className="emi_calculator_section" id="emi-calculator" data-section="light">
      <div className="emi_calc_container">
        {/* Header */}
        <div className="emi_calc_header">
          <div className="emi_calc_badge">
            <span>SGMG Financial Suite</span>
          </div>
          <h2 className="emi_calc_heading">EMI Calculator</h2>
          <p className="emi_calc_subheading">
            Estimate your monthly home loan installments, total interest, and complete repayment schedule with full transparency.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="emi_calc_grid">
          {/* Controls Column */}
          <div className="emi_calc_controls_card">
            {/* 1. Loan Amount */}
            <div className="emi_calc_group">
              <div className="emi_calc_group_header">
                <label htmlFor={loanAmountId} className="emi_calc_label">Loan Amount</label>
                <div className="emi_calc_value_badge">
                  {formatLoanAmountBadge(loanAmount)}
                </div>
              </div>
              <div className="emi_calc_slider_wrap">
                <input
                  id={loanAmountId}
                  type="range"
                  min={MIN_LOAN}
                  max={MAX_LOAN}
                  step={STEP_LOAN}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="emi_calc_slider"
                  style={{
                    background: getSliderBackground(loanAmount, MIN_LOAN, MAX_LOAN),
                  }}
                  aria-label="Loan Amount Slider"
                />
              </div>
              <div className="emi_calc_scale">
                <span>₹1 Lac</span>
                <span>₹13 Cr</span>
              </div>
              {/* Presets */}
              <div className="emi_calc_chips">
                {[2500000, 5000000, 8000000, 10000000, 20000000, 50000000].map(
                  (preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setLoanAmount(preset)}
                      className={`emi_calc_chip ${
                        loanAmount === preset ? "is-active" : ""
                      }`}
                    >
                      {formatLoanAmountBadge(preset)}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* 2. Interest Rate (% P. A.) */}
            <div className="emi_calc_group">
              <div className="emi_calc_group_header">
                <label htmlFor={interestRateId} className="emi_calc_label">Interest Rate (% P. A.)</label>
                <div className="emi_calc_value_badge">
                  {interestRate.toFixed(2)}%
                </div>
              </div>
              <div className="emi_calc_slider_wrap">
                <input
                  id={interestRateId}
                  type="range"
                  min={MIN_RATE}
                  max={MAX_RATE}
                  step={STEP_RATE}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="emi_calc_slider"
                  style={{
                    background: getSliderBackground(interestRate, MIN_RATE, MAX_RATE),
                  }}
                  aria-label="Interest Rate Slider"
                />
              </div>
              <div className="emi_calc_scale">
                <span>1%</span>
                <span>30%</span>
              </div>
              {/* Presets */}
              <div className="emi_calc_chips">
                {[6.75, 7.5, 8.25, 9.0, 10.5].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => setInterestRate(rate)}
                    className={`emi_calc_chip ${
                      interestRate === rate ? "is-active" : ""
                    }`}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Loan Tenure */}
            <div className="emi_calc_group">
              <div className="emi_calc_group_header">
                <label htmlFor={loanTenureId} className="emi_calc_label">Loan Tenure</label>
                <div className="emi_calc_value_badge">
                  {loanTenure} {loanTenure === 1 ? "Year" : "Years"}
                </div>
              </div>
              <div className="emi_calc_slider_wrap">
                <input
                  id={loanTenureId}
                  type="range"
                  min={MIN_TENURE}
                  max={MAX_TENURE}
                  step={STEP_TENURE}
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(Number(e.target.value))}
                  className="emi_calc_slider"
                  style={{
                    background: getSliderBackground(loanTenure, MIN_TENURE, MAX_TENURE),
                  }}
                  aria-label="Loan Tenure Slider"
                />
              </div>
              <div className="emi_calc_scale">
                <span>1 Year</span>
                <span>30 Years</span>
              </div>
              {/* Presets */}
              <div className="emi_calc_chips">
                {[5, 10, 15, 20, 25, 30].map((tenure) => (
                  <button
                    key={tenure}
                    type="button"
                    onClick={() => setLoanTenure(tenure)}
                    className={`emi_calc_chip ${
                      loanTenure === tenure ? "is-active" : ""
                    }`}
                  >
                    {tenure} Yrs
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="emi_calc_summary_card">
            {/* Featured EMI Box */}
            <div className="emi_calc_featured_box">
              <div className="emi_calc_featured_title">Your Monthly Home EMI</div>
              <div className="emi_calc_featured_value">
                {formatIndianCurrency(monthlyEmi)}
              </div>
              <div className="emi_calc_featured_subtitle">
                Estimated repayment per month
              </div>
            </div>

            {/* Donut Chart Visual Breakdown */}
            <div className="emi_calc_chart_container">
              <div className="emi_calc_donut_wrap">
                <svg viewBox="0 0 100 100" className="emi_calc_donut_svg">
                  {/* Background Track (Interest color) */}
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="transparent"
                    stroke="#a2cd3a"
                    strokeWidth="10"
                  />
                  {/* Foreground Arc (Principal color) */}
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="transparent"
                    stroke="#2391cf"
                    strokeWidth="10"
                    strokeDasharray={`${principalStrokeDash} ${circumference}`}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dasharray 0.3s ease" }}
                  />
                </svg>
                <div className="emi_calc_donut_center">
                  <div className="emi_calc_donut_center_label">Total</div>
                  <div className="emi_calc_donut_center_val">
                    {formatLoanAmountBadge(totalPayable)}
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="emi_calc_chart_legend">
                <div className="emi_calc_legend_item">
                  <span className="emi_calc_legend_dot is-principal"></span>
                  <span>Principal Amount</span>
                  <span className="emi_calc_legend_pct">
                    {principalPct.toFixed(1)}%
                  </span>
                </div>
                <div className="emi_calc_legend_item">
                  <span className="emi_calc_legend_dot is-interest"></span>
                  <span>Interest Amount</span>
                  <span className="emi_calc_legend_pct">
                    {interestPct.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Detailed Numerical Summary */}
            <div className="emi_calc_details_list">
              <div className="emi_calc_detail_row">
                <span className="emi_calc_detail_label">Principal Amount</span>
                <span className="emi_calc_detail_val">
                  {formatIndianCurrency(loanAmount)}
                </span>
              </div>
              <div className="emi_calc_detail_row">
                <span className="emi_calc_detail_label">Interest Amount</span>
                <span className="emi_calc_detail_val">
                  {formatIndianCurrency(interestAmount)}
                </span>
              </div>
              <div className="emi_calc_detail_row is-total">
                <span className="emi_calc_detail_label">Total Payable Amount</span>
                <span className="emi_calc_detail_val">
                  {formatIndianCurrency(totalPayable)}
                </span>
              </div>
            </div>

            {/* Action CTA Button */}
            <a
              href="https://calendly.com/dipakh810/30min"
              target="_blank"
              rel="noreferrer"
              className="emi_calc_cta_btn"
            >
              <span>Schedule a Consultation</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
