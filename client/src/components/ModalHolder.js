import React from 'react';

import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Chip from "@material-ui/core/Chip";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const ModalHolder = ({classes, open, handleClose, curItem, renderImgModal}) => {
  return (
    <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
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
                <div className={classes.modalIconHolder}>
                  <IconButton
                    className={classes.modalHeaderClose}
                    onClick={handleClose}
                  >
                    <HighlightOffIcon className={classes.filterBtnIcon} />
                  </IconButton>
                </div>
                <div className={classes.modalChipHolder}>
                  <Chip
                    className={classes.chip}
                    label={curItem?.fields["Source Type"]}
                  />
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'
                    className={classes.modalTextHolderCountryLang}
                  >
                    {curItem?.fields["Country (from ID copy)"]} -{" "}
                    {curItem?.fields["Language (from Article)"]}
                  </Typography>
                </div>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='p'
                  className={classes.modalTextHolderHeader}
                >
                  {curItem?.fields["Title (from ID copy)"]}
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='p'
                  className={classes.modalTextHolder}
                >
                  <b>Publisher:</b>{" "}
                  {curItem?.fields["Publisher (from ID copy)"]}
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='p'
                  className={classes.modalTextHolder}
                >
                  <b>Published:</b> {curItem?.fields["Date (from Article)"]}
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='p'
                  className={classes.modalTextHolderLast}
                >
                  <b>Subject(s):</b>{" "}
                  {curItem?.fields["Subject(s) (from Article)"]?.map(
                    (subject, index) =>
                      `${subject}${
                        index ===
                        curItem?.fields["Subject(s) (from Article)"].length - 1
                          ? ""
                          : ", "
                      }`
                  )}
                </Typography>
                <div className={classes.modalImagesHolder}>
                  {renderImgModal(curItem, true)}
                </div>

                <div className={classes.modalButtonHolder}>
                  <Button
                    variant='contained'
                    disableElevation
                    className={classes.links}
                    href={curItem?.fields["URL (from ID copy)"][0]}
                    target='_blank'
                  >
                    Visit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Paper>
        </Fade>
      </Modal>
  )
}

export default ModalHolder;