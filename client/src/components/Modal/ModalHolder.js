import React, {useState} from 'react';

import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import ModalHeader from './ModalHeader';
import ModalFigures from './ModalFigures';
import ModalArticleFigures from './ModalArticleFigures';
import ModalPageImage from './ModalPageImage';

const ModalHolder = ({
  classes,
  curItem,
  data,
  handleClose,
  handleOpen,
  hasPageImageModal,
  isFigureLoading,
  modalIndex,
  open,
  pdf,
  renderImgArticleFiguresModal,
  renderImg,
  renderImgPageModal,
  totalFiguresInModal,
}) => {
  const [modalState, setModalState] = useState('figures');
  const handleModalHeaderClose = () => {
    handleClose();
    setModalState('figures')
  }
  return (
    <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={(event, reason) => {
          handleClose(event);
          if (reason === "backdropClick") {
            setModalState('figures')
          }
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Paper className={classes.paperModal}>
            <Card elevation={0}>
              <CardContent className={classes.cardContainer}>
              <ModalHeader
                classes={classes}
                curItem={curItem}
                data={data}
                handleClose={handleModalHeaderClose}
                handleOpen={handleOpen}
                hasPageImageModal={hasPageImageModal}
                modalIndex={modalIndex}
                modalState={modalState}
                pdf={pdf}
                setModalState={setModalState}
                totalFiguresInModal={totalFiguresInModal}
              />
                {modalState === 'figures' &&
                <ModalFigures
                  classes={classes}
                  curItem={curItem}
                  isFigureLoading={isFigureLoading}
                  renderImg={renderImg}
                />
              }
              {modalState === 'article figures' &&
                <ModalArticleFigures
                  curItem={curItem}
                  renderImgArticleFiguresModal={renderImgArticleFiguresModal}
                />
              }
              {modalState === 'page image' &&
                <ModalPageImage
                  curItem={curItem}
                  renderImgPageModal={renderImgPageModal}
                />
              }
              </CardContent>
            </Card>
          </Paper>
        </Fade>
      </Modal>
  )
}

export default ModalHolder;
