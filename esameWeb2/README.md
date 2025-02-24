CIELO REACT WEB
----------------------------------------------
*INSTALLAZIONE & ESECUZIONE*
Apri due terminali:

 - Primo Terminale:
 	// DIPENDENZE
 	pip install flask psycopg2
	// FINE DIPENDENZE
	
 	cd flaskServer
 	python3 server.py

 - Secondo Terminale:
	cd cieloWEB
	npm install
	npm run dev
	
	
----------------------------------------------
*UTILIZZO APP*	

Nell'HomePage del sito si trovano tre tasti:
 - Elenco Voli:
 	Stampa in Tabella risultati l'elenco dei voli nel db.
	Con Citta di Partenza, Codice Aeroporto partenza, Città di Arrivo, Codice Aeroporto arrivo e compagnia aerea.

 - Aeroporti:
 	Stampa in Tabella risultati l'elenco degli aeroporti presenti nel db.
 	Con Codice aeroporto, nome aeroporto, città e nazione dell'aeroporto.
 	
 - Compagnie Aeree:
 	Stampa in Tabella risultati l'elenco delle compagnie aeree prensenti nel db.
 	Con nome e anno di fondazione.
 	
In Responso e numero righe sono stampati rispettivamente il messaggio con l'esito dell'operazione e il numero di righe della tabella.

 - Query lettura e query scrittura:
 	Permettono di leggere e scrivere direttamente dal database con delle query sql, in caso di lettura le tabelle saranno parametriche al numero di colonne restituite dal db.
 	E' possibile anche scrivere il database, inserendo nuove entry con le query di scrittura.
 	*ATTENZIONE: QUESTA VERSIONE DEMO DEL PROGRAMMA NON AVENDO ACCESSO AL DATABASE NON PERMETTE L'UTILIZZO DI QUESTE DUE FUNZIONI!*

	
