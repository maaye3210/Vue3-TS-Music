import { ElMessage, ElMessageBox } from 'element-plus'
import  type { AlertParam, ConfirmParam } from '@/models/message_alert'

/**
 * 消息提示
 * @param msg 提示信息
 * @param type 消息类型
 */
const message = (msg:string, type:"info" | "success" | "warning" | "error") => {
    ElMessage({
        showClose: true,
        message: msg,
        type: type
    });
}
/**
 * 成功提示
 * @param msg 提示信息
 */
const success = (msg:string) => {
    message(msg, 'success');
}
/**
 * 消息提示
 * @param msg 提示信息
 */
const info = (msg:string) => {
    message(msg, 'info');
}
/**
 * 错误提示
 * @param msg 提示信息
 */
const error = (msg:string) => {
    message(msg, 'error');
}

/**
 * 警告提示
 * @param msg 提示信息
 */

const warning = (msg:string) => {
    message(msg, 'warning');
}

/**
 * alert提示框
 * @param title 标题
 * @param msg 信息
 * @param ok ok函数
 * @param okText ok按钮文字
 */
const alert = ({title='提示', msg= '错误',ok, okText = '确定'}:AlertParam) => {
    ElMessageBox.alert(msg, title, {
        confirmButtonText: okText,
    }).then(ok);
}

/**
 * confirm 提示框
 * @param title 标题
 * @param msg 信息
 * @param ok ok函数
 * @param okText ok按钮文字
 * @param cancel 取消函数
 * @param cText cancel按钮文字
 */
const confirm = ({title, msg, ok, okText, cancel, cText}:ConfirmParam) => {
    ElMessageBox.confirm(msg, title ? title:'提示', {
        confirmButtonText: okText ? okText:'确定',
        cancelButtonText: cText ? cText:'取消',
    }).then(ok ? ok : () => {}).catch(cancel ? cancel : () => {});
}

export default {
    success,
    info,
    error,
    warning,
    alert,
    confirm,
}
