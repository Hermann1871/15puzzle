import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

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
    <>
      {/* // <View> */}
      <Text style={styles.timeText}>
        {hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
      </Text>
      <View style={styles.container}>
        <Pressable style={styles.pressable} onPress={startAndStopButton}>
          <Text style={styles.text}>{isRunning ? "Pause" : "Start"}</Text>
        </Pressable>
        <Pressable style={styles.pressable} onPress={reset}>
          <Text style={styles.text}>Reset</Text>
        </Pressable>
      </View>

      {/* </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // title: {
  //   fontSize: 24,
  //   marginBottom: 20,
  // },
  // myButton: {
  //   margin: 20,
  // },
  pressable: {
    padding: 10,
    margin: 20,
    // backgroundColor: 'blue',
    backgroundColor: 'rgb(33, 150, 243)',
    borderRadius: 3,
  },
  text: {
    color: 'white',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  timeText: {
    // color: 'white',
    fontSize: 24,
    fontWeight: '500',
    textTransform: 'uppercase',
    // margin: 20
  }
});

export default StopwatchMobile2;
