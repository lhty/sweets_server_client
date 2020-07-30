import { UploadFile } from "graphql/queryTypes";

export const ThumbnailUrl = (image: UploadFile[]) => {
  const size = window.innerWidth;
  const prefix = (size: number) => {
    switch (true) {
      case size <= 800:
        return "/uploads/small_";
      case size > 2000:
        return "/uploads/";
      default:
        return "/uploads/medium_";
    }
  };

  return process.env.API_URL + prefix(size) + image[0].url.substring(9);
};

export const makeStrShorter = (str: string, n: number): string =>
  str.substring(0, str.indexOf(" ", n + 1)) + " ...";
