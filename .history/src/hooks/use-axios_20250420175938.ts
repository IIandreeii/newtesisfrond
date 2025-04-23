import { useState } from "react";

import axios from "axios";

interface UseAxiosParams {
  url: string;
  method: "get" | "post" | "put" | "delete";
  data?: unknown;
}

export const UseAxios = <T>() => {


    const execute = async (axiosParams: UseAxiosParams): Promise<T>|undefined => {


        
    }


};
