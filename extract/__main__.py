from jsonld import JsonLdExtractor
from microdata import MicrodataExtractor
import requests
import json

headers = {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
}
url = "https://twitter.com/francastromt/status/1252980309559250945"

def main():
    html_string = requests.get(url, {}, headers=headers, timeout=30).text
    extractor = MicrodataExtractor()
    jsonld = extractor.extract(html_string, url)
    print(json.dumps(jsonld, indent=2))

if __name__ == "__main__":
    main()
