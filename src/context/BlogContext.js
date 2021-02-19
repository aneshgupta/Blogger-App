import createDataContext from "./createDataContext";
import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) => {
  switch (action.type) {
    case "get":
      return action.payload;
    case "add":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 9999),
          title: action.payload.title,
          content: action.payload.content,
        },
      ];
    case "delete":
      return state.filter((blogPost) => blogPost.id !== action.payload);
    case "edit":
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => {
  return async ()=> {
    const response = await jsonServer.get('/blogposts');
    dispatch({type: 'get', payload: response.data});
  };
};

const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    const response =  await jsonServer.post('/blogposts', { title, content});

    // dispatch({ type: "add", payload: { title, content } });
    callback();
  };
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogposts/${id}`);

    dispatch({ type: "delete", payload: id });
  };
};

const editBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogposts/${id}`, { title, content});

    dispatch({ type: "edit", payload: { id, title, content } });
    callback();
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);