// Filter.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Filter = ({ filterOptions, selectedFilter, onFilterChange }) => { 

  return (
    <View style={styles.container}>
      {filterOptions.map((filter) => (
        <TouchableOpacity
          key={filter}
          onPress={() => onFilterChange(filter)}
          style={[
            styles.filterButton,
            selectedFilter === filter ? styles.selectedFilter : null,
          ]}
        >
          <Text
            style={[
              styles.filterText,
              selectedFilter === filter ? styles.selectedFilterText : null,
            ]}
          >
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  filterButton: {
    padding: 10,
    borderRadius: 20,
  },
  selectedFilter: {
    backgroundColor: '#138B7F',
  },
  filterText: {
    fontSize: 16,
  },
  selectedFilterText: {
    color: 'white',
  },
});

export default Filter;
