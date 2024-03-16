import ImageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity";

const builder = ImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}