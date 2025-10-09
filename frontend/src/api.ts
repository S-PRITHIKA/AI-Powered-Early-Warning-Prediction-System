// src/api.ts
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function registerUser(data: any) {
  try {
    const res = await fetch(`${BASE_URL}/api/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.error(err);
    return { success: false, message: "Network error" };
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const res = await fetch(`${BASE_URL}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  } catch (err) {
    console.error(err);
    return { success: false, message: "Network error" };
  }
}
