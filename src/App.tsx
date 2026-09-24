import { useState } from 'react'
import './App.css'

type Movement = 'Push' | 'Pull' | 'Legs'

const movements: Movement[] = ['Push', 'Pull', 'Legs']

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
      {/* Ambient geometric structure */}
      <div className="ambient-geometry geometry-one" />
      <div className="ambient-geometry geometry-two" />

      {/* Header */}
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

      {/* Primary movement selector */}
      <section
        className="movement-selector"
        aria-label="Movement category"
      >
        {movements.map((movement) => (
          <button
            key={movement}
            className={`movement-tab ${
              activeMovement === movement ? 'active' : ''
            }`}
            onClick={() => setActiveMovement(movement)}
            aria-pressed={activeMovement === movement}
          >
            <span
              className={`movement-symbol ${movement.toLowerCase()}`}
              aria-hidden="true"
            >
              {movement === 'Push' && '△'}
              {movement === 'Pull' && '▽'}
              {movement === 'Legs' && '◇'}
            </span>

            <span className="movement-name">
              {movement}
            </span>
          </button>
        ))}
      </section>

      {/* Current state */}
      <section className="counter-section">
        <p className="eyebrow">TODAY</p>

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

        {/* Baseline / target structure */}
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
      </section>

      {/* Primary action */}
      <section className="action-section">
        <button
          className="set-button"
          onClick={addSet}
          aria-label={`Add one ${activeMovement} set`}
        >
          <span className="plus">+</span>
          <span>SET</span>
        </button>

        {/* Reserved space prevents layout movement */}
        <div
          className={`undo-container ${
            currentSets > 0 ? 'visible' : ''
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

      {/* Bottom navigation */}
      <nav className="bottom-nav" aria-label="Main navigation">
        <button
          className="nav-item"
          aria-label="History"
        >
          <span className="nav-icon bars" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </button>

        <button
          className="nav-item nav-item-active"
          aria-label="Add"
        >
          <span className="nav-add">+</span>
        </button>

        <button
          className="nav-item"
          aria-label="Records"
        >
          <span className="nav-icon calendar" aria-hidden="true">
            <i />
          </span>
        </button>
      </nav>
    </main>
  )
}

export default App