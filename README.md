# JSON-LD Scraper Api

Methods exposed:

- /:container

Returns all conainer resources

- /:container/:resource

Returns specific resource 

## Getting Started

### Prerequisites

- [Docker](https://nodejs.org/es/)

### Installing

Pull the image from Dockerhub

```
docker pull brunodeluk/jsonldscraper:1.0.1
```

Run the image

```
docker run -p 3000:3000 -it brunodeluk/jsonldscraper:1.0.1
```

Then go to:

```
http://localhost:3000/api
```

If you are using docker for windows, you have to use the IP of the virtual machine which you can get by running:

```
docker-image ip default
```

## Authors

* **Bruno De Luca**

## Acknowledgments

* This project was part of as an assignment from the course DPOI
