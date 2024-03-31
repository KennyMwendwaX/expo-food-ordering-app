import Button from "@/components/Button";
import { Control, useController, useForm } from "react-hook-form";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardTypeOptions,
} from "react-native";
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
  price: z.string({
    required_error: "Price is required",
  }),
});

type FormValues = z.infer<typeof formValuesSchema>;

type InputProps = {
  name: keyof FormValues;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  control: Control<FormValues>;
};

function Input({ name, placeholder, keyboardType, control }: InputProps) {
  const { field } = useController({
    control,
    defaultValue: "",
    name,
  });

  const stringValue = field.value.toString();

  return (
    <TextInput
      value={stringValue}
      onChangeText={field.onChange} // Ensure onChange can handle string input and convert it back if necessary
      placeholder={placeholder}
      keyboardType={keyboardType}
      style={styles.input}
    />
  );
}

export default function CreateProductScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formValuesSchema),
  });

  console.log(errors);

  const onCreate = (values: FormValues) => {
    console.warn("Creating product", values);
  };

  return (
    <View style={styles.container}>
      {errors.name && (
        <Text style={styles.errorMessage}>{errors.name.message}</Text>
      )}
      {errors.price && (
        <Text style={styles.errorMessage}>{errors.price.message}</Text>
      )}

      <Text style={styles.label}>Name</Text>
      <Input name="name" placeholder="Name" control={control} />
      <Text style={styles.label}>Price</Text>
      <Input
        name="price"
        placeholder="9.99"
        keyboardType="numeric"
        control={control}
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
  errorMessage: {
    color: "red",
    marginBottom: 10,
  },
});
