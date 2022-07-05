import fetch from "auth/FetchInterceptor";

const exampleService = {};

exampleService.getPost = function (params) {
  return fetch({
    url: "/posts/1",
    method: "get",
    params,
  });
};

exampleService.setPost = function (data) {
  return fetch({
    url: "/posts",
    method: "post",
    data: data,
  });
};

exampleService.getUserById = function (id) {
  return fetch({
    url: `api/chatusers/users/${id}`,
    method: "get",
  });
};

export default exampleService;
