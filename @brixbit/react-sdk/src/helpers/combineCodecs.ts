import type { ContentCodec } from "@brixbit/brixbit-js";
import {
  defaultContentTypeConfigs,
  type ContentTypeConfiguration,
} from "@/helpers/caching/db";

/**
 * Formats all codecs into a simple array
 *
 * @param contentTypeConfigs The content types configuration to extract the codecs from
 * @returns An array of codecs
 */
export const combineCodecs = (
  contentTypeConfigs?: ContentTypeConfiguration[],
) => {
  const finalCacheConfig = [
    ...defaultContentTypeConfigs,
    ...(contentTypeConfigs ?? []),
  ];
  return finalCacheConfig.reduce(
    (result, config) => [...result, ...(config.codecs ?? [])],
    [] as ContentCodec<any>[],
  );
};
