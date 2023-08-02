import api from "../Employee/employeeAPI";
const END_POINT = "Employee";

export const getAllEmployeeAPI = () => {
    return api.get(`${END_POINT}`);
}
export const delEmployeeAPI = (id) => {
    return api.delete(`${END_POINT}/${id}`);
}
export const updateEmployeeAPI = (data) => {
    return api.put(`${END_POINT}`, data);
}
export const addEmployeeAPI = (data) => {
    return api.post(`${END_POINT}`, data);
}
export const selectEmployeeAPI = (StarTime, EndTime, Date) => {
    return api.post(`${END_POINT}/selectemployee/`, {
        params: {
            StarTime: StarTime,
            EndTime: EndTime,
            Date: Date
        }
    });
}
export const getProcessAPI = () => {
    return api.get(`Order`);
}
export const updateStartWorkingAPI = (data) => {
    return api.put(`Order/StartWorking`,data);
}
export const updateEndWorkingAPI = (data) => {
    return api.put(`Order/EndWorking`,data);
}
export const getProcessImageAPIbyID = (id) => {
    return api.get(`OrderImage/Order/${id}`);
}
export const updateProcessImageAPI = (data) => {
    return api.put(`OrderImage/UpdateImage`,data);
}
export const updateSubPriceAPI = (data) => {
    return api.put(`Order/SubPrice`,data);
}
export const updateLocationAPI= (data) => {
    return api.put(`Location/Location`,data);
}
export const updateCanncelJobAPI = (data) => {
    return api.post(`OrderRequest`,data);
}
export const GetOrderRangeAPI = (data) => {
    return api.post(`Order/OrderRange`,data);
}
export const GetOrderbyIDAPI = (id) => {
    return api.get(`Order/${id}`);
}
export const GetAllOrderRangeAPI = (data) => {
    return api.post(`Order/GetAllOrderRange`,data);
}