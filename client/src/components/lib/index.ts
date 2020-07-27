import { Product, UploadFile } from "graphql/queryTypes";

export const ThumbnailUrl = (image: UploadFile[]) => {
  const size = window.innerWidth;
  const prefix = (size: number) => {
    switch (true) {
      case size <= 800:
        return "/uploads/thumbnail_";
      case size > 2000:
        return "/uploads/";
      default:
        return "/uploads/medium_";
    }
  };

  return process.env.API_URL + prefix(size) + image[0].url.substring(9);
};

export const makeBundle = (input: Product[]) => {
  return (
    input &&
    (input.length > 1
      ? input.map((product: Product) => ({ ...product, ...makeSet(product) }))
      : { ...input[0], ...makeSet(input[0]) })
  );
};

const makeSet = ({ items, _schema, proportion: { price = 0 } }: Product) => {
  const set = [];
  for (let element of _schema.split(",")) {
    let item = parseInt(element)
      ? items.find((item) => item.id === element)
      : {
          ...items.find((item) => item.name === "Буква"),
          letter: element,
        };
    price += item.price;
    set.push(item);
  }
  return {
    set,
    price,
    size: set.length,
  };
};

export const makeStrShorter = (str: string, n: number): string =>
  str.substring(0, str.indexOf(" ", n + 1)) + " ...";
