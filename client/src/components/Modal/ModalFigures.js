import React from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";

const ModalFigures = ({
  classes,
  curItem,
  isFigureLoading,
  renderImg,
}) => {

  return (
    <>
      <div className={classes.modalImagesHolder}>
        {!isFigureLoading ?
          renderImg(curItem, true) :
          <CircularProgress
            className={classes.initLoader}
            style={{bottom: "40px", position: "absolute", top: "initial"}}
          />
        }
      </div>
    </>
  );
};

export default ModalFigures;
