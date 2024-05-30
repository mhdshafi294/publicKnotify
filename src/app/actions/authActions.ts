"use server";

import {
  forgotPasswordSchema,
  newPasswordSchema,
  signUpSchema,
} from "@/schema/authSchema";
import ConfirmCheckCode from "@/services/auth/check-code";
import newPassword from "@/services/auth/new-password";
import sendCode from "@/services/auth/send-code";
import signUp from "@/services/auth/sign-up";
import confirmVerificationCode from "@/services/auth/verification-code";

// // export const signInAction = async (
// //   phone: string,
// //   password: string,
// //   type: string
// // ) => {
// //   // TODO
// //   const signInResponse = await signIn("credentials", {
// //     phone: phone,
// //     password: password,
// //     type: type,
// //     redirect: false,
// //     callbackUrl: "/", // TODO: Add callback url
// //   });
// //   return signInResponse;
// // };

export const signUpAction = async ({
  formData,
  type,
}: {
  formData: FormData;
  type: string;
}) => {
  const signUpResponse = await signUp({ formData, type });
  return signUpResponse;
};

export const ConfirmCheckCodeAction = async ({
  code,
  phone,
  type,
}: {
  code: string;
  phone: string;
  type: string;
}) => {
  const ConfirmCheckCodeResponse = await ConfirmCheckCode({
    code,
    phone,
    type,
  });
  return ConfirmCheckCodeResponse;
};

export const sendCodeAction = async ({
  body,
  type,
}: {
  body: forgotPasswordSchema;
  type: string;
}) => {
  const sendCodeResponse = await sendCode({
    body,
    type,
  });
  return sendCodeResponse;
};

export const newPasswordAction = async ({
  newPasswordData,
  phone,
  code,
  type,
}: {
  newPasswordData: newPasswordSchema;
  phone: string;
  code: string;
  type: string;
}) => {
  const newPasswordResponse = await newPassword({
    newPasswordData,
    phone,
    code,
    type,
  });
  return newPasswordResponse;
};

export const confirmVerificationCodeAction = async ({
  code,
  phone,
  type,
}: {
  code: string;
  phone: string;
  type: string;
}) => {
  const confirmVerificationCodeResponse = await confirmVerificationCode({
    code,
    phone,
    type,
  });
  return confirmVerificationCodeResponse;
};
