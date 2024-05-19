import {
  checkCodeSchema,
  forgotPasswordSchema,
  newPasswordSchema,
} from "@/schema/authSchema";

export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    domain: string;
    company_name: string;
    access_token: string;
  };
};

export type checkCodeBody = checkCodeSchema & forgotPasswordSchema;
export type resetPasswordBody = checkCodeBody & resetPasswordSchema;
