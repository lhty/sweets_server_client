import { UploadFile } from "../../@types/queryTypes";

export const ThumbnailUrl = (
  images: UploadFile | UploadFile[],
  index: number = 0,
  fullscreen: number = -1
) => {
  const size = window.innerWidth;
  const prefix = (size: number) => {
    switch (true) {
      case fullscreen >= 0:
        return "/uploads/";
      case size <= 800:
        return "/uploads/small_";
      case size > 1920:
        return "/uploads/large_";
      default:
        return "/uploads/medium_";
    }
  };

  return Array.isArray(images)
    ? process.env.API_URL + prefix(size) + images[index].url.substring(9)
    : process.env.API_URL + prefix(size) + images.url.substring(9);
};

export const makeStrShorter = (str: string, n: number): string =>
  str.substring(0, str.indexOf(" ", n + 1)) + " ...";
