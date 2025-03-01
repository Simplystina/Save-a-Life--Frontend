// src/components/Collapsible.tsx
import React, { useState } from "react";
import { View, Animated, StyleSheet } from "react-native";

interface CollapsibleProps {
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  children: React.ReactNode;
  style?: any;
  duration?: number;
}

const Collapsible: React.FC<CollapsibleProps> = ({
  isOpen,
  onToggle,
  children,
  style,
  duration = 300,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(!!isOpen);
  const [height] = useState(new Animated.Value(0));

  const currentIsOpen = typeof isOpen === "boolean" ? isOpen : internalIsOpen;

  React.useEffect(() => {
    if (currentIsOpen) {
      Animated.timing(height, {
        toValue: 1,
        duration,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(height, {
        toValue: 0,
        duration,
        useNativeDriver: false,
      }).start();
    }
  }, [currentIsOpen, duration]);

  const toggle = () => {
    const newIsOpen = !currentIsOpen;
    setInternalIsOpen(newIsOpen);
    onToggle?.(newIsOpen);
  };

  const maxHeight = height.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 500], // Adjust max height as needed
  });

  return (
    <Animated.View
      style={[styles.container, { maxHeight, overflow: "hidden" }, style]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

export default Collapsible;
