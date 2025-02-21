import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, Dimensions, ViewStyle } from 'react-native';
import { router } from 'expo-router';

export default function Home() {
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
    

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>ONIMOJY</Text>
      <View style={styles.mascotContainer}>
        <Text style={styles.mascot}>😠</Text>
        <Text style={styles.mascot}>😊</Text>
      </View>
      <TouchableOpacity style={styles.startButton} onPress={() => router.push('/game')}>
        <Text style={styles.startButtonText}>START</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.startButton, { marginTop: 20, backgroundColor: '#FFD6D6' }]} 
        onPress={() => router.push('/settings')}
      >
        <Text style={styles.startButtonText}>SETTINGS</Text>
      </TouchableOpacity>
      <View style={styles.flowerContainer}>
        {[1, 2, 3, 4].map((i) => (
          <Text key={i} style={styles.flower}>🌸</Text>
        ))}
      </View>
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
    minWidth: 200,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 24,
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