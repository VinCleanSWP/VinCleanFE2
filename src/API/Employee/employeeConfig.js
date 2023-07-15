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
    return api.get(`Process`);
}
export const updateStartWorkingAPI = (data) => {
    return api.put(`Process/StartWorking`,data);
}
export const updateEndWorkingAPI = (data) => {
    return api.put(`Process/EndWorking`,data);
}
export const getProcessImageAPIbyID = (id) => {
    return api.get(`ProcessImage/Process/${id}`);
}
export const updateProcessImageAPI = (data) => {
    return api.put(`ProcessImage/UpdateImage`,data);
}
export const updateSubPriceAPI = (data) => {
    return api.put(`Process/SubPrice`,data);
}
export const updateLocationAPI= (data) => {
    return api.put(`WorkingBy/Location`,data);
}