import Button from "@/components/Button";
import Colors from "@/constants/Colors";
import { useAuth } from "@/providers/AuthProvider";
import { FontAwesome } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, Stack } from "expo-router";
import { Dispatch, useState } from "react";
import { Control, useController, useForm } from "react-hook-form";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardTypeOptions,
  Pressable,
} from "react-native";
import { z } from "zod";

const formValuesSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email address"),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8, { message: "Password must be greater than 8 characters long" })
    .refine((value) => !/\s/.test(value), "Invalid Password"),
});

type FormValues = z.infer<typeof formValuesSchema>;

type InputProps = {
  name: keyof FormValues;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  showPassword?: boolean;
  setShowPassword?: Dispatch<React.SetStateAction<boolean>>;
  control: Control<FormValues>;
};

function Input({
  name,
  placeholder,
  keyboardType,
  showPassword,
  setShowPassword,
  control,
}: InputProps) {
  const { field } = useController({
    control,
    defaultValue: "",
    name,
  });

  const isPassword = name === "password";

  return (
    <View>
      <TextInput
        value={field.value}
        onChangeText={field.onChange}
        keyboardType={keyboardType}
        secureTextEntry={isPassword && !showPassword}
        placeholder={placeholder}
        style={styles.input}
      />
      {isPassword && setShowPassword && (
        <Pressable
          style={styles.eyeIconContainer}
          onPress={() => setShowPassword((prev) => !prev)}>
          <FontAwesome
            name={showPassword ? "eye-slash" : "eye"}
            size={25}
            style={styles.eyeIcon}
          />
        </Pressable>
      )}
    </View>
  );
}

export default function SigninScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formValuesSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const { signIn } = useAuth();

  const onSubmit = async (payload: FormValues) => {
    try {
      await signIn(payload);
    } catch (error) {
      console.log("Signin Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Sign In",
        }}
      />

      {errors.email && (
        <Text style={styles.errorMessage}>{errors.email.message}</Text>
      )}
      {errors.password && (
        <Text style={styles.errorMessage}>{errors.password.message}</Text>
      )}

      <Text style={styles.label}>Email</Text>
      <Input
        name="email"
        keyboardType="email-address"
        placeholder="johndoe@gmail.com"
        control={control}
      />

      <Text style={styles.label}>Password</Text>
      <Input
        name="password"
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        placeholder="••••••••"
        control={control}
      />

      <Button text="Sign In" onPress={handleSubmit(onSubmit)} />

      <Link style={styles.textButton} href={"/(auth)/signup"}>
        Create an account
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
  label: {
    color: "gray",
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  eyeIconContainer: {
    position: "absolute",
    right: 0,
    top: 15,
  },
  eyeIcon: {
    marginRight: 15,
    color: Colors.light.tint,
  },
  errorMessage: {
    color: "red",
    marginBottom: 10,
  },
});
