import { CheckIcon, ShieldIcon, SearchIcon } from "./Icons"

export default function AboutXGBoost() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1 className="page-title">XGBoost Algorithm</h1>
        <p className="page-subtitle">Extreme Gradient Boosting for superior performance</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <div className="card">
            <h3 className="section-title">What is XGBoost?</h3>
            <p className="section-text">
              XGBoost (Extreme Gradient Boosting) is a powerful machine learning algorithm based on boosting. It builds models in a sequence, where each model learns from the mistakes of the previous ones. XGBoost is known for high speed, accuracy, and efficient use of memory. It's widely used in competitions and real-world projects.
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
                  <h4>Base Model</h4>
                  <p>It begins with a simple decision tree.</p>
                </div>
              </div>
              <div className="step">
                <span className="step-number">2</span>
                <div className="step-content">
                  <h4>Error Analysis</h4>
                  <p>It checks which predictions were incorrect.</p>
                </div>
              </div>
              <div className="step">
                <span className="step-number">3</span>
                <div className="step-content">
                  <h4>Adding Models</h4>
                  <p>A new model is added to fix the mistakes of the last one.</p>
                </div>
              </div>
              <div className="step">
                <span className="step-number">4</span>
                <div className="step-content">
                  <h4>Optimization</h4>
                  <p>The process is repeated, using gradient descent to improve accuracy.</p>
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
                  <h4>High Accuracy</h4>
                  <p>Often wins in benchmarks and competitions.</p>
                </div>
              </div>
              <div className="advantage">
                <ShieldIcon />
                <div>
                  <h4>Smart Learning</h4>
                  <p>Each model corrects the previous one.</p>
                </div>
              </div>
              <div className="advantage">
                <SearchIcon />
                <div>
                  <h4>Fine-Tuning Options</h4>
                  <p>Many hyperparameters for better results.</p>
                </div>
              </div>
              <div className="advantage">
                <CheckIcon />
                <div>
                  <h4>Resource Efficient</h4>
                  <p>Works well even on large datasets.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="card">
            <h3 className="section-title">XGBoost vs Random Forest</h3>
            <div className="comparison-table">
              <div className="comparison-row header">
                <div className="comparison-cell">Feature</div>
                <div className="comparison-cell">XGBoost</div>
                <div className="comparison-cell">Random Forest</div>
              </div>
              <div className="comparison-row">
                <div className="comparison-cell">Learning Type</div>
                <div className="comparison-cell">Sequential (Boosting)</div>
                <div className="comparison-cell">Parallel (Bagging)</div>
              </div>
              <div className="comparison-row">
                <div className="comparison-cell">Accuracy</div>
                <div className="comparison-cell">Very High</div>
                <div className="comparison-cell">High</div>
              </div>
              <div className="comparison-row">
                <div className="comparison-cell">Overfitting Risk</div>
                <div className="comparison-cell">Needs tuning</div>
                <div className="comparison-cell">Naturally resistant</div>
              </div>
              <div className="comparison-row">
                <div className="comparison-cell">Interpretation</div>
                <div className="comparison-cell">More complex</div>
                <div className="comparison-cell">Easier to understand</div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="card">
            <h3 className="section-title">XGBoost Algorithm Diagram</h3>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <img
                src="/XGBoostdiagram.jpg"
                alt="XGBoost Algorithm Diagram"
                style={{
                  maxWidth: '100%',
                  borderRadius: '18px',
                  boxShadow: '0 4px 24px rgba(102,126,234,0.12)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.01)'
                }}
              />
              <span style={{ color: '#a0a0a0', fontSize: '0.98rem', textAlign: 'center' }}>
                This is a diagram of the XGBoost algorithm.
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
