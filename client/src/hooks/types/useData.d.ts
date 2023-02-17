import { AxiosResponse } from "axios";
import { APIRoutes } from "../../constants/APIs";

type TCallAPIFunc = (
  APIRoute: keyof APIRoutes,
  method: 'GET' | 'POST',
  data?: any,
  formData?: boolean,
  alert?: boolean,
) => Promise<AxiosResponse | undefined>;

export { TCallAPIFunc };
