// ./src/App.tsx

import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import uploadFileToBlob, { isStorageConfigured, getBlobsInContainer } from '../azure-storage-blob';
import DisplayImagesFromContainer from '../ContainerImages';
import createRecord from '../air-table';

const storageConfigured = isStorageConfigured();

const UploadImage = (): JSX.Element => {
  // all blobs in container
  const [blobList, setBlobList] = useState<string[]>([]);

  // current file to upload into container
  const [fileSelected, setFileSelected] = useState<File | null>();
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
    // capture file into state
    setFileSelected(event.target.files[0]);
  };

  const onFileUpload = async () => {

    if (fileSelected && fileSelected?.name) {
      // prepare UI
      setUploading(true);

      // *** UPLOAD TO AZURE STORAGE ***
      const image  = await uploadFileToBlob(fileSelected) || '';
      // *** CREATE RECORD IN AIRTABLE ***
      await createRecord(comment, image);
      // reset state/form
      setFileSelected(null);
      setFileUploaded(fileSelected.name);
      setUploading(false);
      setInputKey(Math.random().toString(36));

    }

  };


  // display form
  const DisplayForm = () => (
    <div>
      <input type="file" onChange={onFileChange} key={inputKey || ''} />
      <input type="text" value={comment} onChange={(event) => setComment(event.target.value)} />
      <button type="submit" disabled={comment === '' || !fileSelected} onClick={onFileUpload}>
        Upload!
      </button>
    </div>
  )

  return (
    <div>
      <h1>Upload file to Azure Blob Storage</h1>
      {storageConfigured && !uploading && DisplayForm()}
      {storageConfigured && uploading && <div>Uploading</div>}
      <hr />
      {storageConfigured && blobList.length > 0 && <DisplayImagesFromContainer blobList={blobList} />}
      {!storageConfigured && <div>Storage is not configured.</div>}
    </div>
  );
};

export default UploadImage;


