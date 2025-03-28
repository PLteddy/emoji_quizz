import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, Dimensions, ViewStyle } from 'react-native';
import { router } from 'expo-router';

// Composant principal de la page d'accueil
export default function Home() {
    // Récupération des dimensions de l'écran
    const { width, height } = Dimensions.get('window');

    // Style conditionnel pour adapter le conteneur selon la plateforme
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
    }) as ViewStyle; 
    

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Titre de l'application */}
      <Text style={styles.title}>ONIMOJY</Text>
      
      {/* Conteneur pour les mascottes/émoticônes */}
      <View style={styles.mascotContainer}>
        <Image source={require('../assets/images/angry.svg')} style={styles.mascot} />
        <Image source={require('../assets/images/happy.svg')} style={styles.mascot} />
      </View>
      
      {/* Bouton pour démarrer le jeu */}
      <TouchableOpacity style={styles.startButton} onPress={() => router.push('/game')}>
        <Text style={styles.startButtonText}>START</Text>
      </TouchableOpacity>
      
      {/* Bouton pour accéder aux paramètres */}
      <TouchableOpacity 
        style={[styles.startButton, { marginTop: 20, backgroundColor: '#FFD6D6' }]} 
        onPress={() => router.push('/settings')}
      >
        <Text style={styles.startButtonText}>SETTINGS</Text>
      </TouchableOpacity>
      
      {/* Conteneur pour les fleurs décoratives en bas de page */}
      <View style={styles.flowerContainer}>
        {[1, 2, 3, 4].map((i) => (
          <Image key={i} source={require('../assets/images/sakura.svg')} style={styles.flower} />
        ))}
      </View>
    </View>
  );
}

// Styles CSS-in-JS avec StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E6', // Fond beige clair
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
    backgroundColor: '#FFB3B3', // Rose clair
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 40,
    minWidth: 200,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Texte blanc
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
    width: 40,
    height: 40,
  },
});

/******************************************************
 * EXPLICATION DES GRANDS PRINCIPES DE CE COMPOSANT   *
 ******************************************************

1. ADAPTATION MULTI-PLATEFORME:
   - Utilisation de Platform.select() pour adapter les styles selon la plateforme (web/mobile)
   - Sur mobile: prend toute la largeur/hauteur de l'écran
   - Sur web: limite la largeur à 500px et centre le contenu

2. ROUTAGE:
   - Utilisation du router d'Expo pour la navigation entre écrans
   - Boutons START et SETTINGS qui redirigent vers les pages correspondantes

3. STRUCTURE:
   - Un conteneur principal avec un fond coloré
   - Un titre centré
   - Deux images de mascottes côte à côte
   - Deux boutons principaux (START et SETTINGS)
   - Quatre fleurs décoratives en bas de page

4. STYLING:
   - Utilisation de StyleSheet pour les styles CSS-in-JS
   - Styles réutilisés pour les boutons (avec override pour SETTINGS)
   - Positionnement absolu pour les fleurs en bas de page
   - Flexbox pour l'alignement des éléments

5. DYNAMIQUE:
   - Dimensions réactives avec Dimensions.get('window')
   - Rendu conditionnel des styles selon la plateforme
   - Génération des fleurs avec un map() pour éviter la répétition
*/