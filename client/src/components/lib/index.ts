import { UploadFile } from "graphql/queryTypes";

export const ThumbnailUrl = (image: UploadFile[], fullscreen: number = -1) => {
  const size = window.innerWidth;
  const prefix = (size: number) => {
    switch (true) {
      case fullscreen >= 0:
        return "/uploads/";
      case size <= 800:
        return "/uploads/small_";
      case size > 2000:
        return "/uploads/large_";
      default:
        return "/uploads/medium_";
    }
  };

  const index = fullscreen >= 0 ? fullscreen : 0;

  return process.env.API_URL + prefix(size) + image[index].url.substring(9);
};

export const makeStrShorter = (str: string, n: number): string =>
  str.substring(0, str.indexOf(" ", n + 1)) + " ...";
