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
  signUp: async () => {},
  signIn: async () => {},
  signOut: () => {},
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
          const decodedToken = jwt.decode(storedToken);
          setUser(decodedToken as User);
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
  }) => {};

  const signIn = async (signinData: { email: string; password: string }) => {};

  const signOut = () => {
    AsyncStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
