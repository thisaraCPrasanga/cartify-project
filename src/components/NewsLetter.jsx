import React from "react";
import "./NewsLetter.css";

const NewsLetter = () => {
  return (
    <div className="newsletter-container">
      {/* Google Header Section */}
      <div className="newsletter-header">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
          alt="Google"
          className="newsletter-logo"
        />
        <div className="newsletter-stars-container">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="newsletter-star">★</span>
          ))}
          <div className="newsletter-checkmark">
            <svg className="newsletter-checkmark-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <p className="newsletter-review-count">Based on 1,500+ reviews</p>
      </div>

      {/* Reviews Container */}
      <div className="newsletter-reviews">

        {/* Card 1 */}
        <div className="newsletter-review-card">
          <div>
            <div className="newsletter-review-header">
              <div className="newsletter-review-stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="newsletter-review-star">★</span>
                ))}
                <div className="newsletter-review-checkmark">
                  <svg className="newsletter-review-checkmark-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" className="newsletter-google-icon" alt="G" />
            </div>
            <p className="newsletter-review-text">
              "Excellent Service and Authentic Products" "I was hesitant about buying a flagship phone online, but Cartify's customer service answered all my questions about the warranty. The camera quality is stunning, and I received a genuine global version. Highly recommend them for anyone looking for authentic electronics."
            </p>
          </div>
          <div className="newsletter-reviewer">
            <div className="newsletter-reviewer-avatar">
              P
            </div>
            <span className="newsletter-reviewer-name">Praneeth Randunu</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="newsletter-review-card">
          <div>
            <div className="newsletter-review-header">
              <div className="newsletter-review-stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="newsletter-review-star">★</span>
                ))}
                <div className="newsletter-review-checkmark">
                  <svg className="newsletter-review-checkmark-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" className="newsletter-google-icon" alt="G" />
            </div>
            <p className="newsletter-review-text">
              Perfect Fit for my Desk Setup" "Bought a mechanical keyboard and a multi-port USB-C hub. Both accessories work perfectly with my MacBook. It's hard to find high-quality peripherals that don't break the bank, but Cartify has a great selection. I will definitely be a returning customer!
            </p>
          </div>
          <div className="newsletter-reviewer">
            <div className="newsletter-reviewer-avatar">
              A
            </div>
            <span className="newsletter-reviewer-name">Ariyadasa Kalindu</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="newsletter-review-card">
          <div>
            <div className="newsletter-review-header">
              <div className="newsletter-review-stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="newsletter-review-star">★</span>
                ))}
                <div className="newsletter-review-checkmark">
                  <svg className="newsletter-review-checkmark-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" className="newsletter-google-icon" alt="G" />
            </div>
            <p className="newsletter-review-text">
              Really good customer service. i highly recommended thier product and warranty service.
            </p>
          </div>
          <div className="newsletter-reviewer">
            <div className="newsletter-reviewer-avatar">
              T
            </div>
            <span className="newsletter-reviewer-name">Tharusha</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NewsLetter;
