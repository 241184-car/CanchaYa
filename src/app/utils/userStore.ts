// userStore.ts
// Gestión simple de estado de usuario usando localStorage, con soporte de roles

export interface User {
  name: string;
  email: string;
  phone?: string;
  role: "customer" | "owner" | "admin"; // nuevo campo de rol
}

const USER_KEY = "sportbook_user";

export const userStore = {
  setUser: (user: User) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser: (): User | null => {
    const data = localStorage.getItem(USER_KEY);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  },

  getUserRole: (): "customer" | "owner" | "admin" => {
    const user = userStore.getUser();
    return user?.role || "customer";
  },

  clearUser: () => {
    localStorage.removeItem(USER_KEY);
  },

  getUserName: (): string => {
    const user = userStore.getUser();
    return user?.name || "Usuario";
  },

  getFirstName: (): string => {
    const name = userStore.getUserName();
    return name.split(" ")[0];
  },

  logout: () => {
    userStore.clearUser();
    window.location.href = "/";
  },
};