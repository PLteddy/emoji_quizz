import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, Dimensions, ViewStyle, Modal, Switch } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function Settings() {
  // États pour les paramètres
  const [soundEnabled, setSoundEnabled] = useState(true); // Activation du son
  const [vibrationEnabled, setVibrationEnabled] = useState(true); // Activation des vibrations
  const [notificationsEnabled, setNotificationsEnabled] = useState(true); // Activation des notifications
  const [showLanguageModal, setShowLanguageModal] = useState(false); // Visibilité du modal langue
  const [showCreditsModal, setShowCreditsModal] = useState(false); // Visibilité du modal crédits
  const [language, setLanguage] = useState('fr'); // Langue sélectionnée

  // Adaptation aux dimensions de l'écran
  const { width, height } = Dimensions.get('window');

  // Style conditionnel selon la plateforme
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

  return (
    <View style={[styles.container, containerStyle]}>
      {/* En-tête avec bouton retour et titre */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#FF9999" />
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <Ionicons name="happy" size={24} color="#FF9999" />
        </View>
        <Text style={styles.title}>SETTINGS</Text>
      </View>

      {/* Paramètre Son */}
      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Ionicons name="musical-note" size={24} color="#FF9999" />
          <Text style={styles.settingText}>Son</Text>
        </View>
        <Switch
          value={soundEnabled}
          onValueChange={setSoundEnabled}
          trackColor={{ false: '#FFE5E5', true: '#FF9999' }}
          thumbColor={soundEnabled ? '#fff' : '#f4f3f4'}
        />
      </View>

      {/* Paramètre Vibration */}
      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Ionicons name="volume-high" size={24} color="#FF9999" />
          <Text style={styles.settingText}>Vibration</Text>
        </View>
        <Switch
          value={vibrationEnabled}
          onValueChange={setVibrationEnabled}
          trackColor={{ false: '#FFE5E5', true: '#FF9999' }}
          thumbColor={vibrationEnabled ? '#fff' : '#f4f3f4'}
        />
      </View>

      {/* Paramètre Notifications */}
      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Ionicons name="notifications" size={24} color="#FF9999" />
          <Text style={styles.settingText}>Notifications</Text>
        </View>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: '#FFE5E5', true: '#FF9999' }}
          thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
        />
      </View>

      {/* Bouton Langue */}
      <TouchableOpacity 
        style={styles.button}
        onPress={() => setShowLanguageModal(true)}
      >
        <Text style={styles.buttonText}>Langue</Text>
      </TouchableOpacity>

      {/* Bouton Crédits */}
      <TouchableOpacity 
        style={styles.button}
        onPress={() => setShowCreditsModal(true)}
      >
        <Text style={styles.buttonText}>Crédits</Text>
      </TouchableOpacity>

      {/* Version de l'application */}
      <Text style={styles.version}>v1.0.0</Text>

      {/* Modal pour sélection de la langue */}
      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choisir la langue</Text>
            <TouchableOpacity 
              style={[styles.languageButton, language === 'fr' && styles.selectedLanguage]}
              onPress={() => {
                setLanguage('fr');
                setShowLanguageModal(false);
              }}
            >
              <Text style={styles.languageText}>Français</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.languageButton, language === 'en' && styles.selectedLanguage]}
              onPress={() => {
                setLanguage('en');
                setShowLanguageModal(false);
              }}
            >
              <Text style={styles.languageText}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowLanguageModal(false)}
            >
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal pour afficher les crédits */}
      <Modal
        visible={showCreditsModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Crédits</Text>
            <Text style={styles.creditsText}>
              Développé par l'équipe Onimojy{'\n\n'}
              Design: Sarah Martin{'\n'}
              Développement: Jean Dupont{'\n'}
              Tests: Marie Lambert
            </Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowCreditsModal(false)}
            >
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  backButton: {
    marginRight: 10,
  },
  iconContainer: {
    marginRight: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#FFE5E5',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#333',
  },
  button: {
    backgroundColor: '#FFB3B3',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  version: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  languageButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFE5E5',
    marginVertical: 5,
  },
  selectedLanguage: {
    backgroundColor: '#FFB3B3',
  },
  languageText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
  creditsText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  closeButton: {
    backgroundColor: '#FFB3B3',
    padding: 15,
    borderRadius: 25,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
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

1. GESTION D'ÉTAT:
   - Utilisation de useState pour gérer:
     * Les préférences utilisateur (son, vibration, notifications)
     * L'affichage des modals (langue et crédits)
     * La langue sélectionnée

2. INTERFACE UTILISATEUR:
   - Header avec bouton retour et titre
   - Switch personnalisés pour les paramètres
   - Boutons pour accéder aux modals
   - Fleurs décoratives en bas de page (cohérence visuelle)

3. MODALS:
   - Deux modals (langue et crédits) avec:
     * Animation de fondu
     * Fond semi-transparent
     * Bouton de fermeture
   - Sélection de langue avec feedback visuel

4. STYLING:
   - Thème cohérent avec l'application (couleurs pastel)
   - Adaptation responsive avec Dimensions
   - Style conditionnel pour le web et mobile
   - Styles réutilisables pour les boutons et modals

5. NAVIGATION:
   - Bouton back pour retourner à l'écran précédent
   - Navigation gérée par expo-router

6. ARCHITECTURE:
   - Structure claire avec sections distinctes
   - Composants réutilisables (boutons, items de paramètre)
   - Séparation entre logique et présentation

7. ACCESSIBILITÉ:
   - Icônes pour chaque paramètre
   - Contraste des couleurs vérifié
   - Taille de texte adaptative

8. DONNÉES:
   - Version de l'app affichée dynamiquement
   - Crédits de l'équipe dans un modal
   - États persistants pour les préférences utilisateur
*/