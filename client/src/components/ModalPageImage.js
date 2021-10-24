import React from 'react';
import Button from "@material-ui/core/Button";

const ModalPageImage = ({classes, curItem, renderImgPageModal, setModalState}) => {
  return (
    <>
      <div className={classes.modalImagesHolder}>
        {renderImgPageModal(curItem, true)}
      </div>
      <Button
          onClick={() => setModalState('article figures')}
      >
        Trigger
      </Button>
    </>
  );
};

export default ModalPageImage;
