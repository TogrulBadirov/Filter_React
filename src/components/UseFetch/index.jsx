import React from 'react'

const UseFetch = (url,callback) => {
  fetch(url).then((resp)=>resp.json()).then((data)=>callback(data))
}

export default UseFetch