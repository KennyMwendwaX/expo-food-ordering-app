import Button from "@/components/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { View, Text, StyleSheet, TextInput } from "react-native";

type FormValues = {
  name: string;
  price: number;
};

export default function CreateProductScreen() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

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
