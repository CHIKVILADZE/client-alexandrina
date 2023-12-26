import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import axios from 'axios';

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontFamily: 'Helvetica',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  col: {
    width: '30%',
    borderRightWidth: 1,
    borderRightColor: '#000',
    paddingLeft: 5,
    borderWidth: 3,
    borderStyle: 'solid',
  },
  tableHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 2,
    backgroundColor: '#d3d3d3',
    marginBottom: 10,
  },
  tableTitle: {
    fontWeight: 'bold',
    fontSize: 30,
  },

  lastCol: {
    display: 'flex',
    alignItems: 'center',
    width: '30%',
    borderRightWidth: 0,
    borderRight: '3px solid grey',
    fontSize: 16,
    padding: 8,
  },
});

function PDFFile({ todos, t }) {
  const [allTodos, setAllTodos] = useState([]);

  useEffect(() => {
    const getAllTodos = async () => {
      try {
        const response = await axios.get(
          'https://server-alexandina.onrender.com/todos'
        );
        const data = response.data;
        setAllTodos(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getAllTodos();
  }, []);

  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header}>My Todos</Text>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.lastCol}>Title</Text>
          <Text style={styles.lastCol}>Description</Text>
          <Text style={styles.lastCol}>Status</Text>
        </View>

        {/* Table Body */}
        {allTodos.map((todo) => (
          <View style={styles.row} key={todo.todo_id}>
            <Text style={styles.lastCol}>{todo.title}</Text>
            <Text style={styles.lastCol}>{todo.description}</Text>
            <Text style={styles.lastCol}>{todo.status}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}

export default PDFFile;
