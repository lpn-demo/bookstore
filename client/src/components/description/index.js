import React from 'react'
import { createPortal } from 'react-dom'

class Description extends React.Component {
  render() {
    const { price } = this.props;
    return createPortal(
      <>
				<p>react portals example</p>
        <p>Price: {price}</p>
      </>,
      document.querySelector('#itemDescription')
    )
  }
}

export default Description;