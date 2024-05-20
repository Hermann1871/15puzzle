import React, { useEffect, useState } from 'react';
import { Pressable, View, StyleSheet, Text } from 'react-native';
import Stopwatch from './stopwatch';
import StopwatchMobile from './stopwatchMobile';
import StopwatchMobile2 from './stopwatchMobile2';
import { ScrollView } from 'react-native-gesture-handler';

const matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0],
]

const impossibleMatrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 15, 14, 0],
]

// Donald Knuth 37 moves
// const knuthMatrix = [
//     [1, 12, 3, 8],
//     [6, 9, 14, 11],
//     [13, 2, 7, 4],
//     [0, 5, 10, 15],
// ]

const a = [0, 1, 2, 3]

const whiteNumbers = [1, 3, 6, 8, 9, 11, 14]

const Game = () => {

    // console.log('Game Rendering')

    const [winState, setWinState] = useState(false)

    const [moves, setMoves] = useState(0)

    const [NumbersState, setNumbersState] = useState(matrix);
    const getNumberToDisplay = (r: number, c: number) => {
        return NumbersState[r][c]
    };

    const [stopwatchRunning, setStopwatchRunning] = useState(false);

    const handleStartStopClick = () => {
        setStopwatchRunning(!stopwatchRunning);
    };

    const [isImpossible, setIsImpossible] = useState(false);

    useEffect(() => {
        if (isImpossible) {
            swap2();
            // setNumbersState(matrix)
        }
    }, [isImpossible]);

    function impossibleSwap() {
        setIsImpossible(true);
        setNumbersState(impossibleMatrix)
        // swap2()
    }

    function swap(r: number, c: number) {

        const copy = NumbersState.map(subarray => [...subarray]);
        // console.log ('Move', copy[r][c])

        if (c - 1 >= 0 && getNumberToDisplay(r, c - 1) === 0) {
            copy[r][c - 1] = copy[r][c]
            copy[r][c] = 0
            setNumbersState(copy)
            setMoves(moves + 1)
        }
        else if (c + 1 < 4 && getNumberToDisplay(r, c + 1) === 0) {
            copy[r][c + 1] = copy[r][c]
            copy[r][c] = 0
            setNumbersState(copy)
            setMoves(moves + 1)
        }
        else if (r + 1 < 4 && getNumberToDisplay(r + 1, c) === 0) {
            copy[r + 1][c] = copy[r][c]
            copy[r][c] = 0
            setNumbersState(copy)
            setMoves(moves + 1)
        }
        else if (r - 1 >= 0 && getNumberToDisplay(r - 1, c) === 0) {
            copy[r - 1][c] = copy[r][c]
            copy[r][c] = 0
            setNumbersState(copy)
            setMoves(moves + 1)
        }

        let checkWon = true
        let checkImpossible = true

        // console.log('matrix')
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix.length; j++) {
                // console.log(matrix[i][j])
                if (copy[i][j] !== matrix[i][j]) {
                    checkWon = false
                }
            }
        }

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix.length; j++) {
                if (copy[i][j] !== impossibleMatrix[i][j]) {
                    checkImpossible = false
                }
            }
        }

        if (checkWon) {
            console.log('You won!')
            setWinState(true)
            handleStartStopClick()
        }

        if (checkImpossible) {
            console.log('Impossible!')
            // setWinState(true)
            handleStartStopClick()
        }

        // console.log('matrix - END')
    }

    function swap2() {

        setWinState(false)
        setMoves(0)
        handleStartStopClick()

        // if (!isImpossible) {
        //     setWinState(false)
        //     setMoves(0)
        //     handleStartStopClick()
        // }

        console.log("NumbersState Start matrix", NumbersState)
        // const copy = NumbersState.map(subarray => [...subarray]);

        let copy
        if (isImpossible) {
            copy = impossibleMatrix.map(subarray => [...subarray]);
            console.log('copy start matrix - IMPOSSIBLE (print happens sometimes when function ends)', copy)
        } else {
            copy = matrix.map(subarray => [...subarray]);
            console.log('copy start matrix - POSSIBLE (print happens sometimes when function ends)', copy)
        }

        // console.log('copy start matrix', copy)
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
        setIsImpossible(false)
    }



    return (
        <>
            {/* <View style={styles.heading}></View> */}

            <ScrollView contentContainerStyle={styles.container1}>
                {/* <View style={styles.container1}> */}

                <Text style={{ fontSize: 48, fontWeight: 'bold' }}>15 Puzzle</Text>

                {/* <h1 style={{ fontSize: 48, fontWeight: 'bold' }}>15 Puzzle</h1> */}
                {/* <p>{moves} moves</p> */}

                <Pressable style={styles.shuffleButton} onPress={() => swap2()}>
                    {/* <View style={styles.shuffleButton}> */}
                    <Text style={styles.shuffleButtonText}>Start New Game</Text>
                    {/* </View> */}
                </Pressable>

                <Pressable style={styles.shuffleButton} onPress={() => impossibleSwap()}>
                    {/* <View style={styles.shuffleButton}> */}
                    <Text style={styles.shuffleButtonText}>Start Impossible Game</Text>
                    {/* </View> */}
                </Pressable>

                {winState && <Text style={{ fontSize: 36, fontWeight: 'bold', color: 'green' }}>You won!</Text>}
                <Text style={{ fontSize: 24, fontWeight: '500', margin: 20 }}>{moves} moves</Text>

                <StopwatchMobile2 isRunning={stopwatchRunning} startAndStop={handleStartStopClick} />

                {/* <Pressable
                    onPress={handleStartStopClick}
                >
                    <Text>{stopwatchRunning ? 'Pause' : 'Start'} </Text>
                </Pressable> */}

                {/* Game field START */}
                <View style={styles.container}>
                    {a.map((r, k1) => {
                        return (
                            <View key={'r' + k1} style={styles.gameboardRow} >
                                {a.map((c, k2) => {
                                    return (
                                        <Pressable key={'c2' + k2} onPress={() => swap(r, c)}>
                                            <View key={'c3' + k2} style={getNumberToDisplay(r, c) === 0 ?
                                                styles.emptyButton :
                                                whiteNumbers.includes(getNumberToDisplay(r, c)) ?
                                                    styles.whiteButton :
                                                    styles.blackButton}>
                                                {getNumberToDisplay(r, c) === 0 ?
                                                    <Text key={'c4' + k2} style={{ fontWeight: 'bold', color: 'red' }}></Text> :
                                                    <Text key={'c4' + k2} style={
                                                        (whiteNumbers.includes(getNumberToDisplay(r, c))) ?
                                                            styles.blackText :
                                                            styles.whiteText}>
                                                        {getNumberToDisplay(r, c)}
                                                    </Text>}
                                            </View>
                                        </Pressable >
                                    )
                                })}
                            </View>
                        )
                    })}
                </View>
                {/* Game field END */}

                {/* </View> */}
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({

    container1: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    container: {
        width: 340,
        height: 338,
        // flex: 1,
        justifyContent: 'center',
        margin: 20,
        borderWidth: 8,
        borderColor: 'red',
        // borderColor: 'rgb(33, 150, 243)',
    },

    heading: {
        display: 'flex',
        // flexDirection: 'row',
        justifyContent: 'center',
        margin: 20,
    },

    topRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },

    gameboardRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // middleColumn2: {
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },

    bottomRight: {
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

    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    shuffleButton: {
        maxWidth: 200,
        backgroundColor: 'orange',
        padding: 10,
        marginTop: 20,
    },

    shuffleButtonText: {
        color: 'white',
        fontSize: 20,
    },

    whiteText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'red'
    },

    blackText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black'
    }

});

export default Game;
