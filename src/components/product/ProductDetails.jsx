import React, { useRef, useState, useEffect }  from "react";
import { useParams, useHistory } from "react-router-dom";
import { API, Storage} from "aws-amplify";
import { onError } from "../../libs/errorLib";
import config from "../../config";
import { s3Upload } from "../../libs/awsLib";

import { FormGroup } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { FormLabel } from '@material-ui/core';
import { TextField } from '@material-ui/core';

import styles from '../../assets/jss/material-kit-react/views/loginPage';
import { makeStyles } from "@material-ui/core/styles";

import Button from '../customButtons/Button';

export default function ProductDetails() {
    // CSS
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    // Functionality
    const file = useRef(null);
    const { id } = useParams();
    const history = useHistory();

    // Declarations
    const [product, setProduct] = useState(null);
    const [content, setContent] = useState("");
    // eslint-disable-next-line
    const [isDeleting, setIsDeleting] = useState(false);


    useEffect(() => {
        function loadProduct() {
            console.log("loading product..");
            return API.get("products", `/products/${id}`);
        }

        async function onLoad() {
            try {
                const product = await loadProduct();
                const { content, attachment } = product;
                
                if (attachment) {
                    product.attachmentURL = await Storage.vault.get(attachment);
                }

                console.log("content:", content);
                setContent(content);
                setProduct(product);
            } catch (e) {
                onError(e);
            }
        }

        onLoad();
    }, [id]);

    function validateForm() {
        return content.length > 0;
    }

    function formatFilename(str) {
        return str.replace(/^\w+/, "");
    }

    function handleFileChange(e) {
        file.current = e.target.files[0];
    }

    function saveProduct(note) {
        return API.put("products", `/products/${id}`, {
          body: note
        });
      }

    async function handleSubmit(e) {
        let attachment;

        e.preventDefault();

        if (file.current && file.current.size > config.MAX_ATTACMENT_SIZE) {
            alert(
                `Please pick a file smaller than ${config.MAX_ATTACMENT_SIZE / 1000000} MB.`
            );
            return;
        }

        try {
            if (file.current) {
                attachment = await s3Upload(file.current);
            }

            await saveProduct({
                content,
                attachment: attachment || product.attachment
            });
            history.push("/products");
        } catch (e) {
            onError(e);
        }
    };

    function deleteNote() {
        return API.del("products", `/products/${id}`);
    }

    async function handleDelete(e) {
        e.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmed) {
            return;
        }

        setIsDeleting(true);

        try {
            await deleteNote();
            history.push("/products");
        } catch (e) {
            onError(e);
            setIsDeleting(false);
        }
    }

    return(
        <div className={classes.container}>
            {product && (
                <form onSubmit={handleSubmit} >
                    <FormGroup controlid="content">
                        <TextField 
                            id="standard-required" 
                            label="Name" 
                            defaultValue={content} 
                            onChange={e => setContent(e.target.value)}
                            variant="filled"    
                        />
                    </FormGroup>
                    {product.attachment && (
                        <FormGroup>
                            <FormLabel>Attachment</FormLabel>
                            <FormControl.Static>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={product.attachmentURL}
                                >
                                    {formatFilename(product.attachment)}
                                </a>
                            </FormControl.Static>
                        </FormGroup>
                    )}
                    <FormGroup controlid="file">
                        {!product.attachment && <FormLabel >Attachment</FormLabel>}
                        <FormControl onChange={handleFileChange} type="file" />
                    </FormGroup>
                    <Button 
                        color="primary"
                        type="submit"
                        disabled={!validateForm()}
                    >
                        Save
                    </Button>
                    <Button 
                        color="rose"
                        onClick={handleDelete}    
                    >
                        Delete
                    </Button>


                </form>
            )}
        </div>
    )
}