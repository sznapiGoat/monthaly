import { getImageProps, type ImageProps } from "next/image";

// Optimalizovaný obrázek bez klientského JavaScriptu. <Image> z next/image je klientská komponenta,
// kterou React musí na každé stránce oživit; tady vznikne jen obyčejný <img> se srcset už na serveru.
export function Img(input: ImageProps) {
  const { props } = getImageProps(input);
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text -- props z getImageProps obsahují alt i srcset
  return <img {...props} />;
}
