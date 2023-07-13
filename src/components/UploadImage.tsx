// ./src/App.tsx

import React, { useState, useEffect } from 'react';
import uploadFileToBlob, { isStorageConfigured, getBlobsInContainer } from '../azure-storage-blob';
import DisplayImagesFromContainer from '../ContainerImages';
import {createRecord} from '../air-table';
import useAuthState from "../hooks/useAuth";
import { auth } from "../firebase";
import UploadImageForm from './UploadImageForm';
import Loader from './Loader';

const storageConfigured = isStorageConfigured();

const UploadImage = (): JSX.Element => {

  // user 
  const [user] = useAuthState(auth);
  console.log('user', user?.uid)
  // all blobs in container
  const [blobList, setBlobList] = useState<string[]>([]);

  // current file to upload into container
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileUploaded, setFileUploaded] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  // UI/form management
  const [uploading, setUploading] = useState<boolean>(false);
  const [inputKey, setInputKey] = useState(Math.random().toString(36));

  // *** GET FILES IN CONTAINER ***
  useEffect(() => {
    getBlobsInContainer().then((list: any) => {
      // prepare UI for results
      setBlobList(list);
    })
  }, [fileUploaded]);

  const onFileChange = (event: any) => {
    const files: any = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const removeImage = (index: number) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(index, 1);
    setSelectedFiles(newSelectedFiles);
  }

  const onFileUpload = async () => {
    // Iterate over each selected file

    for (const file of selectedFiles) {
      if (file) {
        // prepare UI
        setUploading(true);

        // *** UPLOAD TO AZURE STORAGE ***
        const image = await uploadFileToBlob(file) || '';
        // *** CREATE RECORD IN AIRTABLE ***
        await createRecord(comment, image, user?.uid || '');
      }
    }
    setSelectedFiles([]);
    setFileUploaded(selectedFiles.map((file: any) => file?.name).join(', '));
    setUploading(false);
    setInputKey(Math.random().toString(36));
  };


  // display form
  const DisplayForm = () => (
    <div className="file-upload-container">
      <UploadImageForm onFileChange={onFileChange} selectedFiles={selectedFiles} removeImage={removeImage} />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
        <input placeholder="Add a comment for uploaded files" className="secondary-input" type="text" value={comment} onChange={(event) => setComment(event.target.value)} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button className="primary-button" style={{ width: '50%' }} type="submit" disabled={comment === '' || selectedFiles.length === 0}
          onClick={onFileUpload}>
          UPLOAD
        </button>
      </div>
    </div>
  )




  return (
    <div>
      {storageConfigured && !uploading && DisplayForm()}
      {storageConfigured && uploading && <Loader />}
      <hr />
      {storageConfigured && blobList.length > 0 && <DisplayImagesFromContainer blobList={blobList} />}
      {!storageConfigured && <div>Storage is not configured.</div>}
    </div>
  );
};

export default UploadImage;


