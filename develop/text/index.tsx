import * as React from 'react'
// import './style.styl'

function Button(props: { [key: string]: any }) {
  return (
    <div
      className={ 'x-text' }
      { ...props }
    >
      asdf
    </div>
  )
}

export default Button
