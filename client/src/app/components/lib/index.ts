import { UploadFile } from "../../@types/queryTypes";

export const ThumbnailUrl = ({
  source,
  index = 0,
  fullscreen = -1,
  screenWidth = window.innerWidth,
}: {
  source: UploadFile[];
  index?: number;
  fullscreen?: number;
  screenWidth?: number | "thumb";
}) => {
  if (Array.isArray(source) && !source.length)
    return { url: null, width: null, height: null };
  const sizes = source.reduce(
    (acc, file) => [
      ...acc,
      {
        0: {
          url: file.formats.thumbnail?.url,
          width: file.formats.thumbnail?.width,
          height: file.formats.thumbnail?.height,
        },
        1: { url: file.url, width: file.width, height: file.height },
        2: {
          url: file.formats.small?.url,
          width: file.formats.small?.width,
          height: file.formats.small?.height,
        },
        3: {
          url: file.formats.medium?.url,
          width: file.formats.medium?.width,
          height: file.formats.medium?.height,
        },
        4: {
          url: file.formats.large?.url,
          width: file.formats.large?.width,
          height: file.formats.large?.height,
        },
      },
    ],
    []
  );
  const sizeIndex = (screenWidth: number | "thumb") => {
    switch (true) {
      case fullscreen >= 0:
        return 1;
      case screenWidth === "thumb":
        return 0;
      case screenWidth <= 800:
        return 2;
      case screenWidth > 1680:
        return 4;
      default:
        return 3;
    }
  };
  const doesExist = (i: number): number =>
    sizes[index][i].url ? i : doesExist(Math.max(0, i - 1));
  const { url, width, height } = sizes[index][
    doesExist(sizeIndex(screenWidth))
  ];
  return {
    url: process.env.API_URL + url,
    width,
    height,
  };
};

export const makeStrShorter = (str: string, n: number): string =>
  str.substring(0, str.indexOf(" ", n + 1)) + " ...";
