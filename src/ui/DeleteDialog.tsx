import React from 'react'
import { Dialog } from 'components'

// technically it is a type, but it's clearer to define it here
export type DeleteTarget = 'route' | 'marker' | 'measureLine'

type DeleteDialogProps = {
  isVisible: boolean
  deleteTarget: DeleteTarget
  selectedMarkerId: number | null
  onYesButtonPress: () => void
  onNoButtonPress: () => void
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  isVisible,
  deleteTarget,
  selectedMarkerId,
  onYesButtonPress,
  onNoButtonPress,
}) => {
  const texts: Record<DeleteTarget, () => string> = {
    route: () => 'DELETE ROUTE ?',
    marker: () =>
      `DELETE MARKER # ${
        selectedMarkerId !== null ? selectedMarkerId + 1 : ''
      } ?`,
    measureLine: () => 'DELETE LINE ?',
  }

  return (
    <Dialog
      isVisible={isVisible}
      text={texts[deleteTarget]()}
      yesButtonText={'YES'}
      noButtonText={'NO'}
      position={{ top: 0.4, left: 0.21 }}
      onYesButtonClick={onYesButtonPress}
      onNoButtonClick={onNoButtonPress}
    />
  )
}

export default DeleteDialog
