import React from 'react';
import Button from "@material-ui/core/Button";

import ModalHeader from "./ModalHeader";

const ModalArticleFigures = ({classes, curItem, renderImgArticleFiguresModal, setModalState}) => {
  return (
    <>
      <ModalHeader
        classes={classes}
        curItem={curItem}
        handleClose={() => setModalState('figures')}
      />
      <div className={classes.modalImagesHolder}>
        {renderImgArticleFiguresModal(curItem, true)}
      </div>
      <Button
          onClick={() => setModalState('page image')}
      >
        Page View
      </Button>
    </>
  );
};

export default ModalArticleFigures;
