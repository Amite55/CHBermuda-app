import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export type PickedImage = {
  uri: string;
  name: string;
  type: string;
};

type UseImagePickerOptions = {
  allowsEditing?: boolean;
  quality?: number;
  aspect?: [number, number];
};

type UseImagePickerReturn = {
  image: PickedImage | null;
  previewUri: string | null;
  loading: boolean;
  error: string | null;
  pickImage: () => Promise<PickedImage | null>;
  reset: () => void;
};

export function useImagePicker(
  options: UseImagePickerOptions = {},
): UseImagePickerReturn {
  const { allowsEditing = true, quality = 1, aspect } = options;

  const [image, setImage] = useState<PickedImage | null>(null);
  const [previewUri, setPreviewUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pickImage = async (): Promise<PickedImage | null> => {
    setLoading(true);
    setError(null);

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing,
        quality,
        ...(aspect ? { aspect } : {}),
      });

      if (result.canceled || result.assets.length === 0) {
        return null;
      }

      const selected = result.assets[0];

      const filename =
        selected.fileName ??
        selected.uri.split("/").pop() ??
        `image_${Date.now()}.jpg`;

      const extMatch = /\.(\w+)$/.exec(filename);
      const mime = extMatch ? `image/${extMatch[1]}` : "image/jpeg";

      const pickedImage: PickedImage = {
        uri: selected.uri,
        name: filename,
        type: mime,
      };

      setImage(pickedImage);
      setPreviewUri(selected.uri);
      return pickedImage;
    } catch (err: any) {
      const msg =
        err?.message ||
        err?.data?.message ||
        "Image pick failed, please try again.";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setPreviewUri(null);
    setError(null);
    setLoading(false);
  };

  return { image, previewUri, loading, error, pickImage, reset };
}

// ================== useCase Example ================
// Profile Screen এ
// const { image, previewUri, loading, error, pickImage } = useImagePicker();

// const handleProfileImage = async () => {
//   const picked = await pickImage();
//   if (!picked) {
//     toast.showError("Upload cancelled", 3000);
//     return;
//   }
// picked.uri, picked.name, picked.type — সব ready
//   await uploadToServer(picked);
// };

// Cover Photo Screen এ — আলাদা aspect ratio দিয়ে
// const { image, loading, pickImage } = useImagePicker({ aspect: [16, 9] });

// Post Screen এ — low quality দিয়ে
// const { image, pickImage } = useImagePicker({ quality: 0.7 });
