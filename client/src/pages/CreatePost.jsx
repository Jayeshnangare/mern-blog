import { Button, FileInput, Select, TextInput, Alert } from 'flowbite-react'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL,getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function CreatePost() {
    const [file,setFile] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress]  = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [formData, setFormData] = useState({})

    const handleUploadImage = async () =>{
        try{
            if(!file){
                setImageFileUploadError('please select an image')
                return;
            }
            setImageFileUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime()+'-'+file.name;
            const storageRef  = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) =>{
                    const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes)*100   // snapshot gives progrss of upload image
                    console.log(progress)
                    setImageFileUploadProgress(progress.toFixed(0));
                },
                (error) =>{
                    setImageFileUploadError('could not upload image (File must be less than 2MB)');
                    setImageFileUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                        setImageFileUploadProgress(null);
                        setImageFileUploadError(null);
                        setFormData({...formData, image: downloadURL})
                    
                    });
                }
            );

        }catch(err){
            setImageFileUploadError('Image Upload Failed');
            setImageFileUploadProgress(null);
            console.log(err);
        }
    }

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
        <form action="" className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput placeholder='Title' id='title' type='text' required
                className='flex-1'/>
                <Select>
                    <option value="uncategorized">Select a category</option>
                    <option value="Webdevelopment">Web Development</option>
                    <option value="appdevelopment">App Development</option>
                </Select>
            </div>
            <div className='flex gap-4 items-center justify-between border-4
             border-teal-500 border-dotted p-3'>
                <FileInput type='file' accept='image/*' 
                onChange={(e) => setFile(e.target.files[0]) } />

                <Button type='button' 
                gradientDuoTone='purpleToBlue' 
                size='sm'
                outline
                onClick={handleUploadImage}
                disabled={imageFileUploadProgress}
                > 
                    { 
                        imageFileUploadProgress ?
                       ( <div className='w-16 h-16'>
                            <CircularProgressbar 
                            value={imageFileUploadProgress} 
                            text={`${imageFileUploadProgress || 0}%`}/>                        
                        </div> )
                        : ('Upload Image')
                    }
                </Button>

               
            </div>
            {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )
        }
            <ReactQuill placeholder='Write something...' className='h-72 mb-12'></ReactQuill>
            <Button type='submit' gradientDuoTone='purpleToPink'>Publish</Button>
        </form>
    </div>
  )
}
