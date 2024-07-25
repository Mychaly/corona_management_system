import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';




const PhotoUploader = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [photo, setPhoto] = useState(null);
   const [open, setOpen] = React.useState(false);
  const apiUrl="https://localhost:7069/api/Person"

  useEffect(() => {
    fetchPhoto();
  }, [open]);

  const fetchPhoto = async () => { console.log('tz',props.tz)
    try {
     console.log(`${apiUrl}/${props.tz}/photo`)
      const response = await axios.get(`${apiUrl}/${props.tz}/photo`);    
    const srcPhoto=`${apiUrl}/${props.tz}/photo`;
    setPhoto(srcPhoto)
    } catch (error) {
      console.error('Error fetching photo:', error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('photo', selectedFile);
      await axios.post(`${apiUrl}/${props.tz}/photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSelectedFile(null); // update to null after success
      fetchPhoto(); // reload picture after upload
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
    handleClose();
  };


  
   
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


  return (

    <React.Fragment>
    <Button  onClick={handleClickOpen} disabled={photo}>
    {photo ? (<img src={photo} alt="Member"  />):<p>image</p>}
    </Button>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
        <div>
      <div>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        
         <div id='photo'>{photo && (<img src={photo} alt="Member"  />)}</div>
      </div>
     
    </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button  onClick={handleClose}>close</Button>
        <Button  onClick={handleUpload}>load image</Button>
      </DialogActions>
    </Dialog>
  </React.Fragment>

   
  );
};

export default PhotoUploader;
