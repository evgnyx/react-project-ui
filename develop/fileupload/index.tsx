import * as React from 'react'


function prv(e) {
  e.preventDefault()
}

function FileUpload(props) {

  const _onDragEnter = React.useCallback((e) => prv(e), [])
  const _onDragOver = React.useCallback((e) => prv(e), [])
  const _onDragLeave = React.useCallback((e) => prv(e), [])
  const _onDrop = React.useCallback((e) => {
    prv(e)
    console.log( e.dataTransfer.files )
  }, [])


  return (
    <div
      { ...props }
      onDragEnter={ _onDragEnter }
      onDragOver={ _onDragOver }
      onDragLeave={ _onDragLeave }
      onDrop={ _onDrop }
      style={{
        width: '100%',
        height: '200px',
        border: '2px dashed #ccc',
      }}
    >
      <input
        type="file"
        style={{
          display: 'none'
        }}
      />
    </div>
  )
}

export default FileUpload
