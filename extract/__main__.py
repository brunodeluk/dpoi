from jsonld import JsonLdExtractor
from microdata import MicrodataExtractor
import requests
import json

headers = {
    'Accept': 'text/html',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
}
url = "https://articulo.mercadolibre.com.ar/MLA-733037060-taladro-atornillador-inalambrico-pektra-18v-luz-usb-_JM"

def main():
    result = []
    html = requests.get(url, headers=headers).text
    result.extend(JsonLdExtractor(url).extract(html))
    result.extend(MicrodataExtractor(url).extract(html))
    print(result[0])


if __name__ == "__main__":
    main()
