import { UploadFile } from "../../@types/queryTypes";

interface IThumbInput {
  source: UploadFile | UploadFile[];
  index?: number;
  fullscreen?: number;
  size?: number | "thumb";
}

export const ThumbnailUrl = ({
  source,
  index = 0,
  fullscreen = -1,
  size = window.innerWidth,
}: IThumbInput) => {
  // formats:
  // large: {name: "large_fractured_space_captain_jonesy-wallpaper-1920x1080.jpg",
  //  hash: "large_fractured_space_captain_jonesy_wallpaper_1920x1080_827d5fbd70",
  //  ext: ".jpg",
  //  mime: "image/jpeg",
  // url: "url",
  //  width: 1000
  // }
  // medium: {name: "medium_fractured_space_captain_jonesy-wallpaper-1920x1080.jpg", hash: "medium_fractured_space_captain_jonesy_wallpaper_1920x1080_827d5fbd70", ext: ".jpg", mime: "image/jpeg", width: 750, …}
  // small: {name: "small_fractured_space_captain_jonesy-wallpaper-1920x1080.jpg", hash: "small_fractured_space_captain_jonesy_wallpaper_1920x1080_827d5fbd70", ext: ".jpg", mime: "image/jpeg", width: 500, …}
  // thumbnail: {name: "thumbnail_fractured_space_captain_jonesy-wallpaper-1920x1080.jpg", hash: "thumbnail_fractured_space_captain_jonesy_wallpaper_1920x1080_827d5fbd70", ext: ".jpg", mime: "image/jpeg", width: 245, …}
  // __proto__: Object
  // id: "9"
  // url: "/uploads/fractured_space_captain_jonesy_wallpaper_1920x1080_827d5fbd70.jpg"
  // __typename: "UploadFile"
  // __proto__: Object

  if (Array.isArray(source) && !source.length) return null;
  const prefix = (size: number | "thumb") => {
    switch (true) {
      case fullscreen >= 0:
        return "/uploads/";
      case size === "thumb":
        return "/uploads/thumbnail_";
      case size <= 800:
        return "/uploads/small_";
      case size > 1680:
        return "/uploads/large_";
      default:
        return "/uploads/medium_";
    }
  };

  const slicePath = ({ url }: { url: string }) => url.substring(9);
  const path = slicePath(Array.isArray(source) ? source[index] : source);

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
