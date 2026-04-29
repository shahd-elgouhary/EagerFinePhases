const BASE = "";

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
    credentials: "include",
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  getCampaigns: () => apiFetch<any[]>("/api/campaigns"),
  getCampaign: (id: string) => apiFetch<any>(`/api/campaigns/${id}`),
  joinCampaign: (id: string) => apiFetch<any>(`/api/campaigns/${id}/join`, { method: "POST" }),

  getPosts: () => apiFetch<any[]>("/api/posts"),
  likePost: (id: string) => apiFetch<any>(`/api/posts/${id}/like`, { method: "POST" }),
  savePost: (id: string) => apiFetch<any>(`/api/posts/${id}/save`, { method: "POST" }),

  getStats: () => apiFetch<{ treesPlanted: number; volunteers: number; campaigns: number }>("/api/stats"),

  getMe: () => apiFetch<any>("/api/auth/me"),
  getProfile: () => apiFetch<any>("/api/profile"),

  signIn: (email: string, password: string) =>
    apiFetch<any>("/api/auth/signin", { method: "POST", body: JSON.stringify({ email, password }) }),
  signUp: (data: { username: string; email: string; password: string; displayName: string }) =>
    apiFetch<any>("/api/auth/signup", { method: "POST", body: JSON.stringify(data) }),
  signOut: () => apiFetch<any>("/api/auth/signout", { method: "POST" }),
};
