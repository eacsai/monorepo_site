import React, { memo } from 'react'
import { WorkCardStyle } from './style'
import Card from './c-cpns/card'
import CodeArt from './c-cpns/code-art'
export default memo(function WorkCard() {
  return (
    <WorkCardStyle>
      <CodeArt/>
      <Card/>
    </WorkCardStyle>
  )
})
