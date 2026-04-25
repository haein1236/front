import http from "../http";
import { ENDPOINT } from "../endpoint";
export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  nom: string;
  prenom: string;
  email: string;
  password: string;
};

export const authService = {
  
  login: async (data: LoginData) => {
    return http(ENDPOINT.LOGIN, {
      method: "POST",
      body: data,
    });
  },

  register: async (data: RegisterData) => {
    return http(ENDPOINT.REGISTER, {
      method: "POST",
      body: data,
    });
  },
};
