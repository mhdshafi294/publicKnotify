"use server";

import { forgotPasswordSchema, newPasswordSchema } from "@/schema/authSchema"; // Import schemas for validation
import confirmCheckCode from "@/services/auth/check-code"; // Service to confirm check code
import newPassword from "@/services/auth/new-password"; // Service to set a new password
import sendCode from "@/services/auth/send-code"; // Service to send verification code
import signUp from "@/services/auth/sign-up"; // Service to sign up a new user
import confirmVerificationCode from "@/services/auth/verification-code"; // Service to confirm verification code

/**
 * Action to handle user sign-up.
 * @param {Object} params - The parameters for the sign-up action.
 * @param {FormData} params.formData - The form data for sign-up.
 * @param {string} params.type - The type of the sign-up request.
 * @returns {Promise<any>} - The response from the sign-up service.
 */
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

/**
 * Action to handle check code confirmation.
 * @param {Object} params - The parameters for the check code confirmation.
 * @param {string} params.code - The code to be confirmed.
 * @param {string} params.phone - The phone number associated with the code.
 * @param {string} params.type - The type of the request.
 * @returns {Promise<any>} - The response from the check code confirmation service.
 */
export const confirmCheckCodeAction = async ({
  code,
  phone,
  type,
}: {
  code: string;
  phone: string;
  type: string;
}) => {
  const confirmCheckCodeResponse = await confirmCheckCode({
    code,
    phone,
    type,
  });
  return confirmCheckCodeResponse;
};

/**
 * Action to handle sending a verification code.
 * @param {Object} params - The parameters for sending the code.
 * @param {forgotPasswordSchema} params.body - The body of the request.
 * @param {string} params.type - The type of the request.
 * @returns {Promise<any>} - The response from the send code service.
 */
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

/**
 * Action to handle setting a new password.
 * @param {Object} params - The parameters for setting the new password.
 * @param {newPasswordSchema} params.newPasswordData - The new password data.
 * @param {string} params.phone - The phone number associated with the request.
 * @param {string} params.code - The code for the request.
 * @param {string} params.type - The type of the request.
 * @returns {Promise<any>} - The response from the new password service.
 */
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

/**
 * Action to handle verification code confirmation.
 * @param {Object} params - The parameters for the verification code confirmation.
 * @param {string} params.code - The verification code.
 * @param {string} params.phone - The phone number associated with the code.
 * @param {string} params.type - The type of the request.
 * @returns {Promise<any>} - The response from the verification code confirmation service.
 */
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
