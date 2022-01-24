import React, { ReactEventHandler, useState } from "react"
import { LabelPositions } from '../../types'
import '../../styles/root.scss'
import "./styles.scss"

interface FlatToggleProps {
  label: string;
  labelPosition: LabelPositions;
  title?: string;
  className?: string;
  disabled?: boolean;
  value?: boolean;
  onClick?: (toggleState: boolean) => void;
}

export const FlatToggle = ({
  label = '',
  labelPosition = LabelPositions.LEFT,
  title = '',
  className = '',
  disabled = false,
  value = false,
  onClick = () => {}
}: FlatToggleProps) => {
  const [ toggleState, setToggleState ] = useState(value)
  const toggleId = `toggle-${label.replace(/[\s]/g, '-')}`
  const toggleStateClass = toggleState ? 'on' : 'off'
  const labelPositionClass = labelPosition.toLowerCase()
  const labelClass = `${labelPositionClass} ${toggleStateClass}`
  const toggleContainerClass = `toggleContainer ${className}`

  const handleClick: ReactEventHandler = e => {
    if (disabled) return void
    e.preventDefault
    setToggleState(!toggleState)
    onClick(toggleState)
  }

  return (
    <div className='inlineBlock'>
      <div className={ toggleContainerClass } title={ title }>
        <button id={ toggleId } className={ toggleStateClass } disabled={ disabled } onClick={ handleClick } />
        <label className={ labelClass } htmlFor={ toggleId }>{ label }</label>
      </div>
    </div>
  )
}

export default FlatToggle