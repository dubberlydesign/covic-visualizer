import React from 'react';

import ModalHeader from './ModalHeader';

const ModalPageImage = ({
  curItem, 
  renderImgPageModal,
}) => {
  return renderImgPageModal(curItem, true);
};

export default ModalPageImage;
