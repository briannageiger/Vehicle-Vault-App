import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

export default function MaintenanceAlert() {
    return (
      <View>
        {showTireAlert && (
            <Text>MaintenanceAlert</Text>
        )}
      </View>
    )
};

const styles = StyleSheet.create({})