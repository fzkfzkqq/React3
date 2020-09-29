import { postData, updateData, getData } from "./Helper";
const url = 'https://keyninja-internal.azurewebsites.net/api/Dashboard/ListProperties'
export const postInstantJob = job =>
    postData(`/api/Data/Job`, job);

export const putInstantJob = job =>
    updateData(`/api/Data/Job`, job);

export const confirmInstantJob = job =>
    postData(`/api/Data/Confirm`, job);

export const postPaymentIntent = intent =>
    postData(`/api/Data/PaymentIntent`, intent);

export const postEnquiry = job =>
    postData(`/api/Data/Enquiry`, job);

export const postLogin = login =>
    postData('/api/Data/Login', login);

export const getProperties = getPropertyModel=>
    getData('/api/Data/getProperties', getPropertyModel);