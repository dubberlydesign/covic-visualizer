import React from 'react';

import ModalHeader from "./ModalHeader";

const ModalArticleFigures = ({
  curItem,
  renderImgArticleFiguresModal,
}) => {
  return renderImgArticleFiguresModal(curItem, true);
};

export default ModalArticleFigures;
