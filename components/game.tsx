import React, { useState } from 'react';
import { Pressable, View, StyleSheet, Text } from 'react-native';

const matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0],
]

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

        let check = true

        // console.log('matrix')
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix.length; j++) {
                // console.log(matrix[i][j])
                if (copy[i][j] !== matrix[i][j]) {
                    check = false
                }
            }
        }
        if (check) {
            console.log('hai vinto ')
            setWinState(true)
        }
        // console.log('matrix - END')
    }

    function swap2() {
        setWinState(false)
        setMoves(0)

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
        <>
            <Text style={{ fontSize: 48, fontWeight: 'bold' }}>15 Puzzle</Text>
            
            {/* <h1 style={{ fontSize: 48, fontWeight: 'bold' }}>15 Puzzle</h1> */}
            {/* <p>{moves} moves</p> */}

            <Pressable onPress={() => swap2()}>
                <View style={styles.shuffleButton}>
                    <Text style={styles.shuffleButtonText}>New Game</Text>
                </View>
            </Pressable>

            {winState && <Text style={{ fontSize: 36, fontWeight: 'bold', color: 'green' }}>Hai vinto</Text>}
            <Text>{moves} moves</Text>

            <Pressable >
                <View style={styles.container}>
                    {a.map((r, k1) => {
                        return (
                            <View key={'r' + k1} style={styles.middleColumn} >
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
            </Pressable>

            {/* <Pressable>
                <View style={styles.container}>
                    <View style={styles.topRow}>
                        <View style={[styles.button]}>{getNumberToDisplay(0, 0)} </View>
                        <View style={[styles.button]}>{getNumberToDisplay(0, 1)} </View>
                        <View style={[styles.button]}>{getNumberToDisplay(0, 2)} </View>
                        <View style={[styles.button]}>{getNumberToDisplay(0, 3)} </View>

                    </View>
                    <View style={styles.middleColumn}>
                        <View style={[styles.button]}>{getNumberToDisplay(1, 0)} </View>
                        <View style={[styles.button]}>{getNumberToDisplay(1, 1)} </View>
                        <View style={[styles.button]}>{getNumberToDisplay(1, 2)} </View>
                        <View style={[styles.button]}>{getNumberToDisplay(1, 3)} </View>
                    </View>
                    <View style={styles.middleColumn2}>
                        <View style={[styles.button]}>{getNumberToDisplay(2, 0)} </View>
                        <View style={[styles.button]}>{getNumberToDisplay(2, 1)} </View>
                        <Pressable onPress={() => swap(2, 2)}>
                            <View style={[styles.button]}>{getNumberToDisplay(2, 2)}prova </View></Pressable>
                        <Pressable onPress={() => swap(2, 3)}>
                            <View style={[styles.button]}>{getNumberToDisplay(2, 3)} prova</View></Pressable>
                    </View>
                    <View style={styles.bottomRight}>
                        <View style={[styles.button]}>{getNumberToDisplay(3, 0)} </View>
                        <View style={[styles.button]}>{getNumberToDisplay(3, 1)} </View>
                        <Pressable onPress={() => swap(3, 2)}>
                            <View style={[styles.button]} >{getNumberToDisplay(3, 2)}prova</View></Pressable>
                        <Pressable onPress={() => swap(3, 3)}>
                            <View style={[styles.button]}>{getNumberToDisplay(3, 3)}prova </View></Pressable>
                    </View>
                </View>
            </Pressable > */}
        </>
    );
};

const styles = StyleSheet.create({

    container: {
        // width: 398,
        // height: 398,
        flex: 1,
        justifyContent: 'center',
        margin: 40,
        borderWidth: 8,

    },

    topRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },

    middleColumn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    middleColumn2: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

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
        backgroundColor: 'orange',
        padding: 10,
        margin: 40,

    },

    shuffleButtonText: {
        // color: 'white',
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
