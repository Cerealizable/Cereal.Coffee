import React, { useRef, useState, useEffect }  from "react";
import { useParams, useHistory } from "react-router-dom";
import { API, Storage} from "aws-amplify";
import { onError } from "../../libs/errorLib";
import config from "../../config";


import { FormGroup } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { ControlLabel } from '@material-ui/core';

import Button from '../customButtons/Button';





export default function ProductDetails() {

    const file = useRef(null);
    const { id } = useParams();
    const history = useHistory();
    const [product, setProduct] = useState(null);
    const [content, setContent] = useState("");


    useEffect(() => {
        function loadProduct() {
            return API.get("products", `/products/${id}`);
        }

        async function onLoad() {
            try {
                const product = await loadProduct();
                const { content, attachment } = product;
                
                if (attachment) {
                    product.attachmentURL = await Storage.vault.get(attachment);
                }

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
    async function handleSubmit(e) {
        let attachment;

        e.preventDefault();

        if (file.current && file.current.size > config.MAX_ATTACMENT_SIZE) {
            alert(
                `Please pick a file smaller than ${config.MAX_ATTACMENT_SIZE / 1000000} MB.`
            );
            return;
        }
    }

    async function handleDelete(e) {
        e.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmed) {
            return;
        }

        // setIsDeleting(true);
    }

    return(
        <div>
            {product && (
                <form onSubmit={handleSubmit}>
                    <FormGroup controlId="content">
                        <FormControl 
                            value={content}
                            componentClass="textarea"
                            onChange={e => setContent(e.target.value)}
                        />
                    </FormGroup>
                    {product.attachment && (
                        <FormGroup>
                            <ControlLabel>Attachment</ControlLabel>
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
                    <FormGroup controlId="file">
                        {!product.attachment && <ControlLabel>Attachment</ControlLabel>}
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