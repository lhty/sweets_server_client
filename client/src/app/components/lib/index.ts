import { UploadFile } from "../../@types/queryTypes";

interface IThumbInput {
  images: UploadFile | UploadFile[];
  index?: number;
  fullscreen?: number;
}

export const ThumbnailUrl = ({
  images,
  index = 0,
  fullscreen = -1,
}: IThumbInput) => {
  const size = window.innerWidth;
  const prefix = (size: number) => {
    switch (true) {
      case fullscreen >= 0:
        return "/uploads/";
      case size <= 800:
        return "/uploads/small_";
      case size > 1680:
        return "/uploads/large_";
      default:
        return "/uploads/medium_";
    }
  };

  const slicePath = ({ url }: { url: string }) => url.substring(9);
  const path = slicePath(Array.isArray(images) ? images[index] : images);

  const src = process.env.API_URL + prefix(size) + path;
  const original = process.env.API_URL + "/uploads/" + path;

  const doesExist = (src: string) => {
    const img = new Image();
    img.src = src;
    return img.width !== 0 ? src : original;
  };
  return doesExist(src);
};

export const makeStrShorter = (str: string, n: number): string =>
  str.substring(0, str.indexOf(" ", n + 1)) + " ...";
