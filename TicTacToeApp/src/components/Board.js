import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Cell from './Cell';

const { width } = Dimensions.get('window');
const BOARD_SIZE = width * 0.9;
const CELL_SIZE = BOARD_SIZE / 3;

const Board = ({ board, onCellPress, disabled }) => {
  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {board.map((cell, index) => (
          <Cell
            key={index}
            value={cell}
            onPress={() => onCellPress(index)}
            disabled={disabled}
            style={[
              styles.cell,
              {
                borderRightWidth: (index + 1) % 3 !== 0 ? 3 : 0,
                borderBottomWidth: index < 6 ? 3 : 0,
              }
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  board: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#444',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#666',
    overflow: 'hidden',
  },
  cell: {
    width: `${100/3}%`,
    height: `${100/3}%`,
    borderColor: '#666',
  }
});

export default Board;