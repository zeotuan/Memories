import {NotificationState} from '../../type';

type Action =
  | {
      type: "SET_NOTIFICATION";
      payload:NotificationState;
    }
  | {
      type: "SET_SUCCESS_NOTIFICATION";
      payload:NotificationState
    }
  | {
      type: "SET_ERROR_NOTIFICATION";
      payload:NotificationState;
    }
  | {
      type: "HIDE_NOTIFICATION";
    };
 

export default Action;