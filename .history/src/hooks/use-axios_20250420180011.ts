import { useState } from "react";

import axios from "axios";



axios.defaults.base




interface UseAxiosParams {
  url: string;
  method: "get" | "post" | "put" | "delete";
  data?: unknown;
}


