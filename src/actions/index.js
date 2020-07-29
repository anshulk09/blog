import jsonPlaceholder from '../apis/jsonPlaceholder';
import _ from 'lodash';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  // const userIds = _.uniq(_.map(getState().posts, 'userId'));
  // userIds.forEach((id) => dispatch(fetchUser(id)));

  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach((id) => dispatch(fetchUser(id)))
    .value();
};

export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceholder.get('./posts');
  dispatch({
    type: 'FETCH_POSTS',
    payload: response.data,
  });
};

export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceholder.get(`./users/${id}`);

  dispatch({
    type: 'FETCH_USER',
    payload: response.data,
  });
};

// export const fetchUser = (id) => (dispatch) => _fetchUser(id, dispatch);

// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`./users/${id}`);

//   dispatch({
//     type: 'FETCH_USER',
//     payload: response.data,
//   });
// });

// export const fetchUser = function (id) {
//   //if memoize used here, as this function is always going to return a new function, so memoize function will always run that inner function. outer function will be memoized but inner function will always go to thunk
//   return _.memoize(async function (dispatch) {
//     //if we use here, outer function will return a new function every time with a new address, so it will not have any relation to previously memoized function
//     const response = await jsonPlaceholder.get(`./users/${id}`);

//     dispatch({
//       type: 'FETCH_USER',
//       payload: response.data,
//     });
//   });
// };
