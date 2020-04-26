import boto3
from schema import JsonLd

def handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('websites')
    url = event['url']
    print("...scraping " + url)
    result = JsonLd().fromUrl(url)
    for jsonld in result:
        if jsonld['@type'] == 'BreadcrumbList':
            result.remove(jsonld)
            continue
        table.put_item(Item=jsonld)
    print("Finished")
    return result
    
