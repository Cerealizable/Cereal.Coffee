import React, { useRef, useState } from 'react';

// Error catcher
import { onError } from "../../libs/errorLib";

// S3 uploader
import { s3Upload } from "../../libs/awsLib";

// AWS API
import { API } from "aws-amplify";

// Configuration
import config from "../../config";

// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";

// @material-ui/icons
import Close from "@material-ui/icons/Close";

// core components
import Button from "../customButtons/Button";
import GridContainer from "../grid/GridContainer";
import GridItem from "../grid/GridItem";
import CustomInput from "../customInput/CustomInput";

// CSS
import styles from "../../assets/jss/material-kit-react/modalStyle";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});


// * Modal that creates a new product and takes in a Attachment/image, content, and price

export default function NewProductModal() {
  // CSS
  const [modal, setModal] = React.useState(false);
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  // Functionality 
  const file = useRef(null);
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  

  function validateForm() {
    return content.length > 0 && price.length > 0;
  }

  function handleFileChange(e) {
    file.current = e.target.files[0];
  }

  async function handleSubmit(e) {
    e.preventDefault();
  
    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert (
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE} / 1000000} MB.`
      );
      return;
    }

    try {
      const image = file.current ? await s3Upload(file.current) : null;

      await createProduct({ content, price, image });
    } catch (e) {
      onError(e);
    }
    
    setModal(false);
  }

  function createProduct(product) {
    return API.post("products", "/products", {
      body: product
    });
  }



  return (
    <div>
      <Button styles="padding-top: 100" color="success" round onClick={() => setModal(true)}>
        New Product
      </Button>
    <div />
      <form onSubmit={handleSubmit} >     
        <Dialog
          classes={{
            root: classes.center,
            paper: classes.modal
          }}
          open={modal}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setModal(false)}
          aria-labelledby="modal-slide-title"
          aria-describedby="modal-slide-description"
        >
          <DialogTitle
            id="classic-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <IconButton
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={() => setModal(false)}
            >
              <Close className={classes.modalClose} />
            </IconButton>
            <h4 className={classes.modalTitle}>Create a new product</h4>
          </DialogTitle>
          <DialogContent
            id="modal-slide-description"
            className={classes.modalBody}
          >
            <GridContainer>
              <GridItem>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  onChange={handleFileChange}
                  type="file"
                  />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <TextField
                  id="standard-textarea"
                  label="Product description"
                  multiline
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                    labelText="Product price"
                    id="productPrice"
                    value={price}
                    inputProps={{
                      onChange: (e) => setPrice(e.target.value),
                      autoFocus: true,
                      type: "number"
                    }}
                  />
              </GridItem>
            </GridContainer>
          </DialogContent>
          <DialogActions
            className={classes.modalFooter + " " + classes.modalFooterCenter}
          >
            {/* <Button onClick={() => setModal(false)}>Never Mind</Button> */}
            <Button 
              onClick={(e) => handleSubmit(e)} 
              color="success"
              type="submit"
              disabled={!validateForm()}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </form>  
    </div>
  );
}