import axios  from "axios";
axios.defaults.baseURL = 'http://localhost:8082/demo06_war_exploded/json/getJson';

axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = function (data) {
	console.log(data);
	console.log(222222);
	if (!data) return data;
	let result = ``;
	for (let attr in data) {
		if (!data.hasOwnProperty(attr)) break;
		result += `&${attr}=${data[attr]}`;
	}
	return result.substring(1);
};
axios.defaults.timeout = 300;
axios.interceptors.response.use(function onFulfilled(response) {
	console.log("成功");
	return response.data;
}, function onRejected(reason) {
	console.log("失败");
	return Promise.reject(reason);
});