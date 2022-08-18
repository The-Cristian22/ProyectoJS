/*------------- Port -------------*/
const http = `http://localhost:5000`

/*--------------------------------- Users ----------------------------------*/
export const LOGIN = `${http}/auth/login`
export const NEW_USER = `${http}/users/save`
export const ALL_USERS = `${http}/users/all`
export const DELETE_USER = `${http}/users/delete`

/*--------------------------------- Vehicles ----------------------------------*/
export const ALL_VEHICLES = `${http}/vehicles/all`
export const NEW_VEHICLE = `${http}/vehicles/save`
export const DELETE_VEHICLE = `${http}/vehicles/delete`
export const FILTER_VEHICLES = `${http}/vehicles/all/filter`
export const DETAIL_VEHICLE = `${http}/vehicles/detail`