import axios from "axios";

type userRegisterData= {
    fullname: string,
    email: string,
    password: string
}
type userLoginData= {
    email: string,
    password: string
}
type userUpdateData = {
    fullname: string,
    email: string
}

type changePasswordData={
    oldPassword: string,
    newPassword: string
}


// USER APIS

export const registerUser = async (data:userRegisterData) => {
    console.log("DATA::", data)
    const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/register`, data, {withCredentials: true})
    return res.data
}

export const loginUser = async (data:userLoginData) => {
    const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/login`, data, {withCredentials: true})
    return res.data
}

export const getCurrentUser = async() => {
    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users/current-user`, {withCredentials: true})
    return res.data
}

export const getAllUserNames = async () => {
    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users/get-all-users-name`, {withCredentials: true})
    return res.data
}

export const updateUser = async (data:userUpdateData) => {
    const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/update-details`,data,  {withCredentials: true})
    return res.data
}

export const changePassword = async (data:changePasswordData) => {
    const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/change-password`,data,  {withCredentials: true})
    return res.data
}

