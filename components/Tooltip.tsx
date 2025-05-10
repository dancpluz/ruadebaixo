'use client'

import Popup from 'reactjs-popup'
import React from 'react'
import { PopupPosition } from 'reactjs-popup/dist/types'

export default function Tooltip({ children, position, trigger }: { children: React.ReactNode, position?: PopupPosition, trigger: React.ReactNode }) {
  return (
    <Popup
      trigger={trigger}
      position={position || 'top center'}
      on={['hover', 'click']}
      closeOnDocumentClick
      arrowStyle={{ color: '#aaa' }}
    >
      {children}
    </Popup>
  )
}
