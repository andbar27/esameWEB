import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";

function App() {
    const [readQuery, setReadQuery] = useState("");
    const [writeQuery, setWriteQuery] = useState("");
    const [resultMsg, setResultMsg] = useState("");
    const [resultNRows, setResultNRows] = useState("");
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);

    // Funzione per inviare la query 
    const handleQuery = async (route, query) => {
        try {
            const response = await fetch(`http://127.0.0.1:8080/${route}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query }),
            });
            
            const data = await response.json();
            console.log("data: ", data);
            
            const msg = data.Msg;
            const esito = data.Esito;
            var numRows = "-1";
            if (route == "readquery" && esito == "000") {
                numRows = data.queryResult.numRows;
                setColumns(data.queryResult.columns || []);
                setRows(data.queryResult.rows || []);
            } 
            
            setResultMsg(msg || "None");
            setResultNRows(numRows || "None");
        } catch (error) {
            setResultMsg("Errore nella richiesta: " + error.message);
        }
    };


    // Funzione per comunicare con il fake server
    const getJson = async (route) => {
        try {
            const response = await fetch(`http://127.0.0.1:8080/${route}`, {
                method: "GET",
                // headers: {
                //     "Content-Type": "application/json",
                // },
                //body: JSON.stringify({ query }),
            });
            
            const data = await response.json();
            console.log("data: ", data);
            
            const msg = data.Msg;
            const esito = data.Esito;
            var numRows = "-1";
            if((route == "aeroporti")||(route == "elencovoli")||(route == "compagnie"))
              route = "readquery";
            if (route == "readquery" && esito == "000") {
                numRows = data.queryResult.numRows;
                setColumns(data.queryResult.columns || []);
                setRows(data.queryResult.rows || []);
            } 
            
            setResultMsg(msg || "None");
            setResultNRows(numRows || "None");
        } catch (error) {
            setResultMsg("Errore nella richiesta: " + error.message);
        }
    };




    const voli =  `SELECT lap.citta as Partenza, 
                          ap.partenza as Aeroporto_Partenza,
                          laa.citta as Arrivo, 
                          ap.arrivo as Aeroporto_Arrivo,
                          v.durataminuti as Durata_Minuti, 
                          v.comp as Compagnia_Aerea 
                  FROM  ArrPart ap, 
                        LuogoAeroporto lap, 
                        LuogoAeroporto laa, 
                        Volo v
                  WHERE ap.arrivo = laa.aeroporto 
                    AND ap.partenza = lap.aeroporto 
                    AND v.codice = ap.codice 
                    AND v.comp = ap.comp`;

    const compagnie = `select * from Compagnia`;
    const aeroporti = ` select * 
                        from Aeroporto, LuogoAeroporto
                        where codice=aeroporto`;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Mobile Flask Cielo DB</Text>
            <View style={styles.buttonContainer}>
                <Button style={styles.button} title="Elenco Voli" onPress={() => getJson("elencovoli")} color="red" />
                <Button title="Aeroporti" onPress={() => getJson("aeroporti")} color="blue" />
                <Button title="Compagnie Aeree" onPress={() => getJson("compagnie", compagnie)} color="blue" />
            </View>

            <View style={styles.inputContainer}>
                <Text>Query di Lettura:</Text>
                <TextInput
                    style={styles.input}
                    value={readQuery}
                    onChangeText={setReadQuery}
                />
                <Button title="Invia" onPress={() => handleQuery("readquery", readQuery)} />
            </View>

            <View style={styles.inputContainer}>
                <Text>Query di Scrittura:</Text>
                <TextInput
                    style={styles.input}
                    value={writeQuery}
                    onChangeText={setWriteQuery}
                />
                <Button title="Invia" onPress={() => handleQuery("writequery", writeQuery)} />
            </View>

            <View>
                <Text style={styles.resultHeader}>Responso:</Text>
                <Text style={styles.resultText}>{resultMsg}</Text>
            </View>

            <View>
                <Text style={styles.resultHeader}>Numero righe:</Text>
                <Text style={styles.resultText}>{resultNRows}</Text>
            </View>

            {columns.length > 0 && (
                <View>
                    <Text style={styles.resultHeader}>Tabella Risultati:</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            {columns.map((col, index) => (
                                <Text key={index} style={styles.tableHeader}>{col}</Text>
                            ))}
                        </View>
                        {rows.map((row, rowIndex) => (
                            <View key={rowIndex} style={styles.tableRow}>
                                {row.map((cell, cellIndex) => (
                                    <Text key={cellIndex} style={styles.tableCell}>{cell}</Text>
                                ))}
                            </View>
                        ))}
                    </View>
                </View>
            )}
        </ScrollView>
    );
}



const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "white",
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "black",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 100,
        justifyContent: 'center',
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
    tableContainer: {
        marginTop: 20,
    },
    tableRowHeader: {
        flexDirection: "row",
        backgroundColor: "#ddd",
        padding: 10,
    },
    tableRow: {
        flexDirection: "row",
        padding: 10,
    },
    evenRow: {
        backgroundColor: "#f9f9f9",
    },
    oddRow: {
        backgroundColor: "#ffffff",
    },
    tableHeader: {
        fontWeight: "bold",
        padding: 10,
        flex: 1,
    },
    tableCell: {
        padding: 10,
        flex: 1,
    },
    input: {
        flex: 1,
        height: 120,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        marginRight: 10,
        backgroundColor: '#fff',
      },
    inputContainer: {
        marginBottom: 10,
        paddingHorizontal: 8,
    },
    resultHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    resultText: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
    },
});

export default App;
