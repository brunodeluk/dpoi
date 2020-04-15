from scraper import to_jsonld
import sys
import json

def prettier(jsonLd):
    return json.dumps(json.loads(jsonLd), indent=2)

url = str(sys.argv[1])
jsonld_result = to_jsonld(url)

for jsonld in jsonld_result:
    print(prettier(jsonld))

