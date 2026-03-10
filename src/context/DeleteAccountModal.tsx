import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
}

export default function DeleteAccountModal({
  isVisible,
  onClose,
  onConfirm,
}: Props) {
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      setPassword("");
      setModalVisible(true);

      requestAnimationFrame(() => {
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 65,
            friction: 8,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          }),
        ]).start();
      });
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.85,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setModalVisible(false);
        scaleAnim.setValue(0.85);
        opacityAnim.setValue(0);
      });
    }
  }, [isVisible]);

  const handleConfirm = () => {
    if (password.trim()) {
      onConfirm(password);
    }
  };

  return (
    <Modal
      animationType="none"
      transparent
      visible={modalVisible}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Animated.View style={[styles.backdrop, { opacity: opacityAnim }]}>
            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  styles.card,
                  { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
                ]}
              >
                <TouchableOpacity
                  onPress={onClose}
                  style={styles.closeBtn}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text style={styles.closeBtnText}>✕</Text>
                </TouchableOpacity>

                <View style={styles.iconWrapper}>
                  <Text style={styles.iconEmoji}>🗑️</Text>
                </View>

                <Text style={styles.title}>Delete Account?</Text>
                <Text style={styles.subtitle}>
                  This action is permanent and cannot be undone. Please enter
                  your password to confirm.
                </Text>

                <View style={styles.inputWrapper}>
                  <TextInput
                    placeholder="Enter your password"
                    placeholderTextColor="#b0b0b0"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                  />
                </View>

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    onPress={onClose}
                    style={styles.cancelBtn}
                    activeOpacity={0.75}
                  >
                    <Text style={styles.cancelBtnText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleConfirm}
                    style={[
                      styles.deleteBtn,
                      !password.trim() && styles.deleteBtnDisabled,
                    ]}
                    activeOpacity={0.8}
                    disabled={!password.trim()}
                  >
                    <Text style={styles.deleteBtnText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 16,
  },
  closeBtn: {
    alignSelf: "flex-end",
    backgroundColor: "#f2f2f2",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  closeBtnText: { color: "#888", fontSize: 13, fontWeight: "600" },
  iconWrapper: {
    alignSelf: "center",
    backgroundColor: "#fff0f0",
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  iconEmoji: { fontSize: 32 },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13.5,
    color: "#777",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  inputWrapper: {
    borderWidth: 1.5,
    borderColor: "#888",
    borderRadius: 12,
    backgroundColor: "#fafafa",
    marginBottom: 20,
  },
  input: { height: 48, paddingHorizontal: 14, fontSize: 15, color: "#1a1a1a" },
  buttonRow: { flexDirection: "row", gap: 10 },
  cancelBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#888",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  cancelBtnText: { fontSize: 15, fontWeight: "600", color: "#555" },
  deleteBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ef4444",
  },
  deleteBtnDisabled: { backgroundColor: "#fca5a5" },
  deleteBtnText: { fontSize: 15, fontWeight: "700", color: "#fff" },
});
