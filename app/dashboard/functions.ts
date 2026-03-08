
 let token = "";
 let userId = "";
 

const tokenData = localStorage.getItem("Booktoken");

if (tokenData) {
  const parsed = JSON.parse(tokenData);
  token = parsed.token;
  userId = parsed.id;

  console.log(parsed, "parsed Data ")
}


export const addBook = async (payload: any) => {
  try {
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/addBook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ ...payload, userId }),
    });

    const data = await res.json();
    return { ok: res.ok, data };
  } catch (error) {
    console.error("Error adding book:", error);
    return { ok: false, error };
  }
};