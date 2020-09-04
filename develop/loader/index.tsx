import * as React from 'react'
import { join } from '../tools'
import { getStyles } from '../config'


const key = 'ui-loader'

interface LoaderProps extends React.HTMLAttributes<HTMLOrSVGElement> {
}

function Loader({
  className,
}: LoaderProps) {
  const classlist = React.useMemo(() => {
    const [styles, theme] = getStyles('icon')
    return join(
      styles![key] || key,
      theme![key],
      className,
    )
  }, [className])

  return (
    <i className={ classlist }>
      <svg
        viewBox="0 0 40 40"
        width="100%"
        height="100%"
        role="img"
        focusable="false"
      >
        <path
          d="m20.0135,0.044c-11.01527,0 -19.946,8.93073 -19.946,19.946c0,11.01661 8.93073,19.946 19.946,19.946s19.946,-8.92939 19.946,-19.946c-0.00133,-11.01527 -8.93073,-19.946 -19.946,-19.946zm0,35.47201c-8.5744,0 -15.52601,-6.95027 -15.52601,-15.52601c0,-8.5744 6.95161,-15.52601 15.52601,-15.52601c8.5744,0 15.52468,6.95161 15.52468,15.52601c0,8.57574 -6.95027,15.52601 -15.52468,15.52601z"
          opacity="0.2"
        />
        <path
          d="m27.74358,6.4845l2.11092,-3.78402c-2.8052,-1.67944 -6.05326,-2.65647 -9.5285,-2.65647l0,0l0,4.37289l0,0c2.70438,0 5.23263,0.7605 7.41758,2.06761z"
        >
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 20 20"
            to="360 20 20"
            dur="0.5s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </i>
  )
}

export default React.memo(Loader)
