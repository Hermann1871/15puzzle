import React, { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";

interface StopwatchProps {
  isRunning: boolean;
  startAndStop: () => void;
}

const StopwatchMobile2: React.FC<StopwatchProps> = ({ isRunning, startAndStop }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);

  const startAndStopButton = () => {
    startAndStop(); // Calling the startAndStop function received from props
  };

  const reset = () => {
    setTime(0);
  };

  return (
    <View>
      <Text>
        {hours}:{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
      </Text>
      <View>
        <Pressable onPress={startAndStopButton}>
          <Text>{isRunning ? "Stop" : "Start"}</Text>
        </Pressable>
        <Pressable onPress={reset}>
          <Text>Reset</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default StopwatchMobile2;
