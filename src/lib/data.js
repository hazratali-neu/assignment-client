// ... existing tutor functions ...

export const getRooms = async () => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${apiURL}/rooms`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch rooms: ${res.status}`);
    return await res.json() || [];
  } catch (error) {
    console.error("Error fetching rooms data:", error);
    return [];
  }
};

export const getRoomDetails = async (id) => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${apiURL}/rooms/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch room details: ${res.status}`);
    return await res.json() || null;
  } catch (error) {
    console.error("Error fetching room details:", error);
    return null;
  }
};

export const deleteRoom = async (id, token) => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${apiURL}/rooms/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Deletion endpoint error: ${res.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Error executing room delete operation:", error);
    return { success: false, error: error.message };
  }
};