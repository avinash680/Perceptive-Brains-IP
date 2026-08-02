import { useEffect } from "react";
import { warmUpConsultationApi } from "../api/consultation";

let warmupAttempted = false;

export function useConsultationWarmup() {
  useEffect(() => {
    if (warmupAttempted) return;

    warmupAttempted = true;
    warmUpConsultationApi();
  }, []);
}
