import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, Dimensions, ViewStyle } from 'react-native';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const QUIZ_DATA = [
  {
    emojis: '🧜‍♀️🐠🌊',
    question: 'Quel est ce film Disney ?',
    answer: 'La Petite Sirène',
    image: 'https://images.unsplash.com/photo-1597720364267-8df7e1b3f25a?w=800&auto=format&fit=crop'
  },
  {
    emojis: '🧚‍♂️👦🏴‍☠️',
    question: 'Quel est ce film ?',
    answer: 'Peter Pan',
    image: 'https://images.unsplash.com/photo-1608274444009-e21f2ff48f53?w=800&auto=format&fit=crop'
  }
];

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (gameStarted && !showAnswer && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }

    if (timeLeft === 0 && !showAnswer) {
      setShowAnswer(true);
    }
  }, [gameStarted, timeLeft, showAnswer]);

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(15);
    setCurrentQuestion(0);
    setShowAnswer(false);
  };

  const nextQuestion = () => {
    if (currentQuestion < QUIZ_DATA.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(15);
      setShowAnswer(false);
    } else {
      setGameStarted(false);
    }
  };

  const { width, height } = Dimensions.get('window');

  const containerStyle: ViewStyle = Platform.select({
    web: {
      maxWidth: 500,
      width: '100%', // OK sur le web
      height: '100vh', // OK sur le web
      marginLeft: 'auto', // OK sur le web
      marginRight: 'auto', // OK sur le web
    },
    default: {
      maxWidth: 500,
      width, // Largeur de l'écran sur mobile
      height, // Hauteur de l'écran sur mobile
      alignSelf: 'center', // Remplace margin: 'auto'
    },
  }) as ViewStyle; // 👈 Force TypeScript à considérer le retour comme un ViewStyle valide
  

  if (!gameStarted) {
    return (
      <View style={[styles.container, containerStyle]}>
        <Text style={styles.title}>ONIMOJY</Text>
        <View style={styles.mascotContainer}>
          <Text style={styles.mascot}>😠</Text>
          <Text style={styles.mascot}>😊</Text>
        </View>
        <TouchableOpacity style={styles.startButton} onPress={startGame}>
          <Text style={styles.startButtonText}>START</Text>
        </TouchableOpacity>
        <View style={styles.flowerContainer}>
          {[1, 2, 3, 4].map((i) => (
            <Text key={i} style={styles.flower}>🌸</Text>
          ))}
        </View>
      </View>
    );
  }

  const currentQuiz = QUIZ_DATA[currentQuestion];

  return (
    <View style={[styles.container, containerStyle]}>
      {!showAnswer ? (
        <View style={styles.gameContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setGameStarted(false)}>
              <Ionicons name="chevron-back" size={24} color="#FF9999" />
            </TouchableOpacity>
            <View style={styles.timerContainer}>
              <Text style={styles.timer}>{timeLeft}</Text>
            </View>
            <Ionicons name="settings" size={24} color="#FF9999" />
          </View>
          <View style={styles.emojiContainer}>
            <Text style={styles.emojis}>{currentQuiz.emojis}</Text>
          </View>
          <Text style={styles.question}>{currentQuiz.question}</Text>
          <View style={styles.flowerContainer}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Text key={i} style={styles.flower}>🌸</Text>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.answerContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setGameStarted(false)}>
              <Ionicons name="chevron-back" size={24} color="#FF9999" />
            </TouchableOpacity>
          </View>
          <Image source={{ uri: currentQuiz.image }} style={styles.movieImage} />
          <Text style={styles.answerText}>C'ÉTAIT:</Text>
          <Text style={styles.movieTitle}>"{currentQuiz.answer}"</Text>
          <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
            <Text style={styles.nextButtonText}>NEXT</Text>
          </TouchableOpacity>
          <View style={styles.flowerContainer}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Text key={i} style={styles.flower}>🌸</Text>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E6',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 60,
  },
  mascotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
  mascot: {
    fontSize: 64,
    marginHorizontal: 10,
  },
  startButton: {
    backgroundColor: '#FFB3B3',
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 40,
  },
  startButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  gameContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  timerContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFB3B3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  emojiContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojis: {
    fontSize: 64,
    marginBottom: 20,
  },
  question: {
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
  },
  answerContainer: {
    flex: 1,
  },
  movieImage: {
    width: '100%',
    height: 300,
    borderRadius: 20,
    marginVertical: 20,
  },
  answerText: {
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
  movieTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
  },
  nextButton: {
    backgroundColor: '#FFB3B3',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  flowerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  flower: {
    fontSize: 24,
  },
});