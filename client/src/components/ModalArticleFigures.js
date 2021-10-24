import React from 'react';
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const ModalArticleFigures = ({classes, curItem, renderImgArticleFiguresModal, setModalState}) => {
  return (
    <>
      <h1>article figures</h1>
      <div className={classes.modalImagesHolder}>
        {renderImgArticleFiguresModal(curItem, true)}
      </div>
      <div className={classes.modalIconHolder}>
        <IconButton
          className={classes.modalHeaderClose}
          onClick={() => setModalState('figures')}
        >
          <HighlightOffIcon className={classes.filterBtnIcon} />
        </IconButton>
      </div>
      <Button
          onClick={() => setModalState('page image')}
      >
        Trigger
      </Button>
    </>
  );
};

export default ModalArticleFigures;
