export default function getFileName(uri: string) {
  return uri.substring(uri.lastIndexOf('/') + 1);
}