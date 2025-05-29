// services/authService.js

// Get current user info (protected route)
export const getCurrentUser = async () => {
  const res = await fetch("/api/v1/users/current-user", {
    credentials: "include", // sends cookies
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Unable to fetch current user");
  }

  return res.json(); // returns { user: { ... } }
};

// Login user
export const login = async (email, password) => {
  const res = await fetch("/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Login failed");
  }

  return res.json(); // returns { user: { ... } }
};

export const logout = async () => {
  try {
    const res = await fetch("/api/v1/users/logout", {
      method: "POST",
      // credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      //   setAccount("");
      navigate("/login");
    } else {
      toast.error(data.message || "Logout failed");
    }
  } catch (err) {
    console.error("Logout error:", err);
  }
};
