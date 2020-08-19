/* selectors */
export const getUsers = ({users}) => users;

/* action name creator */
const reducerName = 'users';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const LOGIN = createActionName('LOGIN');

/* action creators */
export const fetchStarted = payload => ({ payload, type: LOGIN });

/* thunk creators */

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...statePart,
      };
    }
    default:
      return statePart;
  }
};
