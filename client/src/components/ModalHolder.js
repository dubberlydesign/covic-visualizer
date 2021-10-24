import React, {useState} from 'react';

import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import ModalFigures from './ModalFigures';
import ModalArticleFigures from './ModalArticleFigures';
import ModalPageImage from './ModalPageImage';

const ModalHolder = ({
  classes,
  curItem,
  data,
  handleClose,
  handleOpen,
  modalIndex,
  open,
  renderImgArticleFiguresModal,
  renderImgModal,
  renderImgPageModal
}) => {
  const [modalState, setModalState] = useState('figures');
  return (
    <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onBackdropClick={() => setModalState('figures')}
        onClose={handleClose}
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
                {modalState === 'figures' &&
                <ModalFigures
                  classes={classes}
                  curItem={curItem}
                  data={data}
                  handleClose={handleClose}
                  // handleOpen={handleOpen}
                  modalIndex={modalIndex}
                  renderImgModal={renderImgModal}
                  setModalState={setModalState}
                />
              }
              {modalState === 'article figures' &&
                <ModalArticleFigures
                  classes={classes}
                  curItem={curItem}
                  renderImgArticleFiguresModal={renderImgArticleFiguresModal}
                  setModalState={setModalState}
                />
              }
              {modalState === 'page image' &&
                <ModalPageImage
                  classes={classes}
                  curItem={curItem}
                  renderImgPageModal={renderImgPageModal}
                  setModalState={setModalState}
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
