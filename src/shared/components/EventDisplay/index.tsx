import React from "react"
import './styles.scss'

export const EventDisplay = ({ loggingEvents }) => {
  const eventsList = () => (
    <ul>
      { loggingEvents.map( (event, i) => (
        <li key={ event.event_type + i }>
          <details>
            <summary>
              <span className='label'>Event: </span>
              <span className='value'>{ event.event_type } ({ event.event_properties.web_platform })</span>
            </summary>
            <div className='eventDescription'>
              <span className='label'>Page: </span>
              <span className='value'>{ event.event_properties.screen_name } ({ event.event_properties.wps_group })</span>
            </div>
          </details>
        </li>
      ))}
    </ul>
  )
  
  return (
    <section className='eventDisplay'>
      <h2>Amplitude Events</h2>
      { eventsList() }
    </section>
  )
}

export default EventDisplay