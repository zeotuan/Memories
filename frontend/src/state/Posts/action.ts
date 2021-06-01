import {Post} from '../../type';
import {getPostsResult} from '../../api/post';
type Action =
  | {
      type: "FETCH_ALL";
      payload: getPostsResult;
    }
  | {
      type: "FETCH_BY_SEARCH";
      payload: Array<Post>;
    }
  | {
      type: "CREATE";
      payload: Post;
    }
  | {
      type: "UPDATE";
      payload: Post;
    }
  | {
      type:"DELETE";
      payload: Post['_id'];
  }
  | {
      type:"LIKE";
      payload: Post;
  }
  | {
      type:"GET_POST";
      payload: Post;
  }
  | {
      type:"START_LOADING";
  }
  | {
      type:"STOP_LOADING";
   };


export default Action;