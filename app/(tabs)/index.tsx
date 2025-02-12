import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const QUIZ_DATA = [
  {
    emojis: '🦁👑🌍',
    question: 'Quel est ce film Disney ?',
    answer: 'Le Roi Lion',
    image: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=800&auto=format&fit=crop'
  },
  {
    emojis: '🧙‍♂️⚡️🏰',
    question: 'Quel est ce film ?',
    answer: 'Harry Potter',
    image: 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?w=800&auto=format&fit=crop'
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

  if (!gameStarted) {
    return (
      <LinearGradient colors={['#1a1a1a', '#4a148c']} style={styles.container}>
        <Text style={styles.title}>Emoji Quiz</Text>
        <TouchableOpacity style={styles.startButton} onPress={startGame}>
          <Text style={styles.startButtonText}>COMMENCER</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  const currentQuiz = QUIZ_DATA[currentQuestion];

  return (
    <View style={styles.container}>
      {!showAnswer ? (
        <View style={styles.gameContainer}>
          <View style={styles.timerContainer}>
            <Text style={styles.timer}>{timeLeft}s</Text>
          </View>
          <View style={styles.emojiContainer}>
            <Text style={styles.emojis}>{currentQuiz.emojis}</Text>
          </View>
          <Text style={styles.question}>{currentQuiz.question}</Text>
        </View>
      ) : (
        <View style={styles.answerContainer}>
          <Image source={{ uri: currentQuiz.image }} style={styles.movieImage} />
          <Text style={styles.answerText}>{currentQuiz.answer}</Text>
          <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
            <Text style={styles.nextButtonText}>SUIVANT</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
  startButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 30,
    elevation: 5,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a148c',
  },
  gameContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  timerContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a148c',
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
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
  },
  answerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  movieImage: {
    width: '100%',
    height: 300,
    borderRadius: 20,
    marginBottom: 20,
  },
  answerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  nextButton: {
    backgroundColor: '#4a148c',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});