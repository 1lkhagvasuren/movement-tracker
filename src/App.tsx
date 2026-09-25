import { useState } from 'react'
import './App.css'

type Movement = 'Push' | 'Pull' | 'Legs'

const movements: Movement[] = ['Push', 'Pull', 'Legs']

function MovementSymbol({ movement }: { movement: Movement }) {
  return (
    <span
      className={`movement-symbol ${movement.toLowerCase()}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        {movement === 'Push' && (
          <polygon
            points="20,5 36,35 4,35"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
        )}

        {movement === 'Pull' && (
          <polygon
            points="4,5 36,5 20,35"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
        )}

        {movement === 'Legs' && (
          <rect
            x="5"
            y="5"
            width="30"
            height="30"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
          />
        )}
      </svg>
    </span>
  )
}

function App() {
  const [activeMovement, setActiveMovement] = useState<Movement>('Push')

  const [sets, setSets] = useState<Record<Movement, number>>({
    Push: 0,
    Pull: 0,
    Legs: 0,
  })

  const addSet = () => {
    setSets((current) => ({
      ...current,
      [activeMovement]: current[activeMovement] + 1,
    }))
  }

  const undoSet = () => {
    setSets((current) => ({
      ...current,
      [activeMovement]: Math.max(0, current[activeMovement] - 1),
    }))
  }

  const currentSets = sets[activeMovement]

  return (
    <main className="app">
      <div className="ambient-geometry geometry-one" />
      <div className="ambient-geometry geometry-two" />

      <header className="top-bar">
        <div className="mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <button
          className="settings-button"
          aria-label="Settings"
        >
          <span />
          <span />
        </button>
      </header>

      <section
        className="movement-selector"
        aria-label="Movement category"
      >
        {movements.map((movement) => (
          <button
            key={movement}
            className={`movement-tab ${activeMovement === movement ? 'active' : ''
              }`}
            onClick={() => setActiveMovement(movement)}
            aria-pressed={activeMovement === movement}
          >
            <MovementSymbol movement={movement} />

            <span className="movement-name">
              {movement}
            </span>
          </button>
        ))}
      </section>

      <section className="practice-stage">
        <div className="counter-section">
          <p className="eyebrow">TODAY</p>

          <div className="counter-value">
            {currentSets === 0 ? (
              <div
                className="empty-state"
                aria-label="No sets recorded"
              >
                —
              </div>
            ) : (
              <>
                <div
                  className="set-count"
                  aria-live="polite"
                  aria-label={`${currentSets} sets`}
                >
                  {currentSets}
                </div>

                <p className="count-label">
                  {currentSets === 1 ? 'SET' : 'SETS'}
                </p>
              </>
            )}
          </div>

          <div className="progress-structure">
            <div className="progress-line">
              <div
                className="progress-fill"
                style={{
                  width: `${Math.min((currentSets / 5) * 100, 100)}%`,
                }}
              />
            </div>

            <div className="thresholds">
              <div className={currentSets >= 3 ? 'reached' : ''}>
                <strong>3</strong>
                <span>BASELINE</span>
              </div>

              <div className={currentSets >= 5 ? 'reached' : ''}>
                <strong>5</strong>
                <span>TARGET</span>
              </div>
            </div>
          </div>
        </div>

        <section className="action-section">
          <button
            className="set-button"
            onClick={addSet}
            aria-label={`Add one ${activeMovement} set`}
          >
            <span className="plus">+</span>
            <span>SET</span>
          </button>

          <div
            className={`undo-container ${currentSets > 0 ? 'visible' : ''
              }`}
          >
            <button
              className="undo-button"
              onClick={undoSet}
              tabIndex={currentSets > 0 ? 0 : -1}
            >
              Undo
            </button>
          </div>
        </section>
      </section>
    </main>
  )
}

export default App