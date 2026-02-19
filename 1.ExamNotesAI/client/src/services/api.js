import axios from 'axios'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'

export const getUser = async (dispatch) => {
    try {
        const result = await axios.get(`${serverUrl}/api/auth/current-user`,{withCredentials:true})
        dispatch(setUserData(result.data.user))
    } catch (error) {
        console.log(error);
    }
}