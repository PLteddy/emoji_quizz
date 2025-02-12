import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function Settings() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paramètres</Text>
      
      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Ionicons name="volume-high" size={24} color="#fff" />
          <Text style={styles.settingText}>Son</Text>
        </View>
        <Switch
          value={soundEnabled}
          onValueChange={setSoundEnabled}
          trackColor={{ false: '#767577', true: '#4a148c' }}
          thumbColor={soundEnabled ? '#fff' : '#f4f3f4'}
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Ionicons name="phone-portrait" size={24} color="#fff" />
          <Text style={styles.settingText}>Vibration</Text>
        </View>
        <Switch
          value={vibrationEnabled}
          onValueChange={setVibrationEnabled}
          trackColor={{ false: '#767577', true: '#4a148c' }}
          thumbColor={vibrationEnabled ? '#fff' : '#f4f3f4'}
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Ionicons name="moon" size={24} color="#fff" />
          <Text style={styles.settingText}>Mode sombre</Text>
        </View>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: '#767577', true: '#4a148c' }}
          thumbColor={darkMode ? '#fff' : '#f4f3f4'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 60,
    marginBottom: 40,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 15,
  },
});