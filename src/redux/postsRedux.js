import Axios from 'axios';

/* selectors */
export const getAll = ({posts}) => posts.data;
export const getPost = ({posts}, postID) => {
  const post = posts.data.filter(post => post.id === parseInt(postID));
  return post[0];
};
export const getUsers = ({users}) => users;
export const currentUser = ({currentUser}) => currentUser.id;


/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_POST = createActionName('ADD_POST');
const EDIT_POST = createActionName('EDIT_POST');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addPost = payload => ({ payload, type: ADD_POST });
export const editPost = payload => ({ payload, type: EDIT_POST });
/* thunk creators */
export const fetchPublished = () => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .get('http://localhost:8000/api/posts')
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const updateThisPost = (id, newPost) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    console.log('fetch started');
    Axios
      .put(`http://localhost:8000/api/posts/${id}`, newPost)
      .then(res => {
        console.log('succes');
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        console.log('error');
        dispatch(fetchError(err.message || true));
      });
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case ADD_POST: {
      return {
        ...statePart,
        data: [
          ...statePart.data,
          action.payload,
        ],
      };
    }
    case EDIT_POST: {
      return {
        ...statePart,
        data: statePart.data.map((post) => {
          return post._id === action.payload._id ? action.payload : post;
        }),
      };
    }
    default:
      return statePart;
  }
};
