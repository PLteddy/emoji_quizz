import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Modal } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function Settings() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  const [language, setLanguage] = useState('fr');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name="happy" size={24} color="#FF9999" />
        </View>
        <Text style={styles.title}>SETTINGS</Text>
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Ionicons name="musical-note" size={24} color="#FF9999" />
        </View>
        <Switch
          value={soundEnabled}
          onValueChange={setSoundEnabled}
          trackColor={{ false: '#FFE5E5', true: '#FF9999' }}
          thumbColor={soundEnabled ? '#fff' : '#f4f3f4'}
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Ionicons name="volume-high" size={24} color="#FF9999" />
        </View>
        <Switch
          value={vibrationEnabled}
          onValueChange={setVibrationEnabled}
          trackColor={{ false: '#FFE5E5', true: '#FF9999' }}
          thumbColor={vibrationEnabled ? '#fff' : '#f4f3f4'}
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Ionicons name="notifications" size={24} color="#FF9999" />
        </View>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: '#FFE5E5', true: '#FF9999' }}
          thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
        />
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => setShowLanguageModal(true)}
      >
        <Text style={styles.buttonText}>Langue</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => setShowCreditsModal(true)}
      >
        <Text style={styles.buttonText}>Crédits</Text>
      </TouchableOpacity>

      <Text style={styles.version}>v1.0.0</Text>

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

      <View style={styles.footer}>
        <View style={styles.flowerContainer}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Text key={i} style={styles.flower}>🌸</Text>
          ))}
        </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
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
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
  },
  flowerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  flower: {
    fontSize: 24,
  },
});