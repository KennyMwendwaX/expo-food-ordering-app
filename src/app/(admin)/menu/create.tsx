import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formValuesSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3, { message: "Name must be greater than 3 characters long" })
    .max(20, { message: "Name must be less than 20 characters long" }),
  price: z
    .number({ required_error: "Price is required" })
    .min(1, { message: "Price must be greater than Ksh. 1" }),
});

type FormValues = z.infer<typeof formValuesSchema>;

export default function CreateProductScreen() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formValuesSchema),
  });

  const onCreate = (values: FormValues) => {
    console.warn("Creating product", values);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        {...register("name")}
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
        {...register("price")}
      />

      <Button text="Create" onPress={handleSubmit(onCreate)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
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
});
