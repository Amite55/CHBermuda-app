import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export type PickedImage = {
  uri: string;
  name: string;
  type: string;
};

type UseMultiImagePickerOptions = {
  quality?: number;
  maxImages?: number;
};

type UseMultiImagePickerReturn = {
  images: PickedImage[]; // সব selected images — show করার জন্য
  loading: boolean; // gallery open হওয়ার সময় true
  error: string | null; // কিছু ভুল হলে message
  pickImages: () => Promise<PickedImage[]>; // call করো, নতুন images images[] তে add হবে
  removeImage: (uri: string) => void; // একটা image সরাও
  reset: () => void; // সব clear
};

export function useMultiImagePicker(
  options: UseMultiImagePickerOptions = {},
): UseMultiImagePickerReturn {
  const { quality = 0.8, maxImages = 10 } = options;

  const [images, setImages] = useState<PickedImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pickImages = async (): Promise<PickedImage[]> => {
    setLoading(true);
    setError(null);

    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        setError("Permission denied. Please allow photo library access.");
        return [];
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsMultipleSelection: true,
        quality,
        selectionLimit: maxImages,
      });

      if (result.canceled || result.assets.length === 0) return [];

      const picked: PickedImage[] = result.assets.map((asset) => {
        const filename =
          asset.fileName ??
          asset.uri.split("/").pop() ??
          `image_${Date.now()}.jpg`;

        const extMatch = /\.(\w+)$/.exec(filename);
        const mime = extMatch ? `image/${extMatch[1]}` : "image/jpeg";

        return {
          uri: asset.uri,
          name: filename,
          type: mime,
        };
      });

      // duplicate skip করে add করি
      setImages((prev) => {
        const existingUris = new Set(prev.map((img) => img.uri));
        const unique = picked.filter((img) => !existingUris.has(img.uri));
        return [...prev, ...unique].slice(0, maxImages);
      });

      return picked; // নতুন যেগুলো pick হলো সেগুলো return ও করি
    } catch (err: any) {
      const msg =
        err?.message ||
        err?.data?.message ||
        "Image pick failed, please try again.";
      setError(msg);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (uri: string) => {
    setImages((prev) => prev.filter((img) => img.uri !== uri));
  };

  const reset = () => {
    setImages([]);
    setError(null);
    setLoading(false);
  };

  return { images, loading, error, pickImages, removeImage, reset };
}

// ================== useCase Example ================
// Delivery Request Screen এ
// const { images, loading, error, pickImages, removeImage, reset } = useMultiImagePicker({ maxImages: 10 });

// Upload button press এ
// const handlePick = async () => {
//   const picked = await pickImages();
//   if (picked.length === 0) return; // cancelled বা empty
// };

// FlatList এ show করো
// <FlatList data={images} renderItem={({ item }) => (
//   <Image source={{ uri: item.uri }} />
//   <Button onPress={() => removeImage(item.uri)} />
// )} />

// Submit এর সময় FormData তে দাও
// images.forEach((img, i) => {
//   formData.append(`images[${i}]`, {
//     uri: img.uri,
//     name: img.name,
//     type: img.type,
//   } as any);
// });
