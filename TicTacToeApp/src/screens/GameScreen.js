import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  SafeAreaView, 
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Board from '../components/Board';
import { checkWinner } from '../utils/gameLogic';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const GameScreen = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [showNameModal, setShowNameModal] = useState(true);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
  };

  const startGame = () => {
    if (!player1Name.trim() || !player2Name.trim()) {
      Alert.alert('Error', 'Por favor ingresa los nombres de ambos jugadores');
      return;
    }
    setShowNameModal(false);
  };

  const updateScores = (winner) => {
    if (winner === 'X') {
      setScores(prev => ({ ...prev, player1: prev.player1 + 1 }));
    } else if (winner === 'O') {
      setScores(prev => ({ ...prev, player2: prev.player2 + 1 }));
    }
  };

  const handlePress = (index) => {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setGameOver(true);
      if (result === 'draw') {
        Alert.alert(
          '¡Empate!', 
          '¡El juego terminó en tablas!',
          [
            {
              text: 'Jugar de nuevo',
              onPress: resetGame
            }
          ]
        );
      } else {
        const winnerName = result === 'X' ? player1Name : player2Name;
        updateScores(result);
        Alert.alert(
          '🎉 ¡Ganador! 🎉', 
          `¡${winnerName} ha ganado!`,
          [
            {
              text: 'Jugar de nuevo',
              onPress: resetGame
            }
          ]
        );
      }
    }

    setIsXNext(!isXNext);
  };

  const renderNameModal = () => (
    <Modal
      visible={showNameModal}
      animationType="slide"
      transparent={true}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>¡Bienvenidos a Tic Tac Toe!</Text>
          <Text style={styles.modalSubtitle}>Ingresa los nombres de los jugadores</Text>
          
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="close" size={24} color="#FF5252" />
            <TextInput
              style={styles.input}
              placeholder="Nombre Jugador 1 (X)"
              placeholderTextColor="#999"
              value={player1Name}
              onChangeText={setPlayer1Name}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="circle-outline" size={24} color="#4CAF50" />
            <TextInput
              style={styles.input}
              placeholder="Nombre Jugador 2 (O)"
              placeholderTextColor="#999"
              value={player2Name}
              onChangeText={setPlayer2Name}
            />
          </View>

          <TouchableOpacity 
            style={styles.startButton}
            onPress={startGame}
          >
            <Text style={styles.startButtonText}>Comenzar Juego</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderNameModal()}
      <View style={styles.gradient}>
        <Text style={styles.title}>Tic Tac Toe</Text>
        
        <View style={styles.scoreBoard}>
          <View style={[styles.playerCard, isXNext && styles.activePlayer]}>
            <Text style={styles.playerText}>{player1Name || 'Jugador 1'}</Text>
            <MaterialCommunityIcons name="close" size={24} color="#FF5252" />
            <Text style={styles.scoreText}>{scores.player1}</Text>
          </View>
          <View style={[styles.playerCard, !isXNext && styles.activePlayer]}>
            <Text style={styles.playerText}>{player2Name || 'Jugador 2'}</Text>
            <MaterialCommunityIcons name="circle-outline" size={24} color="#4CAF50" />
            <Text style={styles.scoreText}>{scores.player2}</Text>
          </View>
        </View>

        <View style={styles.boardContainer}>
          <Board 
            board={board} 
            onCellPress={handlePress}
            disabled={gameOver}
          />
        </View>

        <TouchableOpacity 
          style={styles.resetButton} 
          onPress={resetGame}
        >
          <Text style={styles.resetButtonText}>Reiniciar Juego</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  gradient: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  scoreBoard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  playerCard: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    width: '45%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activePlayer: {
    backgroundColor: '#444',
    borderWidth: 2,
    borderColor: '#fff',
  },
  playerText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  scoreText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  boardContainer: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#333',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  resetButton: {
    backgroundColor: '#FF5252',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#333',
    padding: 30,
    borderRadius: 20,
    width: '90%',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  input: {
    backgroundColor: '#444',
    borderRadius: 10,
    padding: 10,
    color: '#fff',
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
    width: '100%',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GameScreen;