import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import jwt from "jsonwebtoken";

type User = {
  id: string;
  name: string;
  role: string;
};

type AuthData = {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  signUp: (signupData: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  signIn: (signinData: { email: string; password: string }) => Promise<void>;
  signOut: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthData>({
  user: null,
  token: null,
  isLoggedIn: false,
  signUp: async () => {},
  signIn: async () => {},
  signOut: () => {},
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
          const decodedToken = jwt.decode(storedToken);
          setUser(decodedToken as User);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log("Error loading token from storage: ", error);
      }
    };

    loadUserFromStorage();
  }, []);

  const signUp = async (signupData: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_SERVER_URL}/users/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create user");
      }
    } catch (error) {
      console.log("Signup Error: ", error);
    }
  };

  const signIn = async (signinData: { email: string; password: string }) => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_SERVER_URL}/users/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signinData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const responseData = await response.json();
      const token = responseData.token;

      await AsyncStorage.setItem("token", token);

      const decodedToken = jwt.decode(token);

      setUser(decodedToken as User);
      setToken(token);
      setIsLoggedIn(true);
    } catch (error) {
      console.log("Signin Error: ", error);
      throw error;
    }
  };

  const signOut = () => {
    AsyncStorage.removeItem("token");
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isLoggedIn, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
