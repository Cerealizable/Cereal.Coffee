import React, { useRef, useState } from 'react';

// routing
import { useHistory } from "react-router-dom";

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
import TextField from '@material-ui/core/TextField';
import Button from "../customButtons/Button";
import GridContainer from "../grid/GridContainer";
import GridItem from "../grid/GridItem";

// custom core components
import CustomInput from "../customInput/CustomInput";

// CSS
import styles from "../../assets/jss/material-kit-react/modalStyle";



// * Modal that creates a new product and takes in a Attachment/image, content, and price

export default function CreateProduct() {
  // CSS
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  // Routing
  const history = useHistory();

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

      history.push("/products");
    } catch (e) {
      onError(e);
    }

  }

  function createProduct(product) {
    return API.post("products", "/products", {
      body: product
    });
  }



  return (
    // ! style is temporary fix for header overlapping form
      <form onSubmit={handleSubmit} style={{paddingTop: "100px"}}>     
        <GridContainer >
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
        {/* <Button onClick={() => setModal(false)}>Never Mind</Button> */}
        <Button 
          onClick={(e) => handleSubmit(e)} 
          color="success"
          type="submit"
          disabled={!validateForm()}
        >
          Create
        </Button>
      </form>  
  );
}