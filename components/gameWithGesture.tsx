import React, { useState } from 'react';
import { Pressable, View, StyleSheet, Text } from 'react-native';
import { GestureEvent, PanGestureHandler, PanGestureHandlerEventPayload, State } from 'react-native-gesture-handler';
import StopwatchMobile2 from './stopwatchMobile2';
import { ScrollView } from 'react-native-gesture-handler';

const matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0],
]

const whiteNumbers = [1, 3, 6, 8, 9, 11, 14]


export const GameWithGesture = () => {
    const [winState, setWinState] = useState(false);
    const [moves, setMoves] = useState(0);
    const [NumbersState, setNumbersState] = useState(matrix);
    const [stopwatchRunning, setStopwatchRunning] = useState(false);

    const handleStartStopClick = () => {
        setStopwatchRunning(!stopwatchRunning);
    };

    const swap = (fromRow: number, fromCol: number, toRow: number, toCol: number) => {
        const copy = NumbersState.map(subarray => [...subarray]);

        copy[toRow][toCol] = copy[fromRow][fromCol];
        copy[fromRow][fromCol] = 0;
        setNumbersState(copy);
        setMoves(moves + 1);

        let check = true;
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix.length; j++) {
                if (copy[i][j] !== matrix[i][j]) {
                    check = false;
                }
            }
        }

        if (check) {
            console.log('hai vinto');
            setWinState(true);
            handleStartStopClick();
        }
    };

    const handlePanGesture = (event: GestureEvent<PanGestureHandlerEventPayload>, r: number, c: number) => {
        const { translationX, translationY } = event.nativeEvent;
        const deltaX = Math.round(translationX / 80); // 80 is the size of your tile
        const deltaY = Math.round(translationY / 80);

        const newRow = r + deltaY;
        const newCol = c + deltaX;

        if (newRow >= 0 && newRow < 4 && newCol >= 0 && newCol < 4 && NumbersState[newRow][newCol] === 0) {
            swap(r, c, newRow, newCol);
        }
    };

    function swap2() {

        setWinState(false)
        setMoves(0)
        handleStartStopClick()

        const copy = NumbersState.map(subarray => [...subarray]);
        // console.log('copy inizio ')
        // copy.forEach(row => {
        //     console.log(row);
        // })

        let r = 0
        let c = 0
        for (let i = 0; i < 10000; i++) {


            let random1 = Math.floor(Math.random() * 4)
            let random2 = Math.floor(Math.random() * 4)

            r = random1
            c = random2

            if (c - 1 >= 0 && copy[r][c - 1] === 0) {
                copy[r][c - 1] = copy[r][c]
                copy[r][c] = 0
            }
            else if (c + 1 < 4 && copy[r][c + 1] === 0) {
                copy[r][c + 1] = copy[r][c]
                copy[r][c] = 0
            }
            else if (r + 1 < 4 && copy[r + 1][c] === 0) {
                copy[r + 1][c] = copy[r][c]
                copy[r][c] = 0
            }
            else if (r - 1 >= 0 && copy[r - 1][c] === 0) {
                copy[r - 1][c] = copy[r][c]
                copy[r][c] = 0
            }
        }
        setNumbersState(copy)
    }

    return (
        <ScrollView contentContainerStyle={styles.container1}>
            <Text style={{ fontSize: 48, fontWeight: 'bold' }}>15 Puzzle</Text>

            <Pressable style={styles.shuffleButton} onPress={() => swap2()}>
                <Text style={styles.shuffleButtonText}>Start New Game</Text>
            </Pressable>

            {winState && <Text style={{ fontSize: 36, fontWeight: 'bold', color: 'green' }}>Hai vinto</Text>}
            <Text>{moves} moves</Text>

            <StopwatchMobile2 isRunning={stopwatchRunning} startAndStop={handleStartStopClick} />

            <Pressable onPress={handleStartStopClick}>
                <Text>START&STOP</Text>
            </Pressable>

            <View style={styles.container}>
                {NumbersState.map((row, r) => (
                    <View key={'r' + r} style={styles.middleColumn}>
                        {row.map((num, c) => (
                            <PanGestureHandler
                                key={'c' + c}
                                onGestureEvent={(e) => handlePanGesture(e, r, c)}
                                onHandlerStateChange={(e) => {
                                    if (e.nativeEvent.state === State.END) {
                                        handlePanGesture(e, r, c);
                                    }
                                }}
                            >
                                <View style={num === 0 ? styles.emptyButton : whiteNumbers.includes(num) ? styles.whiteButton : styles.blackButton}>
                                    {num !== 0 && <Text style={whiteNumbers.includes(num) ? styles.blackText : styles.whiteText}>{num}</Text>}
                                </View>
                            </PanGestureHandler>
                        ))}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container1: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: 340,
        height: 340,
        justifyContent: 'center',
        margin: 20,
        borderWidth: 8,
        borderColor: 'red',
    },
    middleColumn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    whiteButton: {
        width: 80,
        height: 80,
        backgroundColor: 'yellow',
        borderWidth: 1.75,
        borderColor: 'black',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    blackButton: {
        width: 80,
        height: 80,
        backgroundColor: 'white',
        borderWidth: 1.75,
        borderColor: 'black',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyButton: {
        width: 80,
        height: 80,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    shuffleButton: {
        maxWidth: 200,
        backgroundColor: 'orange',
        padding: 10,
    },
    shuffleButtonText: {
        color: 'white',
        fontSize: 20,
    },
    whiteText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'red',
    },
    blackText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black',
    },
});

