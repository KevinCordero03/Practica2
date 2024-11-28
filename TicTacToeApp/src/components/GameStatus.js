import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GameStatus = ({ 
  currentPlayer, 
  winner, 
  isDraw 
}) => {
  const getStatusMessage = () => {
    if (winner) {
      return `¡Ganador: ${winner}!`;
    }
    if (isDraw) {
      return '¡Empate!';
    }
    return `Turno del jugador: ${currentPlayer}`;
  };

  return (
    <View style={styles.statusContainer}>
      <Text style={[
        styles.statusText, 
        winner && styles.winnerText,
        isDraw && styles.drawText
      ]}>
        {getStatusMessage()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  winnerText: {
    color: 'green',
  },
  drawText: {
    color: 'blue',
  }
});

export default GameStatus;