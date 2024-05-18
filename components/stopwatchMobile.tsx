// https://medium.com/how-to-react/simple-way-to-create-a-stopwatch-in-react-js-bcc0e08e041e

import React, { useState, useEffect } from "react";
// import "./stopwatch.css";
import { View, Text, Pressable } from "react-native";

// MOBILE

const StopwatchMobile = () => {
  // state to store time
  const [time, setTime] = useState(0);

  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: any;
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  // Hours calculation
  const hours = Math.floor(time / 360000);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);

  // Milliseconds calculation
  const milliseconds = time % 100;

  // Method to start and stop timer
  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  // Method to reset timer back to 0
  const reset = () => {
    setTime(0);
  };
  return (
    <View >
      <Text >
        {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
        {/* : */}
        {/* {milliseconds.toString().padStart(2, "0")} */}
      </Text>
      <View >
        <Pressable onPress={startAndStop}>
          <Text > {isRunning ? "Stop" : "Start"} </Text>
        </Pressable>
        <Pressable onPress={reset}>
          <Text >Reset </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default StopwatchMobile;