import { useCallback, useContext } from "react";
import { BRIXBITContext } from "@/contexts/BRIXBITContext";
import { clearCache as _clearCache } from "@/helpers/caching/db";

/**
 * This hook returns the local DB instance and a method for clearing all of
 * its data
 */
export const useDb = () => {
  const brixbitContext = useContext(BRIXBITContext);
  const { db } = brixbitContext;

  /**
   * Clear all data in the local cache
   */
  const clearCache = useCallback(async () => {
    // clear all data
    await _clearCache(db);
  }, [db]);

  return { clearCache, db };
};
