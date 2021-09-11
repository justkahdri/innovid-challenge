type getServerDataT = (id: number) => Promise<number>;
interface ServerData {
  id: number;
  load: number;
}

const getServerData: getServerDataT = async (id) => {
  const response = await fetch(`http://localhost:8000/status/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status == 200) {
    const parsedResponse: ServerData = await response.json();

    return parsedResponse.load;
  } else {
    // TODO: handle error
    throw new Error(`Failed to fetch on Server #${id}: code ${response.status}`);
  }
};

export default getServerData;
