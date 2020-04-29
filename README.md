# JSON-LD Scraper Serverless

  

Am AWS Lambda implementation of the JSON-LD Scraper

```

https://76qbahw4n7.execute-api.us-east-1.amazonaws.com/v1/scraps

```
API Specification

```
swagger: '2.0'
info:
  title: Scraping API
  version: '1.0'
host: 76qbahw4n7.execute-api.us-east-1.amazonaws.com
basePath: /api
schemes:
  - https
paths:
  '/scraps':
      get:
        description: Returns a list of scraps
        produces:
          - application/ld+json
        responses:
          '200':
            description: Return container listing all resources
      post:
        description: scraps a website url
        parameters:
          - in: body
            name: url
            schema:
              type: object
              required:
                - url
              properties:
                url:
                  type: string
                  example: "https://www.imdb.com/title/tt8228288/"
        produces:
          - application/ld+json
        responses:
          '200':
            description: The scraped json ld
            schema:
              example:
                type: object
                properties:
                  '@id': "c9b97cab-502d-48f0-ad57-3aa309ac2dd9"
                  "@context": "http://schema.org"
                  "@type": "Movie"
                  "url": "https://www.imdb.com/title/tt8228288/"
                  "name": "El hoyo"
                  "image": "https://m.media-amazon.com/images/M/MV5BOTMyYTIyM2MtNjQ2ZC00MWFkLThhYjQtMjhjMGZiMjgwYjM2XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg"
  '/{container}':
    get:
      description: Return all container resources
      parameters:
        - name: container
          required: true
          in: path
          type: string
      produces:
        - application/ld+json
      responses:
        '200':
          description: Return container listing all resources
  '/{container}/{resource}':
    get:
      description: Return specific resource
      parameters:
        - name: container
          required: true
          in: path
          type: string
        - name: resource
          required: true
          in: path
          type: string
      produces:
        - application/ld+json
      responses:
        '200':
          description: Return resource
```

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