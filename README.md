# JSON-LD Scraper Serverless

  

Am AWS Lambda implementation of the JSON-LD Scraper

```

https://76qbahw4n7.execute-api.us-east-1.amazonaws.com/v1/scraps

```
Enpoints: 

- /scraps
	- GET
	- POST
- /:container
	- GET
- /:container/:resource
	- GET

**GET /scraps**
Listar scraps de la aplicación.

Actualmente soporta:
- JSON-lD
- W3 Microdata

En el futuro va a poder soportar:
- OpenGraph

EJemplos de páginas para probar:

https://mercadolibre.com (json-ld)

https://ebay.com (Microdata)

https://garbarino.com (json-ld)

https://imdb.com (json-ld)


**POST /scraps**

Realiza un scrapping de la url dada.

**GET /:container**

Lista scraps del container dado.

**GET /:container/:resource**

Retorna un rescurso

## Authors

*  **Bruno De Luca**

## Acknowledgments

  

* This project was part of as an assignment from the course DPOI