import React, { ReactChild, ReactEventHandler } from "react"
import '../../styles/root.scss'
import "./styles.scss"

interface FlatButtonProps {
  title?: string;
  disabled?: boolean;
  className?: string;
  onClick?: ReactEventHandler;
  children?: ReactChild | ReactChild[];
}

export const FlatButton = ({
  disabled = false,
  title = '',
  className = '',
  onClick = () => {},
  children
}: FlatButtonProps) => {

  return (
    <button
      type='button'
      className={`flatButton ${className}`}
      title={ title }
      disabled={ disabled }
      onClick={ onClick }
    >
      { children }
    </button>
  )
}

export default FlatButton