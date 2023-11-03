import { DraftData } from "@type/draft";
import axios from "axios";
import { DataResponse } from "~/types/response";

export const fetchDraft = async <T extends DataResponse<DraftData>>(
  id: string
): Promise<T> => {
  const { data } = await axios.get<T>(`/draft/${id}/contract`);
  return data;
};
