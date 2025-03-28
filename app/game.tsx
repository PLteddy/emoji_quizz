import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, Dimensions, ViewStyle } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Données des questions du quiz
const QUIZ_DATA = [
  {
    emojis: [
      require("../assets/images/femme.svg"),
      require("../assets/images/archeologue.svg"),
      require("../assets/images/piochet.svg"),
    ],
    question: "Quel est ce Jeu Vidéo ?",
    answer: "The legend of zelda",
    image: "https://cdn.pixabay.com/photo/2024/07/14/14/42/woman-8894656_1280.jpg",
  },
  {
    emojis:  [
      require("../assets/images/dinosaure.svg"),
      require("../assets/images/arc.svg"),
      require("../assets/images/tribal.svg"),
    ],
    question: 'Quel est ce Jeu vidéo?',
    answer: 'Peter Pan',
    image: 'https://cdn.pixabay.com/photo/2024/07/14/14/42/woman-8894656_1280.jpg'
  }
];

export default function Game() {
  // États du composant
  const [currentQuestion, setCurrentQuestion] = useState(0); // Index de la question actuelle
  const [timeLeft, setTimeLeft] = useState(15); // Temps restant pour répondre
  const [showAnswer, setShowAnswer] = useState(false); // Afficher ou non la réponse

  // Effet pour gérer le timer
  useEffect(() => {
    if (!showAnswer && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer); // Nettoyage du timer
    }
    if (timeLeft === 0 && !showAnswer) {
      setShowAnswer(true); // Affiche la réponse quand le temps est écoulé
    }
  }, [timeLeft, showAnswer]);

  // Passe à la question suivante ou retourne à l'accueil
  const nextQuestion = () => {
    if (currentQuestion < QUIZ_DATA.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(15);
      setShowAnswer(false);
    } else {
      router.replace('/'); // Retour à l'accueil quand le quiz est fini
    }
  };
  
  // Adaptation du style selon la plateforme
  const { width, height } = Dimensions.get('window');
  const containerStyle: ViewStyle = Platform.select({
    web: {
      maxWidth: 500,
      width: '100%',
      height: '100vh',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    default: {
      maxWidth: 500,
      width,
      height,
      alignSelf: 'center',
    },
  }) as ViewStyle;
  
  // Récupère la question actuelle
  const currentQuiz = QUIZ_DATA[currentQuestion];

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Affichage conditionnel : question ou réponse */}
      {!showAnswer ? (
        // Vue pendant le jeu (question)
        <View style={styles.gameContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color="#FF9999" />
            </TouchableOpacity>
            <View style={styles.timerContainer}>
              <Text style={styles.timer}>{timeLeft}</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/settings')}>
              <Ionicons name="settings" size={24} color="#FF9999" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.emojiContainer}>
            {Array.isArray(currentQuiz.emojis) ? (
              currentQuiz.emojis.map((emoji, index) => (
                <Image 
                  key={index}
                  source={emoji} 
                  style={styles.emojis} 
                />
              ))
            ) : (
              <Text style={styles.emojis}>{currentQuiz.emojis}</Text>
            )}
          </View>
          <Text style={styles.question}>{currentQuiz.question}</Text>
        </View>
      ) : (
        // Vue après réponse
        <View style={styles.answerContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color="#FF9999" />
            </TouchableOpacity>
          </View>
          <Image source={{ uri: currentQuiz.image }} style={styles.movieImage} />
          <Text style={styles.answerText}>C'ÉTAIT:</Text>
          <Text style={styles.movieTitle}>
            "{currentQuiz.answer}"
          </Text>
          <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
            <Text style={styles.nextButtonText}>NEXT</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {/* Fleurs décoratives en bas de page */}
      <View style={styles.flowerContainer}>
        {[1, 2, 3, 4].map((i) => (
          <Image key={i} source={require('../assets/images/sakura.svg')} style={styles.flower} />
        ))}
      </View>
    </View>
  );
}

// Styles CSS-in-JS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E6',
    padding: 20,
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
    marginBottom: 100,
    marginTop: 100,
  },
  emojis: {
    // Styles optionnels pour les emojis
  },
  question: {
    fontSize: 24,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
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
    marginTop: 5,
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
    width: '100%',
    height: '10%',
  },
  flower: {
    width: 40,
    height: 40,
  },
});

/******************************************************
 * EXPLICATION DES GRANDS PRINCIPES DE CE COMPOSANT   *
 ******************************************************

1. GESTION D'ÉTAT:
   - Utilisation de useState pour gérer:
     * La question actuelle (currentQuestion)
     * Le temps restant (timeLeft)
     * L'affichage de la réponse (showAnswer)
   - useEffect pour le timer qui décrémente timeLeft chaque seconde

2. LOGIQUE DE JEU:
   - Données du quiz stockées dans QUIZ_DATA
   - Timer de 15 secondes par question
   - Affichage automatique de la réponse quand le temps est écoulé
   - Navigation entre questions avec nextQuestion()

3. AFFICHAGE CONDITIONNEL:
   - Deux vues distinctes selon showAnswer:
     * Vue question: emojis + timer
     * Vue réponse: image + titre + bouton NEXT
   - Transition automatique quand timeLeft atteint 0

4. NAVIGATION:
   - Bouton back pour retourner à l'écran précédent
   - Bouton settings accessible pendant le jeu
   - Retour à l'accueil quand le quiz est terminé

5. STYLING ET UI:
   - Adaptation multi-plateforme (web/mobile)
   - Style cohérent avec l'application (couleurs pastel)
   - Fleurs décoratives en bas de page
   - Timer visuel sous forme de cercle coloré

6. COMPOSANTS REUTILISABLES:
   - Header avec boutons de navigation
   - Container pour les emojis
   - Bouton NEXT stylisé
   - Image de réponse avec bord arrondi

7. GESTION DES DONNÉES:
   - Images chargées depuis les assets locaux
   - Image de réponse chargée depuis une URL
   - Mapping des emojis pour un affichage dynamique
*/