function AlertsPanel({

  alerts,
  dismissAlert

}) {

  return (

    <div className="alerts-panel">

      <p className="alerts-title">
        ALERTAS
      </p>

      {

        alerts.length === 0 && (

          <p className="no-alerts">
            Sin alertas activas
          </p>
        )
      }

      {

        alerts.map((alert) => (

          <div
            key={alert.id}
            className={`alert-card ${alert.type}`}
          >

            <div>

              <p className="alert-message">
                {alert.message}
              </p>

              <p className="alert-time">
                {alert.time}
              </p>

            </div>

            <button
              className="close-alert"
              onClick={() =>
                dismissAlert(alert.id)
              }
            >
              ×
            </button>

          </div>
        ))
      }

    </div>
  )
}

export default AlertsPanel