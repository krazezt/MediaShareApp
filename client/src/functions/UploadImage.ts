import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import getBlobFromUri from './GetBlobFromURI';

export enum FirebaseFolders {
  AVATAR = 'Avatars/',
  IMAGE = 'Images/',
  VIDEO = 'Videos/',
  MUSIC = 'Musics/',
}

export default async function uploadImage(
  imageUri: string,
  folder: FirebaseFolders,
  fileName: string,
): Promise<string> {
  const storage = getStorage();
  const storageRef = ref(storage, folder + fileName);
  const metadata = { contentType: 'image/jpeg' };

  let file: any = await getBlobFromUri(imageUri);

  const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  return new Promise<string>(function (resolve, reject) {
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      },
    );
  });
}
