
export const useFetch = () => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const CustomFetchPOSTRequest = async (URL, data) => {
    await fetch(URL, { ...options, body: JSON.stringify(data) })
      .then(res => {
        if (!res.ok) {
          throw Error(res.status);
        }
        return res.json();
      }).catch(e => {
        console.log(e);
      });
  }

  return {
    CustomFetchPOSTRequest
  }
}
