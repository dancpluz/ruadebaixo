// 'use client'

// import Tooltip from '@mui/material/Tooltip';
// import ClickAwayListener from '@mui/material/ClickAwayListener';
// import { EyeIcon } from './styles/OrderedBadge.styled';
// import { useState } from 'react';
// import styled from 'styled-components';

// const StyledTooltip = styled(Tooltip)`
//   /* WIP */
// `;

// export default function OrderedBadge() {
//   const [open,setOpen] = useState(false);

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   return (
//     <ClickAwayListener onClickAway={handleClose}>
//       <div>
//         <StyledTooltip
//           PopperProps={{
//             disablePortal: true,
//           }}
//           onClose={handleClose}
//           open={open}
//           placement="top"
//           disableFocusListener
//           disableHoverListener
//           disableTouchListener
//           title="Alguém está de olho neste produto!"
//           arrow
//         >
//           <EyeIcon onClick={open ? handleClose : handleOpen} src={'/assets/icons/eye.svg'} alt={'Pessoas olhando'} width={24} height={24} />
//         </StyledTooltip>
//       </div>
//     </ClickAwayListener>
    
//   )
// }
