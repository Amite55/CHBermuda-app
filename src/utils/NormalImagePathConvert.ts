import * as FileSystem from "expo-file-system";

export const NormalImagePathConvert = async (uri: string) => {
  // content:// হলে file:// এ convert করো
  if (uri.startsWith("content://")) {
    const fileName = `temp_${Date.now()}.jpg`;
    const destPath = `${FileSystem.cacheDirectory}${fileName}`;

    await FileSystem.copyAsync({
      from: uri,
      to: destPath,
    });

    return destPath; // এখন file:// format এ আসবে
  }

  return uri;
};
