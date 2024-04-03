import Button from "@/components/Button";
import { Control, Controller, useController, useForm } from "react-hook-form";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardTypeOptions,
  Image,
} from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { defaultPizzaImage } from "@/components/ProductListItem";

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
  imageUrl: z
    .string({
      required_error: "Image is required",
      invalid_type_error: "Invalid image URL",
    })
    .url({ message: "Invalid image URL format" }),
});

type FormValues = z.infer<typeof formValuesSchema>;

type InputProps = {
  name: keyof FormValues;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  control: Control<FormValues>;
};

function Input({ name, placeholder, keyboardType, control }: InputProps) {
  const { field } = useController({
    control,
    defaultValue: "",
    name,
  });

  return (
    <TextInput
      value={field.value}
      onChangeText={field.onChange}
      placeholder={placeholder}
      keyboardType={keyboardType}
      style={styles.input}
    />
  );
}

export default function ProductFormScreen() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formValuesSchema),
  });

  const [imageUri, setImageUri] = useState<string | null>(null);

  const { productId } = useLocalSearchParams();
  const isUpdating = !!productId;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("Image result:", result);

    if (!result.canceled) {
      setValue("imageUrl", result.assets[0].uri);
      setImageUri(result.assets[0].uri);
    }
  };

  useEffect(() => {
    setValue("imageUrl", "");
  }, [setValue]);

  const onCreate = (data: FormValues) => {
    const numericPrice = parseFloat(data.price);
    const values = { ...data, price: numericPrice };
    console.log("Creating product...", values);
  };

  const onUpdate = (data: FormValues) => {
    const numericPrice = parseFloat(data.price);
    const values = { ...data, price: numericPrice };
    console.log("Updating product...", values);
  };

  const onSubmit = (data: FormValues) => {
    if (isUpdating) {
      onUpdate(data);
    } else {
      onCreate(data);
    }
  };

  const onDelete = () => {};

  const confirmDelete = () => {};

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? "Update Product" : "Create Product" }}
      />
      {errors.name && (
        <Text style={styles.errorMessage}>{errors.name.message}</Text>
      )}
      {errors.price && (
        <Text style={styles.errorMessage}>{errors.price.message}</Text>
      )}
      <Controller
        name="imageUrl"
        control={control}
        render={() => (
          <>
            {imageUri && (
              <Image
                source={{ uri: imageUri || defaultPizzaImage }}
                style={styles.image}
                resizeMode="contain"
              />
            )}
            <Text style={styles.textButton} onPress={() => pickImage()}>
              Select Image
            </Text>
          </>
        )}
      />

      <Text style={styles.label}>Name</Text>
      <Input name="name" placeholder="Name" control={control} />
      <Text style={styles.label}>Price</Text>
      <Input
        name="price"
        placeholder="9.99"
        keyboardType="numeric"
        control={control}
      />
      <Button
        text={isUpdating ? "Update" : "Create"}
        onPress={handleSubmit(onSubmit)}
      />

      {isUpdating && (
        <Text onPress={confirmDelete} style={styles.textButton}></Text>
      )}
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
  errorMessage: {
    color: "red",
    marginBottom: 10,
  },
});
