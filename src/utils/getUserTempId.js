// 创建临时标识
import {v4 as uuidv4} from 'uuid';

function getUserTempId(){
    let userTempId = localStorage.getItem('userTempId_key');
    if(!userTempId){
        userTempId = uuidv4();
        localStorage.setItem('userTempId_key', userTempId);
    }
    return userTempId;
}

export default getUserTempId;