# JSON-LD Scraper

A simple function that takes a URL and returns its JSON-LD

It currenty supports:

- Embedded JSON-LD
- W3C's HTML Microdata

In the future it will support:
- OpenGraph
- Twitter Card Markup

## Getting Started

### Prerequisites

- [Python](https://www.python.org/) (3.6 or later)
- [Requests](https://requests.readthedocs.io/en/master/)
- [BeautifulSoup 4](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)

### Installing

Start by installing all the required dependencies

```
pip install requests
```

```
 pip install beautifulsoup4
```

Then you can try it in your terminal by running the main function and passing a url as argument

```
 python __main__.py https://www.ebay.com/itm/173843444113
```

It will return an array with all the Schemas found on the given website

### Usage

```
result = JsonLd().fromUrl("https://www.ebay.com/itm/173843444113")
```

## Authors

* **Bruno De Luca**

## Acknowledgments

* This project was part of as an assignment from the course DPOI
