import { useState } from "react";

import axios from "axios";
import { environment } from "@/environments/environment";



axios.defaults.baseURL = environment




interface UseAxiosParams {
  url: string;
  method: "get" | "post" | "put" | "delete";
  data?: unknown;
}


