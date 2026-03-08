const getAuthData = () => {
  if (typeof window !== "undefined") {
    const tokenData = localStorage.getItem("Booktoken");
    if (tokenData) {
      try {
        const parsed = JSON.parse(tokenData);
        return {
          token: parsed.token || "",
          userId: parsed.id || ""
        };
      } catch (e) {
        return { token: "", userId: "" };
      }
    }
  }
  return { token: "", userId: "" };
};

const url = process.env.NEXT_PUBLIC_BASE_URL;


export const addBook = async (payload: any) => {
  try {
    const { token, userId } = getAuthData();
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


export const allbook = async () => {
  try {
    const { token } = getAuthData();
    const res = await fetch(`${url}/api/allbooks`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (error) {
    console.error("Error fetching books:", error);
    return { ok: false, error };
  }
};
