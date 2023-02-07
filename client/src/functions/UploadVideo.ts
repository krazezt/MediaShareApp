import { FirebaseFolders } from '../constants/config/FirebaseFolders';
import { TCallAPIFunc } from '../hooks/types';

export default async function uploadVideo(
  video: any,
  folder: FirebaseFolders,
  fileName: string,
  callAPI: TCallAPIFunc,
): Promise<string> {
  const formData = new FormData();
  formData.append('file', { ...video, type: 'video/mp4', name: fileName });

  const res = await callAPI('UPLOAD_FILE', 'POST', formData, true);

  return res?.data.url;
}
