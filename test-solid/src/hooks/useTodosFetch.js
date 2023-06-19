import axios from "axios";

import { useEffect } from "react";

export function useTodosFetch() {
  useEffect(() => {
    const data = axios.get("url");
  }, []);
}
