import React, { useRef } from 'react';
import add_image from '../assets/add_image.svg';
import image from '../assets/seaquestLogo.png'
import close from '../assets/close.svg'

const UploadImageForm = ({ onFileChange, selectedFiles, removeImage }: any) => {
    const inputFile: any = useRef(null)

    const onButtonClick = () => {
        // `current` points to the mounted file input element
        inputFile?.current?.click();
    };

    return (
        <div className="file-upload-contain" >
            <div className="file-input" onClick={onButtonClick}>
                <div className="file-preview">
                    <div className="file-drop-zone clickable">
                        <div className="file-drop-zone-title">
                            <input type='file' id='file' onChange={onFileChange} multiple ref={inputFile} style={{ display: 'none' }} />
                            <div className="upload-area">  <img
                                style={{
                                    width: "10%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                                src={add_image}
                                alt="image-upload"
                            /><p>Browse or Drag and Drop .jpg, .png, .gif</p> <div> <button>Browse File</button> </div></div>
                        </div>
                    </div>
                </div>
            </div>
            {selectedFiles.length > 0 && selectedFiles.map((file: any, index: number) => {
                return <div className="file-preview-thumbnails">
                    <div className="file-preview-frame file-sortable kv-preview-thumb" id="thumb-multiplefileupload-36479_scrubber5.jpeg" data-fileindex="-1" data-fileid="36479_scrubber5.jpeg" data-template="image" data-zoom="" draggable="false">
                        <div className="kv-file-content">
                            <img src={URL.createObjectURL(file)} className="file-preview-image kv-preview-data" title="scrubber5.jpeg" alt="scrubber5.jpeg" style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "100%", imageOrientation: "from-image" }} draggable="false" />
                        </div>
                        <div className="file-thumbnail-footer">
                            <div className="file-detail"><div className="file-caption-name">{file?.name}</div>
                                <div className="file-size"> <samp>(35.62 KB)</samp></div>
                            </div>   <div className="file-actions">
                                <div className="file-footer-buttons">
                                    <button onClick={() => removeImage(index)} type="button" className="kv-file-remove file-remove" title="Remove file"><img src={close} style={{ width: '14px' }} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </div>
    )
}
export default UploadImageForm;