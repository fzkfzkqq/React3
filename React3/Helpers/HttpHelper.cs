
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Cache;
using System.Web;

namespace React3.Helpers
{
    public class HttpHelper
    {
        public static JToken SendRequest(string url, object body, Dictionary<string, string> headers, string method)
        {
            var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
            httpWebRequest.Method = method;
            if (body != null)
            {
                using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
                {
                    string json = JsonConvert.SerializeObject(body);
                    streamWriter.Write(json);
                }
            }
            if (headers != null)
            {
                foreach (var key in headers.Keys)
                {
                    var value = headers[key];
                    httpWebRequest.Headers.Add(key, value);
                }
            }

            httpWebRequest.ContentType = "application/json; charset=UTF-8";
            httpWebRequest.CachePolicy = new HttpRequestCachePolicy(HttpRequestCacheLevel.NoCacheNoStore);
            //httpWebRequest.UserAgent = @"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.75 Safari/537.36";
            httpWebRequest.UserAgent = @"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36";
            //httpWebRequest.UserAgent = @"Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36";
            WebResponse response = null;
            try
            {
                response = httpWebRequest.GetResponse();
            }
            catch (WebException ex)
            {
                using (var stream = ex.Response.GetResponseStream())
                using (var reader = new StreamReader(stream))
                {
                    string errorString = reader.ReadToEnd();
                    var error = JsonConvert.DeserializeObject<JToken>(errorString);
                    return error;
                }
            }
            catch (Exception ex)
            {

            }
            JToken data = null;
            using (Stream dataStream = response.GetResponseStream())
            {
                StreamReader reader = new StreamReader(dataStream);
                string result = reader.ReadToEnd();
                data = JsonConvert.DeserializeObject<JToken>(result);
            }
            return data;
        }
        public static JToken PostHttpRequest(string url, object body, Dictionary<string, string> headers)
        {
            string method = "POST";
            var data = SendRequest(url, body, headers, method);
            return data;
        }

        public static JToken PutHttpRequest(string url, object body, Dictionary<string, string> headers)
        {
            string method = "PUT";
            var data = SendRequest(url, body, headers, method);
            return data;
        }

        public static JToken GetHttpRequest(string url, object body, Dictionary<string, string> headers)
        {
            IEnumerable<string> properties = null;
            string queryString = string.Empty;
            if (body != null)
            {
                properties = from p in body.GetType().GetProperties()
                             where p.GetValue(body, null) != null
                             select p.Name + "=" + HttpUtility.UrlEncode(p.GetValue(body, null).ToString());
                queryString = String.Join("&", properties.ToArray());
            }
            url = string.IsNullOrWhiteSpace(queryString) ? $"{url}" : $"{url}?{queryString}";
            var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
            httpWebRequest.Method = "GET";
            if (headers != null)
            {
                foreach (var key in headers.Keys)
                {
                    var value = headers[key];
                    httpWebRequest.Headers.Add(key, value);
                }
            }
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.CachePolicy = new HttpRequestCachePolicy(HttpRequestCacheLevel.NoCacheNoStore);
            //httpWebRequest.UserAgent = @"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.75 Safari/537.36";
            httpWebRequest.UserAgent = @"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36";
            //httpWebRequest.UserAgent = @"Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36";

            JToken data = null;
            WebResponse response = null;
            try
            {
                response = httpWebRequest.GetResponse();
                using (Stream dataStream = response.GetResponseStream())
                {
                    StreamReader reader = new StreamReader(dataStream);
                    string result = reader.ReadToEnd();
                    data = JsonConvert.DeserializeObject<JToken>(result);
                }

                return data;
            }
            catch (WebException ex)
            {
                using (var stream = ex.Response.GetResponseStream())
                using (var reader = new StreamReader(stream))
                {
                    string errorString = reader.ReadToEnd();
                    var error = JsonConvert.DeserializeObject<JToken>(errorString);
                    return error;
                }
            }
        }
    }
}
