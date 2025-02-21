from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
import sys

import configparser




# Lancio Flask
api = Flask(__name__)
CORS(api)








@api.route('/elencovoli', methods=['GET'])
def elencoVoli():
    # Elenco Voli
    return jsonify(

{'Esito': '000', 'Msg': 'Query eseguita con successo', 'queryResult': {'numRows': '13', 'columns': ['partenza', 'aeroporto_partenza', 'arrivo', 'aeroporto_arrivo', 'durata_minuti', 'compagnia_aerea'], 'rows': [('New York', 'JFK', 'Roma', 'FCO', 600, 'MagicFly'), ('Roma', 'CIA', 'Roma', 'FCO', 382, 'Caimanair'), ('Roma', 'CIA', 'New York', 'JFK', 432, 'Apitalia'), ('Roma', 'FCO', 'Roma', 'CIA', 382, 'Apitalia'), ('New York', 'JFK', 'Roma', 'FCO', 599, 'Apitalia'), ('London', 'HTR', 'Paris', 'CDG', 60, 'MagicFly'), ('Paris', 'CDG', 'London', 'HTR', 60, 'Caimanair'), ('London', 'HTR', 'Roma', 'FCO', 150, 'Apitalia'), ('Roma', 'FCO', 'New York', 'JFK', 600, 'MagicFly'), ('Roma', 'FCO', 'New York', 'JFK', 601, 'Caimanair'), ('Roma', 'FCO', 'New York', 'JFK', 599, 'Apitalia'), ('Berlino', 'GER', 'New York', 'JFK', 10, 'Tedesco'), ('Roma', 'FCO', 'Berlino', 'GER', 10, 'Tedesco')]}}

    ), 200




@api.route('/aeroporti', methods=['GET'])
def aeroporti():
    # Elenco Aeroporti
    return jsonify(

{'Esito': '000', 'Msg': 'Query eseguita con successo', 'queryResult': {'numRows': '6', 'columns': ['codice', 'nome', 'aeroporto', 'citta', 'nazione'], 'rows': [('JFK', 'JFK Airport', 'JFK', 'New York', 'USA'), ('FCO', 'Aeroporto di Roma Fiumicino', 'FCO', 'Roma', 'Italy'), ('CIA', 'Aeroporto di Roma Ciampino', 'CIA', 'Roma', 'Italy'), ('CDG', 'Charles de Gaulle, Aeroport de Paris', 'CDG', 'Paris', 'France'), ('HTR', 'Heathrow Airport, London', 'HTR', 'London', 'United Kingdom'), ('GER', 'AE Ger', 'GER', 'Berlino', 'Germany')]}}

    ), 200



@api.route('/compagnie', methods=['GET'])
def compagnie():
    # Elenco Compagnie
    return jsonify(

{'Esito': '000', 'Msg': 'Query eseguita con successo', 'queryResult': {'numRows': '4', 'columns': ['nome', 'annofondaz'], 'rows': [('Caimanair', 1954), ('Apitalia', 1900), ('MagicFly', 1990), ('Tedesco', 1946)]}}

    ), 200



@api.route('/readquery', methods=['POST'])
def readQuery():
    content_type = request.headers.get('Content-Type')
    if content_type == 'application/json':
        jsonReq = request.json
        res = None
        err = -1
        
        if err == -1:
            return jsonify({"Esito": "003", "Msg": f"Errore connessione db: {val}", 
                            "queryResult": None}), 400
        else:
            print(res)
            return jsonify(res), 200
        
    else:
        return jsonify({"Esito": "002", "Msg": "Formato richiesta errato", "queryResult": None}), 400
        
        
@api.route('/writequery', methods=['POST'])
def writeQuery():
    content_type = request.headers.get('Content-Type')
    if content_type == 'application/json':
        jsonReq = request.json
        val, err = None, -3

        if err == -1:
            return jsonify({"Esito": "001", "Msg": f"Query non valida: {val}", 
                            "queryResult": None}), 400
        
        elif err == -2:
            return jsonify({"Esito": "002", "Msg": f"Duplicate key value: {val}", 
                            "queryResult": None}), 400
        elif err == -3:
            return jsonify({"Esito": "003", "Msg": f"Errore connessione db: {val}", 
                            "queryResult": None}), 400
        else:
            return jsonify({"Esito": "000", "Msg": "Query eseguita con successo", 
                            "queryResult": val}), 200

# /Views

api.run(host="127.0.0.1", port=8080)