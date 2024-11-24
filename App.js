import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';

const getIcon = (status) => {
    switch (status) {
      case 'green':
        return require('./assets/atm-green.png');
      case 'orange':
        return require('./assets/atm-orange.png');
      case 'red':
        return require('./assets/atm-red.png');
      default:
        return require('./assets/atm-red.png');
    }
  };

// Map Screen
function MapScreen() {
  const markers = [
    { id: 1, latitude: 36.752887, longitude: 3.042048, title: 'ATM 1', status: 'green'},
    { id: 2, latitude: 36.748017, longitude: 3.081119, title: 'ATM 2', status: 'orange'},
    { id: 3, latitude: 36.753336, longitude: 3.067552, title: 'ATM 3', status: 'red'},
    { id: 4, latitude: 36.752887, longitude: 3.052048, title: 'ATM 1', status: 'green'},
  ];

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: 36.7525, // Boumerdes city center
          longitude: 3.042, // Boumerdes city center
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
          >
          <Image
              source={getIcon(marker.status)}
              style={{ width: 40, height: 40 }}
            />
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

// List Screen
function ListScreen() {
  const atmData = [
    { id: 1, status: 'green', text: 'ATM 1' },
    { id: 2, status: 'orange', text: 'ATM 2' },
    { id: 3, status: 'red', text: 'ATM 3' },
  ];

  return (
    <View style={styles.listContainer}>
      {atmData.map((atm) => (
        <View key={atm.id} style={styles.listItem}>
          <Icon
            name="bank"
            size={24}
            color={
              atm.status === 'green'
                ? 'green'
                : atm.status === 'orange'
                ? 'orange'
                : 'red'
            }
            style={styles.listIcon}
          />
          <Text style={styles.listText}>{atm.text}</Text>
        </View>
      ))}
    </View>
  );
}

// Main App Component
export default function App() {
  const [activeTab, setActiveTab] = React.useState('Map');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#007aff" />
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>ATM Finder</Text>
      </View>

      {/* Custom Top Navigation Tabs */}
      <View style={styles.navigationTabs}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'Map' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('Map')}
        >
          <Text style={styles.tabText}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'List' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('List')}
        >
          <Text style={styles.tabText}>List</Text>
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      <View style={styles.contentContainer}>
        {activeTab === 'Map' ? <MapScreen /> : <ListScreen />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  titleContainer: {
    backgroundColor: '#007aff',
    paddingVertical: 10,
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  navigationTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: '#007aff',
  },
  tabText: {
    color: '#000',
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  listIcon: {
    marginRight: 10,
  },
  listText: {
    fontSize: 16,
  },
});
