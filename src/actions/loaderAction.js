import { IS_LOADING } from "./types";

export const loader = isLoading => ({
  type: IS_LOADING,
  isLoading
});
