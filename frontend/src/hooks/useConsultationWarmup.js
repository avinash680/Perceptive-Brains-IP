import { useEffect } from "react";
import { warmUpConsultationApi } from "../api/consultation";

export function useConsultationWarmup() {
  useEffect(() => {
    warmUpConsultationApi();
  }, []);
}
