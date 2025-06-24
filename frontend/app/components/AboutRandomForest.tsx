import { CheckIcon, ShieldIcon, SearchIcon } from "./Icons"

export default function AboutRandomForest() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1 className="page-title">Random Forest Algorithm</h1>
        <p className="page-subtitle">Understanding the ensemble learning approach</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <div className="card">
            <h3 className="section-title">What is Random Forest?</h3>
            <p className="section-text">
              Random Forest is an ensemble learning algorithm that builds many decision trees and combines their results. Each tree gives a prediction, and the final result is based on the majority vote. It's simple, stable, and works well even with noisy data.
            </p>
          </div>
        </section>

        <section className="about-section">
          <div className="card">
            <h3 className="section-title">How does it work?</h3>
            <div className="steps">
              <div className="step">
                <span className="step-number">1</span>
                <div className="step-content">
                  <h4>Creating Samples</h4>
                  <p>Multiple data samples are created from the original dataset using random selection (bootstrapping).</p>
                </div>
              </div>
              <div className="step">
                <span className="step-number">2</span>
                <div className="step-content">
                  <h4>Building Trees</h4>
                  <p>Each sample builds its own decision tree with randomly chosen features.</p>
                </div>
              </div>
              <div className="step">
                <span className="step-number">3</span>
                <div className="step-content">
                  <h4>Voting</h4>
                  <p>All trees vote, and the final prediction is the most common answer.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="card">
            <h3 className="section-title">Advantages in Phishing Detection</h3>
            <div className="advantages">
              <div className="advantage">
                <CheckIcon />
                <div>
                  <h4>Stable Accuracy</h4>
                  <p>Works well on various types of data.</p>
                </div>
              </div>
              <div className="advantage">
                <ShieldIcon />
                <div>
                  <h4>Less Overfitting</h4>
                  <p>Random trees reduce risk of overfitting.</p>
                </div>
              </div>
              <div className="advantage">
                <SearchIcon />
                <div>
                  <h4>Feature Importance</h4>
                  <p>Easy to see which features matter most.</p>
                </div>
              </div>
              <div className="advantage">
                <CheckIcon />
                <div>
                  <h4>Fast Prediction</h4>
                  <p>Multiple trees can predict at the same time.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="card">
            <h3 className="section-title">Random Forest Algorithm Diagram</h3>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <img
                src="/RandomForestDiagram.jpg"
                alt="Random Forest Algorithm Diagram"
                style={{
                  maxWidth: '100%',
                  borderRadius: '18px',
                  boxShadow: '0 4px 24px rgba(102,126,234,0.12)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.01)'
                }}
              />
              <span style={{ color: '#a0a0a0', fontSize: '0.98rem', textAlign: 'center' }}>
                This is a diagram of the Random Forest algorithm.
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
