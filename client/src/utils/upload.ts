import axios from './axios';
import { uploadConst } from 'constants/index';

const { CLOUDINARY_URL, CLOUDINARY_UPLOAD_PRESET } = uploadConst;

export const checkImage = (file: any) => {
  let err = '';
  if (!file) return (err = 'File does not exist');

  if (file.size > 1024 * 1024)
    // 1mb
    err = 'The largets image size is 1MB';
  if (file.type !== 'image/jpeg' && file.type !== 'image/png') err = 'Image format is incorrect';

  return err;
};

export const imageUpload = async (image: any) => {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  const res = await axios.post(CLOUDINARY_URL, formData);
  const { data } = res;

  return { public_id: data.public_id, url: data.secure_url };
};
