import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, StatusBar
} from 'react-native';

const menu = [
  { name: 'Espresso', emoji: '☕', price: 30, points: 10 },
  { name: 'Cappuccino', emoji: '🥛', price: 55, points: 15 },
  { name: 'Latte', emoji: '🧋', price: 60, points: 15 },
  { name: 'Mocha', emoji: '🍫', price: 65, points: 20 },
  { name: 'Croissant', emoji: '🥐', price: 45, points: 10 },
  { name: 'Blueberry Muffin', emoji: '🧁', price: 40, points: 10 },
];

const randomItem = () => menu[Math.floor(Math.random() * menu.length)];

export default function App() {
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(100);
  const [level, setLevel] = useState(1);
  const [served, setServed] = useState(0);
  const [order, setOrder] = useState(randomItem());
  const [message, setMessage] = useState('Complete the customer order!');
  const [gameOver, setGameOver] = useState(false);

  const serveOrder = (item) => {
    if (gameOver) return;

    if (item.name === order.name) {
      setScore(s => s + order.points);
      setCoins(c => c + 15);
      setServed(n => n + 1);
      const nextServed = served + 1;

      if (nextServed % 3 === 0) {
        setLevel(l => l + 1);
      }

      setMessage('Perfect! Great customer service! ⭐');
      setOrder(randomItem());
    } else {
      setCoins(c => Math.max(0, c - 10));
      setMessage('Wrong order! Try to be more careful.');
    }
  };

  const restart = () => {
    setScore(0);
    setCoins(100);
    setLevel(1);
    setServed(0);
    setOrder(randomItem());
    setMessage('Complete the customer order!');
    setGameOver(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#38251E" />

      <View style={styles.header}>
        <Text style={styles.logo}>☕ COFFEE TRACK</Text>
        <Text style={styles.subtitle}>YOUR DAILY BARISTA CHALLENGE</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>SCORE</Text>
          <Text style={styles.statValue}>{score}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>COINS</Text>
          <Text style={styles.statValue}>🪙 {coins}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>LEVEL</Text>
          <Text style={styles.statValue}>{level}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>WELCOME, BARISTA! 👋</Text>
        <Text style={styles.description}>
          Serve customers, earn points and become the best barista in town.
        </Text>

        <View style={styles.orderCard}>
          <Text style={styles.orderLabel}>CUSTOMER ORDER</Text>
          <Text style={styles.orderEmoji}>{order.emoji}</Text>
          <Text style={styles.orderName}>{order.name}</Text>
          <Text style={styles.orderInfo}>
            Reward: {order.points} points
          </Text>
        </View>

        <Text style={styles.message}>{message}</Text>

        <Text style={styles.sectionTitle}>YOUR MENU</Text>
        <View style={styles.menuGrid}>
          {menu.map(item => (
            <TouchableOpacity
              key={item.name}
              style={styles.menuCard}
              onPress={() => serveOrder(item)}
              activeOpacity={0.8}
            >
              <Text style={styles.menuEmoji}>{item.emoji}</Text>
              <Text style={styles.menuName}>{item.name}</Text>
              <Text style={styles.price}>${item.price}</Text>
              <Text style={styles.selectText}>SELECT ITEM</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>YOUR PROGRESS</Text>
          <Text style={styles.progressText}>
            Successfully served: {served} customers
          </Text>
          <Text style={styles.progressText}>
            Current level: {level}
          </Text>
        </View>

        <TouchableOpacity style={styles.restartButton} onPress={restart}>
          <Text style={styles.restartText}>↻ RESTART GAME</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>Made with ☕ and passion</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F0E7',
  },
  header: {
    backgroundColor: '#38251E',
    paddingTop: 42,
    paddingBottom: 25,
    alignItems: 'center',
  },
  logo: {
    color: '#F5D6A5',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 2,
  },
  subtitle: {
    color: '#E5C7A1',
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 7,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#563B30',
    paddingVertical: 15,
  },
  statBox: {
    alignItems: 'center',
  },
  statLabel: {
    color: '#E5C7A1',
    fontSize: 10,
    fontWeight: 'bold',
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 4,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    color: '#38251E',
    fontSize: 19,
    fontWeight: '900',
    marginTop: 12,
  },
  description: {
    color: '#80685A',
    fontSize: 13,
    marginTop: 7,
    lineHeight: 20,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#D8B58A',
  },
  orderLabel: {
    color: '#A47B55',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  orderEmoji: {
    fontSize: 55,
    marginTop: 10,
  },
  orderName: {
    fontSize: 23,
    color: '#38251E',
    fontWeight: '900',
    marginTop: 5,
  },
  orderInfo: {
    color: '#A47B55',
    marginTop: 7,
    fontWeight: 'bold',
  },
  message: {
    textAlign: 'center',
    color: '#704C37',
    fontWeight: 'bold',
    marginVertical: 18,
    fontSize: 13,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  menuCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 13,
    alignItems: 'center',
    marginBottom: 13,
    borderWidth: 1,
    borderColor: '#E8D8C8',
  },
  menuEmoji: {
    fontSize: 35,
  },
  menuName: {
    color: '#38251E',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 7,
    textAlign: 'center',
  },
  price: {
    color: '#A47B55',
    marginTop: 5,
    fontWeight: 'bold',
  },
  selectText: {
    color: '#FFFFFF',
    backgroundColor: '#795548',
    overflow: 'hidden',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    fontSize: 9,
    fontWeight: 'bold',
    marginTop: 9,
  },
  progressCard: {
    backgroundColor: '#EAD9C5',
    padding: 18,
    borderRadius: 15,
    marginTop: 10,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#38251E',
    marginBottom: 8,
  },
  progressText: {
    color: '#654C3D',
    marginTop: 5,
    fontSize: 13,
  },
  restartButton: {
    backgroundColor: '#38251E',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  restartText: {
    color: '#F5D6A5',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  footer: {
    textAlign: 'center',
    color: '#A47B55',
    marginTop: 22,
    fontSize: 12,
  },
});