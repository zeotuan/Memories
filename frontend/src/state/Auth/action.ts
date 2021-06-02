import {User} from '../../type';

type Action =
  | {
      type: "AUTH";
      payload:User;
    }
  | {
      type: "LOGOUT";
    }
  | {
      type: "SIGNUP";
      payload:User;
    };
 

export default Action;