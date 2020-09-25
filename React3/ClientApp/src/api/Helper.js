import queryString from "query-string";
import Promise from "bluebird";

Promise.config({ cancellation: true });

const getURI = (uri, data) => {
    if (data == null) {
        return uri;
    }
    const newData = Object.entries(data).reduce(
        (x, [key, value]) => ({ ...x, [key]: typeof (value) === "object" ? JSON.stringify(value) : value }), {}
    );
    return `${uri}?${queryString.stringify(newData)}`;
};

const processResponse = (response) => new Promise(
    (resolve, reject) => {
        if (response.ok) {
            response.text().then(text => {
                try {
                    const json = JSON.parse(text);
                    const isApiJsonResponse = (typeof (json) === "object" && json.responseType === "ApiJsonResponse");
                    if (isApiJsonResponse) {
                        if (!json.ok) {
                            if (json.level === "warning") {
                                // handle it in the parents
                                reject(json.error);
                            } else {
                                //eventEmitter.emit(NOTIFY, {
                                //    title: "Server error",
                                //    message: json.error,
                                //    level: "error"
                                //});
                                reject(json.error);
                            }
                        } else {
                            resolve(json.data);
                        }
                    } else {
                        resolve(json);
                    }
                } catch (e) {
                    if (text.length === 0) {
                        resolve();
                    } else {
                        reject(text);
                    }
                }
            });
        } else {
            //eventEmitter.emit(NOTIFY, {
            //    title: "Server error",
            //    message: response.statusText,
            //    level: "error"
            //});
            reject(response.statusText);
        }
    }
)

const request = (method, uri, data) => {
    let requestFunc;
    window.data = data;
    switch (method) {
        case "GET":
            requestFunc = () => fetch(getURI(uri, data), {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Accept-Charset": "utf-8",
                    "Content-Type": "application/json"
                },
                credentials: "same-origin",
            });
            break;
        default:
            requestFunc = () => fetch(uri, {
                method: method,
                headers: {
                    Accept: "application/json",
                    "Accept-Charset": "utf-8",
                    "Content-Type": "application/json"
                },
                credentials: "same-origin",
                cors: "no-cors",
                body: JSON.stringify(data)
            });
            break;
    }
    return new Promise((resolve, reject) => requestFunc().then(
        response => resolve(response)
    ).catch(
        error => {
            //eventEmitter.emit(NOTIFY, {
            //    title: "Network error",
            //    body: error.message,
            //    level: "warning"
            //});
            reject(error.message);
        }
    ))
}

export const getData = (uri, data) => request("GET", uri, data).then(
    response => processResponse(response)
);

export const postData = (uri, data) => request("POST", uri, data).then(
    response => processResponse(response)
);

export const updateData = (uri, data) => request("PUT", uri, data).then(
    response => processResponse(response)
);

export const deleteData = (uri, data) => request("DELETE", uri, data).then(
    response => processResponse(response)
);