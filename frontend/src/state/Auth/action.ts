import {User} from '../../type';

type Action =
  | {
      type: "AUTH";
      payload:User|any;
    }
  | {
      type: "LOGOUT";
    }
  | {
      type: "SIGNUP";
      payload:User|any;
    };
 

export default Action;