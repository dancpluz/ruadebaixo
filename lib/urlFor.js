import { client } from "./sanity.client";
import imageUrlBuilder from "@sanity/image-url";

// Url-builder do sanity para acessar imagens

const builder = imageUrlBuilder(client);

export default function urlFor(source) {
  return builder.image(source);
}